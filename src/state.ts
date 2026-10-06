import { defaultPlanByDay, initialSessions, weekDays, type DayId, type Exercise, type Session } from "./data";

const storageKey = "ritmo-training-log-v1";
const programVersion = 3;
const legacySessionDays: Record<string, DayId> = { A: "mon", B: "wed", C: "fri" };
const legacyDefaultSessions: Partial<Record<DayId, { title: string; exercises: [string, number][] }>> = {
  mon: { title: "Base e controle", exercises: [["a-leg-press", 3], ["a-chest-press", 3], ["a-pulldown", 3], ["a-leg-curl", 2], ["a-lateral", 2], ["a-curl", 2]] },
  wed: { title: "Força equilibrada", exercises: [["b-squat", 3], ["b-incline", 3], ["b-row", 3], ["b-rdl", 2], ["b-triceps", 2]] },
  fri: { title: "Fechamento da semana", exercises: [["c-split-squat", 3], ["c-hip-thrust", 3], ["c-row", 3], ["c-chest", 3], ["c-calf", 3]] },
};
const programVersionTwoSessions: Partial<Record<DayId, { title: string; exercises: [string, number][] }>> = {
  mon: { title: "Superiores A", exercises: [["a-chest-press", 2], ["a-row", 2], ["a-incline", 2], ["a-pulldown", 2], ["a-lateral", 2], ["a-triceps", 2], ["a-curl", 2]] },
  tue: { title: "Pernas A", exercises: [["a-leg-press", 3], ["tue-rdl", 2], ["a-leg-curl", 2], ["tue-hip", 2], ["tue-calf", 2]] },
  wed: { title: "Superiores B", exercises: [["b-incline", 2], ["b-row", 2], ["b-chest-press", 2], ["b-pulldown", 2], ["b-lateral", 2], ["b-curl", 2], ["b-triceps", 2]] },
  thu: { title: "Pernas B", exercises: [["d-squat", 3], ["d-lunge", 2], ["d-hip", 2], ["b-rdl", 2], ["d-leg-curl", 2], ["d-calf", 2]] },
  fri: { title: "Superiores C", exercises: [["c-chest-press", 2], ["c-row", 2], ["c-crossover", 2], ["c-pulldown", 2], ["c-lateral", 2], ["c-curl", 2], ["c-triceps", 2]] },
};
const exerciseLogAliases: Partial<Record<DayId, Record<string, string>>> = {
  mon: { "a-incline": "mon-incline-dumbbell", "a-lateral": "mon-lateral-raise", "a-triceps": "mon-rope-pushdown" },
  tue: { "a-leg-press": "tue-leg-press", "tue-rdl": "tue-stiff", "a-leg-curl": "tue-lying-leg-curl", "tue-calf": "tue-standing-calf" },
  wed: { "b-pulldown": "wed-lat-pulldown", "b-row": "wed-seated-row" },
  thu: { "d-squat": "thu-smith-squat", "b-rdl": "thu-stiff", "d-leg-curl": "thu-leg-curl" },
  fri: { "c-row": "fri-seated-row", "c-crossover": "fri-crossover", "c-pulldown": "fri-lat-pulldown", "c-lateral": "fri-lateral-raise" },
};

export interface ExerciseLog { checked: boolean; weight: string; reps: string }
export interface TrainingState {
  planVersion: number;
  selectedDay: DayId;
  sessions: Record<DayId, Session | null>;
  activeDays: Record<DayId, boolean>;
  logs: Record<string, ExerciseLog>;
  completed: Partial<Record<DayId, string>>;
  completedDates: string[];
}

export function freshState(): TrainingState {
  return {
    planVersion: programVersion,
    selectedDay: weekDays[(new Date().getDay() + 6) % 7].id,
    sessions: Object.fromEntries(weekDays.map(({ id }) => [id, defaultPlanByDay[id] ? structuredClone(initialSessions[defaultPlanByDay[id]]) : null])) as TrainingState["sessions"],
    activeDays: Object.fromEntries(weekDays.map(({ id }) => [id, ["mon", "tue", "wed", "thu", "fri"].includes(id)])) as TrainingState["activeDays"],
    logs: {}, completed: {}, completedDates: [],
  };
}

function matchesPreviousDefaultSession(session: Session, dayId: DayId) {
  const candidates = [legacyDefaultSessions[dayId], programVersionTwoSessions[dayId]].filter((item) => item !== undefined);
  return candidates.some((expected) => session.title === expected.title
    && session.exercises.length === expected.exercises.length
    && expected.exercises.every(([id, sets], index) => session.exercises[index]?.id === id && Number(session.exercises[index]?.sets) === sets));
}

export function loadState(): TrainingState {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "null") as (Partial<TrainingState> & { sessions?: Record<string, Session | null>; selected?: string }) | null;
    if (!saved || !saved.sessions || !saved.logs) return freshState();
    const base = freshState();
    const defaults = Object.values(initialSessions).flatMap((session) => session.exercises);
    const byId = new Map(defaults.map((exercise) => [exercise.id, exercise]));
    const byName = new Map(defaults.map((exercise) => [exercise.name, exercise]));
    const migratedProgramDays = new Set<DayId>();
    for (const day of weekDays) {
      const legacyKey = Object.keys(legacySessionDays).find((key) => legacySessionDays[key] === day.id);
      const savedSession = saved.sessions[day.id] || (legacyKey && saved.sessions[legacyKey]);
      if (savedSession && Array.isArray(savedSession.exercises)) {
        if (Number(saved.planVersion || 0) < programVersion && matchesPreviousDefaultSession(savedSession, day.id)) {
          migratedProgramDays.add(day.id);
          continue;
        }
        base.sessions[day.id] = {
          ...savedSession,
          exercises: savedSession.exercises.map((exercise: Exercise) => ({
            ...exercise,
            imageId: exercise.imageId || byId.get(exercise.id)?.imageId || byName.get(exercise.name)?.imageId,
          })),
        };
      }
    }
    if (Number(saved.planVersion || 0) < programVersion) {
      for (const day of weekDays) base.activeDays[day.id] = ["mon", "tue", "wed", "thu", "fri"].includes(day.id);
    } else if (saved.activeDays && typeof saved.activeDays === "object") {
      for (const day of weekDays) base.activeDays[day.id] = Boolean(saved.activeDays[day.id]);
    }

    const logs: TrainingState["logs"] = {};
    for (const [key, value] of Object.entries(saved.logs)) {
      const separator = key.indexOf(":");
      if (separator < 0) continue;
      const legacyId = key.slice(0, separator);
      const dayId = legacySessionDays[legacyId] || legacyId as DayId;
      if (!weekDays.some((day) => day.id === dayId)) continue;
      const rest = key.slice(separator + 1);
      const exerciseSeparator = rest.lastIndexOf(":");
      if (exerciseSeparator < 0) continue;
      const exerciseId = rest.slice(0, exerciseSeparator);
      const setIndex = rest.slice(exerciseSeparator);
      const nextExerciseId = migratedProgramDays.has(dayId) ? exerciseLogAliases[dayId]?.[exerciseId] || exerciseId : exerciseId;
      logs[`${dayId}:${nextExerciseId}${setIndex}`] = value;
    }

    const completed: TrainingState["completed"] = {};
    for (const [legacyId, value] of Object.entries((saved.completed || {}) as Record<string, string | boolean>)) {
      const dayId = legacySessionDays[legacyId] || legacyId as DayId;
      if (!weekDays.some((day) => day.id === dayId) || migratedProgramDays.has(dayId)) continue;
      const completion = value === true ? localDateKey() : value;
      if (typeof completion === "string") completed[dayId] = completion;
    }
    const completedDates = [...new Set([
      ...(Array.isArray(saved.completedDates) ? saved.completedDates : []),
      ...Object.values(completed),
    ].filter((date): date is string => typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)))];
    const selectedDay = weekDays.some((day) => day.id === saved.selectedDay)
      ? saved.selectedDay as DayId : legacySessionDays[saved.selected || ""] || "mon";
    return { ...base, ...saved, planVersion: programVersion, selectedDay, sessions: base.sessions, activeDays: base.activeDays, logs, completed, completedDates };
  } catch {
    return freshState();
  }
}

export function saveState(state: TrainingState) {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

export function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function weekKey(date: Date) {
  const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate() - ((date.getDay() + 6) % 7));
  return localDateKey(monday);
}

export function isSessionDone(state: TrainingState, dayId: DayId) {
  const completedAt = state.completed[dayId];
  if (!completedAt) return false;
  const completedDate = new Date(`${completedAt}T12:00:00`);
  return !Number.isNaN(completedDate.getTime()) && weekKey(completedDate) === weekKey(new Date());
}

export function clearSessionCompletion(state: TrainingState, dayId: DayId) {
  const completedAt = state.completed[dayId];
  delete state.completed[dayId];
  if (completedAt && !Object.values(state.completed).includes(completedAt)) {
    state.completedDates = state.completedDates.filter((date) => date !== completedAt);
  }
}

export function getExerciseLog(state: TrainingState, dayId: DayId, exerciseId: string, index: number): ExerciseLog {
  const saved: Partial<ExerciseLog> = state.logs[`${dayId}:${exerciseId}:${index}`] || {};
  return { checked: false, weight: "", reps: "", ...saved };
}

export function countSession(state: TrainingState, dayId: DayId) {
  const exercises = state.sessions[dayId]?.exercises || [];
  return {
    total: exercises.reduce((sum, exercise) => sum + Number(exercise.sets), 0),
    checked: exercises.reduce((sum, exercise) => sum + Array.from({ length: Number(exercise.sets) }, (_, index) => Number(getExerciseLog(state, dayId, exercise.id, index).checked)).reduce((a, b) => a + b, 0), 0),
  };
}

export function createWorkoutForDay(state: TrainingState, dayId: DayId) {
  const activeCount = Object.values(state.activeDays).filter(Boolean).length;
  const templates = Object.values(defaultPlanByDay);
  const templateId = templates[(activeCount - 1) % templates.length];
  const workout = structuredClone(initialSessions[templateId]);
  workout.exercises = workout.exercises.map((exercise) => ({ ...exercise, id: `${dayId}-${exercise.id}` }));
  state.sessions[dayId] = workout;
}

export function moveExercise(state: TrainingState, dayId: DayId, exerciseId: string, targetId: string) {
  const exercises = state.sessions[dayId]?.exercises;
  if (!exercises) return false;
  const from = exercises.findIndex((exercise) => exercise.id === exerciseId);
  const to = exercises.findIndex((exercise) => exercise.id === targetId);
  if (from < 0 || to < 0 || from === to) return false;
  const [exercise] = exercises.splice(from, 1);
  exercises.splice(to, 0, exercise);
  return true;
}