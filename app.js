const exerciseImage = (id, frame = 0) => `assets/exercises/${id}/${frame}.jpg`;

const initialSessions = {
  A: {
    title: "Peito, ombros e tríceps",
    focus: "PEITO · OMBROS · TRÍCEPS",
    description: "Segunda-feira · Mantenha 1–3 repetições na reserva na maioria das séries.",
    exercises: [
      { id: "mon-barbell-bench", name: "Supino reto com barra", muscle: "Peito · Tríceps", sets: 3, reps: "6–8", rest: "2–3 min", imageId: "Barbell_Bench_Press_-_Medium_Grip", query: "supino reto com barra execução" },
      { id: "mon-incline-dumbbell", name: "Supino inclinado com halteres", muscle: "Peito · Ombros", sets: 3, reps: "8–10", rest: "2 min", imageId: "Incline_Dumbbell_Press", query: "supino inclinado halteres execução" },
      { id: "mon-dumbbell-shoulder-press", name: "Desenvolvimento com halteres", muscle: "Ombros · Tríceps", sets: 3, reps: "8–10", rest: "2 min", imageId: "Dumbbell_Shoulder_Press", query: "desenvolvimento ombro halteres execução" },
      { id: "mon-lateral-raise", name: "Elevação lateral", muscle: "Ombros", sets: 3, reps: "12–15", rest: "1–1:30 min", imageId: "Side_Lateral_Raise", query: "elevação lateral halteres execução" },
      { id: "mon-crossover", name: "Crossover", muscle: "Peito", sets: 2, reps: "12–15", rest: "1–1:30 min", imageId: "Cable_Crossover", query: "crossover na polia execução" },
      { id: "mon-rope-pushdown", name: "Tríceps corda", muscle: "Tríceps", sets: 3, reps: "10–15", rest: "1–1:30 min", imageId: "Triceps_Pushdown", query: "tríceps corda polia execução" },
    ],
  },
  B: {
    title: "Pernas A · ênfase em quadríceps",
    focus: "QUADRÍCEPS · POSTERIOR · PANTURRILHAS",
    description: "Terça-feira · Faça séries de aquecimento antes dos exercícios pesados; elas não contam como séries efetivas.",
    exercises: [
      { id: "tue-smith-squat", name: "Agachamento no Smith", muscle: "Quadríceps · Glúteos", sets: 3, reps: "6–8", rest: "2–3 min", imageId: "Smith_Machine_Squat", query: "agachamento smith execução" },
      { id: "tue-leg-press", name: "Leg press", muscle: "Quadríceps · Glúteos", sets: 3, reps: "8–12", rest: "2–3 min", imageId: "Leg_Press", query: "leg press execução musculação" },
      { id: "tue-leg-extension", name: "Cadeira extensora", muscle: "Quadríceps", sets: 3, reps: "10–15", rest: "1–1:30 min", imageId: "Leg_Extensions", query: "cadeira extensora execução" },
      { id: "tue-lying-leg-curl", name: "Mesa flexora", muscle: "Posterior de coxa", sets: 3, reps: "8–12", rest: "1:30–2 min", imageId: "Lying_Leg_Curls", query: "mesa flexora execução" },
      { id: "tue-stiff", name: "Stiff", muscle: "Posterior · Glúteos", sets: 2, reps: "8–10", rest: "2 min", imageId: "Romanian_Deadlift", query: "stiff com barra execução" },
      { id: "tue-standing-calf", name: "Panturrilha em pé", muscle: "Panturrilhas", sets: 3, reps: "10–15", rest: "1–1:30 min", imageId: "Standing_Calf_Raises", query: "panturrilha em pé máquina execução" },
      { id: "tue-abs", name: "Abdômen na polia (crunch)", muscle: "Abdômen", sets: 3, reps: "10–20", rest: "1 min", imageId: "Cable_Crunch", query: "abdominal crunch na polia execução" },
    ],
  },
  C: {
    title: "Costas e bíceps",
    focus: "COSTAS · DELTOIDE POSTERIOR · BÍCEPS",
    description: "Quarta-feira · Na remada unilateral, complete as repetições de cada lado antes de iniciar a próxima série.",
    exercises: [
      { id: "wed-lat-pulldown", name: "Puxada alta", muscle: "Costas · Bíceps", sets: 3, reps: "6–10", rest: "2–3 min", imageId: "Wide-Grip_Lat_Pulldown", query: "puxada alta na frente execução" },
      { id: "wed-seated-row", name: "Remada baixa", muscle: "Costas · Bíceps", sets: 3, reps: "8–12", rest: "2 min", imageId: "Seated_Cable_Rows", query: "remada baixa cabo execução" },
      { id: "wed-one-arm-row", name: "Remada unilateral", muscle: "Costas · Bíceps", sets: 3, reps: "8–12", rest: "2 min", imageId: "One-Arm_Dumbbell_Row", query: "remada unilateral halter execução" },
      { id: "wed-straight-arm-pulldown", name: "Pulldown com braços estendidos", muscle: "Costas", sets: 2, reps: "10–15", rest: "1–1:30 min", imageId: "Straight-Arm_Pulldown", query: "pulldown braços estendidos execução" , alternative: "Pulldown unilateral na polia — 2 × 10–15" },
      { id: "wed-face-pull", name: "Face pull", muscle: "Deltoide posterior · Costas", sets: 3, reps: "12–15", rest: "1–1:30 min", imageId: "Face_Pull", query: "face pull polia execução" },
      { id: "wed-barbell-curl", name: "Rosca direta", muscle: "Bíceps", sets: 3, reps: "8–12", rest: "1–1:30 min", imageId: "Barbell_Curl", query: "rosca direta barra execução" },
      { id: "wed-hammer-curl", name: "Rosca martelo", muscle: "Bíceps · Braquial", sets: 2, reps: "10–15", rest: "1–1:30 min", imageId: "Hammer_Curls", query: "rosca martelo halteres execução" },
    ],
  },
  D: {
    title: "Pernas B · posterior e glúteos",
    focus: "POSTERIOR · GLÚTEOS · QUADRÍCEPS",
    description: "Quinta-feira · Use amplitude confortável e mantenha o controle do movimento em todas as séries.",
    exercises: [
      { id: "thu-smith-squat", name: "Agachamento no Smith", muscle: "Quadríceps · Glúteos", sets: 3, reps: "8–10", rest: "2–3 min", imageId: "Smith_Machine_Squat", query: "agachamento smith execução" },
      { id: "thu-stiff", name: "Stiff", muscle: "Posterior · Glúteos", sets: 3, reps: "8–10", rest: "2 min", imageId: "Romanian_Deadlift", query: "stiff com barra execução" },
      { id: "thu-leg-curl", name: "Mesa flexora", muscle: "Posterior de coxa", sets: 3, reps: "10–15", rest: "1:30–2 min", imageId: "Lying_Leg_Curls", query: "mesa flexora execução" },
      { id: "thu-leg-extension", name: "Cadeira extensora", muscle: "Quadríceps", sets: 2, reps: "12–15", rest: "1–1:30 min", imageId: "Leg_Extensions", query: "cadeira extensora execução" },
      { id: "thu-smith-lunge", name: "Afundo no Smith", muscle: "Quadríceps · Glúteos", sets: 3, reps: "10–12 / perna", rest: "1:30–2 min", query: "afundo smith execução", alternative: "Leg press unilateral — 3 × 10–12 por perna" },
      { id: "thu-seated-calf", name: "Panturrilha sentado", muscle: "Panturrilhas", sets: 3, reps: "12–20", rest: "1–1:30 min", imageId: "Seated_Calf_Raise", query: "panturrilha sentada execução" },
      { id: "thu-abs", name: "Abdômen na polia (crunch)", muscle: "Abdômen", sets: 3, reps: "10–20", rest: "1 min", imageId: "Cable_Crunch", query: "abdominal crunch na polia execução" },
    ],
  },
  E: {
    title: "Peito, costas e ombros",
    focus: "PEITO · COSTAS · OMBROS",
    description: "Sexta-feira · Supinos e remadas com execução estável; mantenha a margem de esforço planejada.",
    exercises: [
      { id: "fri-barbell-bench", name: "Supino reto com barra", muscle: "Peito · Tríceps", sets: 3, reps: "6–8", rest: "2–3 min", imageId: "Barbell_Bench_Press_-_Medium_Grip", query: "supino reto com barra execução" },
      { id: "fri-lat-pulldown", name: "Puxada alta", muscle: "Costas · Bíceps", sets: 3, reps: "8–10", rest: "2 min", imageId: "Wide-Grip_Lat_Pulldown", query: "puxada alta na frente execução" },
      { id: "fri-incline", name: "Supino inclinado", muscle: "Peito · Ombros", sets: 3, reps: "8–10", rest: "2 min", imageId: "Incline_Dumbbell_Press", query: "supino inclinado execução" },
      { id: "fri-seated-row", name: "Remada baixa", muscle: "Costas · Bíceps", sets: 3, reps: "8–12", rest: "2 min", imageId: "Seated_Cable_Rows", query: "remada baixa cabo execução" },
      { id: "fri-lateral-raise", name: "Elevação lateral", muscle: "Ombros", sets: 3, reps: "12–20", rest: "1–1:30 min", imageId: "Side_Lateral_Raise", query: "elevação lateral halteres execução" },
      { id: "fri-crossover", name: "Crossover", muscle: "Peito", sets: 2, reps: "12–15", rest: "1–1:30 min", imageId: "Cable_Crossover", query: "crossover na polia execução" },
      { id: "fri-one-arm-row", name: "Remada unilateral", muscle: "Costas · Bíceps", sets: 2, reps: "10–12", rest: "1:30–2 min", imageId: "One-Arm_Dumbbell_Row", query: "remada unilateral halter execução" },
      { id: "fri-reverse-fly", name: "Crucifixo inverso (reverse fly)", muscle: "Deltoide posterior", sets: 2, reps: "12–20", rest: "1–1:30 min", imageId: "Reverse_Flyes", query: "crucifixo inverso reverse fly execução" },
    ],
  },
};

const storageKey = "ritmo-training-log-v1";
const weekDays = [
  { id: "mon", label: "SEG", name: "Segunda" },
  { id: "tue", label: "TER", name: "Terça" },
  { id: "wed", label: "QUA", name: "Quarta" },
  { id: "thu", label: "QUI", name: "Quinta" },
  { id: "fri", label: "SEX", name: "Sexta" },
  { id: "sat", label: "SÁB", name: "Sábado" },
  { id: "sun", label: "DOM", name: "Domingo" },
];
const legacySessionDays = { A: "mon", B: "wed", C: "fri" };
const programVersion = 3;
const weekdayIds = ["mon", "tue", "wed", "thu", "fri"];
const defaultPlanByDay = { mon: "A", tue: "B", wed: "C", thu: "D", fri: "E" };
const legacyDefaultSessions = {
  mon: { title: "Base e controle", exercises: [["a-leg-press", 3], ["a-chest-press", 3], ["a-pulldown", 3], ["a-leg-curl", 2], ["a-lateral", 2], ["a-curl", 2]] },
  wed: { title: "Força equilibrada", exercises: [["b-squat", 3], ["b-incline", 3], ["b-row", 3], ["b-rdl", 2], ["b-triceps", 2]] },
  fri: { title: "Fechamento da semana", exercises: [["c-split-squat", 3], ["c-hip-thrust", 3], ["c-row", 3], ["c-chest", 3], ["c-calf", 3]] },
};
const programVersionTwoSessions = {
  mon: { title: "Superiores A", exercises: [["a-chest-press", 2], ["a-row", 2], ["a-incline", 2], ["a-pulldown", 2], ["a-lateral", 2], ["a-triceps", 2], ["a-curl", 2]] },
  tue: { title: "Pernas A", exercises: [["a-leg-press", 3], ["tue-rdl", 2], ["a-leg-curl", 2], ["tue-hip", 2], ["tue-calf", 2]] },
  wed: { title: "Superiores B", exercises: [["b-incline", 2], ["b-row", 2], ["b-chest-press", 2], ["b-pulldown", 2], ["b-lateral", 2], ["b-curl", 2], ["b-triceps", 2]] },
  thu: { title: "Pernas B", exercises: [["d-squat", 3], ["d-lunge", 2], ["d-hip", 2], ["b-rdl", 2], ["d-leg-curl", 2], ["d-calf", 2]] },
  fri: { title: "Superiores C", exercises: [["c-chest-press", 2], ["c-row", 2], ["c-crossover", 2], ["c-pulldown", 2], ["c-lateral", 2], ["c-curl", 2], ["c-triceps", 2]] },
};
const exerciseLogAliases = {
  mon: { "a-incline": "mon-incline-dumbbell", "a-lateral": "mon-lateral-raise", "a-triceps": "mon-rope-pushdown" },
  tue: { "a-leg-press": "tue-leg-press", "tue-rdl": "tue-stiff", "a-leg-curl": "tue-lying-leg-curl", "tue-calf": "tue-standing-calf" },
  wed: { "b-pulldown": "wed-lat-pulldown", "b-row": "wed-seated-row" },
  thu: { "d-squat": "thu-smith-squat", "b-rdl": "thu-stiff", "d-leg-curl": "thu-leg-curl" },
  fri: { "c-row": "fri-seated-row", "c-crossover": "fri-crossover", "c-pulldown": "fri-lat-pulldown", "c-lateral": "fri-lateral-raise" },
};

function freshState() {
  const sessions = Object.fromEntries(weekDays.map(({ id }) => [id, defaultPlanByDay[id] ? structuredClone(initialSessions[defaultPlanByDay[id]]) : null]));
  return {
    planVersion: programVersion,
    selectedDay: weekDays[(new Date().getDay() + 6) % 7].id,
    sessions,
    activeDays: Object.fromEntries(weekDays.map(({ id }) => [id, weekdayIds.includes(id)])),
    logs: {},
    completed: {},
    completedDates: [],
  };
}

function matchesPreviousDefaultSession(session, dayId) {
  if (!Array.isArray(session?.exercises)) return false;
  const candidates = [legacyDefaultSessions[dayId], programVersionTwoSessions[dayId]].filter(Boolean);
  return candidates.some((expected) => session.title === expected.title
    && session.exercises.length === expected.exercises.length
    && expected.exercises.every(([id, sets], index) => session.exercises[index]?.id === id && Number(session.exercises[index]?.sets) === sets));
}

let state = loadState();
let toastTimer;
let installPrompt;
let editingWeek = false;
const currentDate = new Date();
let calendarMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (!saved || !saved.sessions || !saved.logs) return freshState();
    const base = freshState();
    const defaultExercises = new Map(Object.values(initialSessions).flatMap((session) => session.exercises.map((exercise) => [exercise.id, exercise])));
    const defaultExercisesByName = new Map(Object.values(initialSessions).flatMap((session) => session.exercises.map((exercise) => [exercise.name, exercise])));
    const migratedProgramDays = new Set();
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
          exercises: savedSession.exercises.map((exercise) => ({
            ...exercise,
            imageId: exercise.imageId || defaultExercises.get(exercise.id)?.imageId || defaultExercisesByName.get(exercise.name)?.imageId,
          })),
        };
      }
    }
    if (Number(saved.planVersion || 0) < programVersion) {
      for (const day of weekDays) base.activeDays[day.id] = weekdayIds.includes(day.id);
    } else if (saved.activeDays && typeof saved.activeDays === "object") {
      for (const day of weekDays) base.activeDays[day.id] = Boolean(saved.activeDays[day.id]);
    }

    const logs = {};
    for (const [key, value] of Object.entries(saved.logs)) {
      const separator = key.indexOf(":");
      if (separator < 0) continue;
      const legacyId = key.slice(0, separator);
      const dayId = legacySessionDays[legacyId] || legacyId;
      if (!weekDays.some((day) => day.id === dayId)) continue;
      const rest = key.slice(separator + 1);
      const exerciseSeparator = rest.lastIndexOf(":");
      if (exerciseSeparator < 0) continue;
      const exerciseId = rest.slice(0, exerciseSeparator);
      const setIndex = rest.slice(exerciseSeparator);
      const nextExerciseId = migratedProgramDays.has(dayId) ? exerciseLogAliases[dayId]?.[exerciseId] || exerciseId : exerciseId;
      logs[`${dayId}:${nextExerciseId}${setIndex}`] = value;
    }

    const completed = {};
    for (const [legacyId, value] of Object.entries(saved.completed || {})) {
      const dayId = legacySessionDays[legacyId] || legacyId;
      if (!weekDays.some((day) => day.id === dayId) || migratedProgramDays.has(dayId)) continue;
      const completion = value === true ? localDateKey() : value;
      if (typeof completion === "string") completed[dayId] = completion;
    }
    const completedDates = [...new Set([
      ...(Array.isArray(saved.completedDates) ? saved.completedDates : []),
      ...Object.values(completed),
    ].filter((date) => typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)))];

    const selectedDay = weekDays.some((day) => day.id === saved.selectedDay)
      ? saved.selectedDay
      : legacySessionDays[saved.selected] || "mon";
    return { ...base, ...saved, planVersion: programVersion, selectedDay, sessions: base.sessions, activeDays: base.activeDays, logs, completed, completedDates };
  } catch {
    return freshState();
  }
}

function saveState() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    showToast("Não foi possível salvar. Verifique o espaço disponível no aparelho.");
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function logKey(sessionId, exerciseId, setIndex, field) {
  return `${sessionId}:${exerciseId}:${setIndex}:${field}`;
}

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function weekKey(date) {
  const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate() - ((date.getDay() + 6) % 7));
  return localDateKey(monday);
}

function isSessionDone(sessionId) {
  const completedAt = state.completed[sessionId];
  if (!completedAt) return false;
  const completedDate = new Date(`${completedAt}T12:00:00`);
  return !Number.isNaN(completedDate.getTime()) && weekKey(completedDate) === weekKey(new Date());
}

function clearSessionCompletion(sessionId) {
  const completedAt = state.completed[sessionId];
  delete state.completed[sessionId];
  if (completedAt && !Object.values(state.completed).includes(completedAt)) {
    state.completedDates = state.completedDates.filter((date) => date !== completedAt);
  }
}

function getExerciseLog(sessionId, exerciseId, setIndex) {
  const base = { checked: false, weight: "", reps: "" };
  const saved = state.logs[`${sessionId}:${exerciseId}:${setIndex}`];
  return saved ? { ...base, ...saved } : base;
}

function countSession(sessionId) {
  const exercises = state.sessions[sessionId].exercises;
  const total = exercises.reduce((sum, exercise) => sum + Number(exercise.sets), 0);
  const checked = exercises.reduce((sum, exercise) => {
    return sum + Array.from({ length: Number(exercise.sets) }, (_, index) => getExerciseLog(sessionId, exercise.id, index).checked).filter(Boolean).length;
  }, 0);
  return { checked, total };
}

function renderExercise(exercise, sessionId, index) {
  const sets = Number(exercise.sets);
  const rows = Array.from({ length: sets }, (_, setIndex) => {
    const log = getExerciseLog(sessionId, exercise.id, setIndex);
    return `<div class="set-row${log.checked ? " is-checked" : ""}" data-set-row>
      <label class="set-check"><input type="checkbox" data-field="checked" data-session="${sessionId}" data-exercise="${escapeHtml(exercise.id)}" data-index="${setIndex}" ${log.checked ? "checked" : ""} aria-label="Marcar série ${setIndex + 1} de ${escapeHtml(exercise.name)}" /><span>Série ${setIndex + 1}</span></label>
      <label class="set-input-wrap"><input class="set-input" type="number" inputmode="decimal" min="0" step="0.5" placeholder="kg" value="${escapeHtml(log.weight)}" data-field="weight" data-session="${sessionId}" data-exercise="${escapeHtml(exercise.id)}" data-index="${setIndex}" aria-label="Carga em quilogramas, série ${setIndex + 1}" /><span>kg</span></label>
      <label class="set-input-wrap"><input class="set-input" type="number" inputmode="numeric" min="0" step="1" placeholder="reps" value="${escapeHtml(log.reps)}" data-field="reps" data-session="${sessionId}" data-exercise="${escapeHtml(exercise.id)}" data-index="${setIndex}" aria-label="Repetições, série ${setIndex + 1}" /><span>rep</span></label>
    </div>`;
  }).join("");
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.query || `${exercise.name} execução exercício`)}`;
  const hasReference = Boolean(exercise.imageId);
  const alternative = exercise.alternative
    ? `<p class="exercise-alternative"><strong>Alternativa:</strong> ${escapeHtml(exercise.alternative)}</p>`
    : "";
  return `<article class="exercise-card" data-card="${escapeHtml(exercise.id)}" style="animation-delay:${Math.min(index * 35, 210)}ms">
    <div class="exercise-media">
      <div class="exercise-photo${hasReference ? "" : " image-fallback"}">${hasReference
      ? `<img src="${exerciseImage(escapeHtml(exercise.imageId))}" alt="${escapeHtml(exercise.name)}, posição inicial" data-image-id="${escapeHtml(exercise.imageId)}" data-frame="0" loading="lazy" />`
      : `<span class="photo-placeholder">FIGURA<br />NÃO CADASTRADA</span>`}</div>
      ${hasReference ? `<div class="exercise-media-controls"><span class="photo-index">${String(index + 1).padStart(2, "0")}</span><button class="image-toggle" type="button" data-image-toggle aria-label="Ver posição final de ${escapeHtml(exercise.name)}">Ver final <span aria-hidden="true">↗</span></button></div>` : ""}
    </div>
    <div class="exercise-body">
      <div class="exercise-topline"><span class="muscle-tag">${escapeHtml(exercise.muscle)}</span><button class="remove-exercise" type="button" data-remove="${escapeHtml(exercise.id)}" aria-label="Remover ${escapeHtml(exercise.name)}" title="Remover exercício">×</button></div>
      <div class="exercise-name-row"><h3 class="exercise-name" title="${escapeHtml(exercise.name)}">${escapeHtml(exercise.name)}</h3><span class="exercise-prescription">${sets} × ${escapeHtml(exercise.reps)}</span></div>
      <div class="exercise-details"><span>Descanso <strong>${escapeHtml(exercise.rest || "90 s")}</strong></span><span class="detail-dot">·</span><a class="demo-link" href="${searchUrl}" target="_blank" rel="noreferrer">Ver demonstração <span aria-hidden="true">↗</span></a></div>
      ${alternative}
      <div class="set-list">${rows}</div>
      <button class="add-set" type="button" data-add-set="${escapeHtml(exercise.id)}">+ Adicionar série</button>
    </div>
  </article>`;
}

function renderDayTabs() {
  const tabs = document.querySelector("#session-tabs");
  tabs.innerHTML = weekDays.map((day) => {
    const active = state.activeDays[day.id];
    const selected = state.selectedDay === day.id;
    const status = active ? "Treino" : "Livre";
    const label = editingWeek
      ? `${active ? "Remover treino de" : "Adicionar treino em"} ${day.name}`
      : `${day.name}: ${status.toLowerCase()}`;
    return `<button class="session-tab${selected ? " active" : ""}${isSessionDone(day.id) ? " is-done" : ""}${active ? " has-workout" : " is-rest"}" type="button" role="tab" data-day="${day.id}" aria-selected="${selected}" aria-label="${label}" title="${label}">
      <span class="tab-day">${day.label}</span><span class="tab-title">${status}</span><span class="tab-status" aria-hidden="true"></span>
      ${editingWeek ? `<span class="day-edit-indicator" aria-hidden="true">${active ? "−" : "+"}</span>` : ""}
    </button>`;
  }).join("");
}

function render() {
  const dayId = state.selectedDay;
  const day = weekDays.find((item) => item.id === dayId);
  const session = state.sessions[dayId];
  const active = Boolean(state.activeDays[dayId] && session);
  const counts = active ? countSession(dayId) : { checked: 0, total: 0 };
  const list = document.querySelector("#exercise-list");
  document.querySelector("#session-letter").textContent = day.label;
  document.querySelector("#session-focus").textContent = active ? session.focus : `${day.name.toUpperCase()} · DIA DE DESCANSO`;
  document.querySelector("#session-title").textContent = active ? session.title : "Dia de descanso";
  document.querySelector("#session-description").textContent = active ? session.description : "Recuperação também faz parte do progresso.";
  document.querySelector("#completion-count").textContent = `${counts.checked}/${counts.total}`;
  document.querySelector("#progress-bar").style.width = `${counts.total ? (counts.checked / counts.total) * 100 : 0}%`;
  document.querySelector("#progress-message").textContent = !active ? "Dia livre para recuperar." : isSessionDone(dayId) ? "Sessão concluída. Bom trabalho." : counts.checked ? "Boa. Continue no seu ritmo." : "Um passo de cada vez.";
  document.querySelector("#finish-button").disabled = !active || !counts.total || counts.checked !== counts.total || isSessionDone(dayId);
  document.querySelector("#finish-button").innerHTML = isSessionDone(dayId) ? 'Treino concluído <span aria-hidden="true">✓</span>' : 'Concluir treino <span aria-hidden="true">→</span>';
  document.querySelector("#clear-session-button").hidden = !active;
  document.querySelector("#add-exercise-button").hidden = !active;
  document.querySelector(".session-footer").hidden = !active;
  list.innerHTML = active
    ? session.exercises.map((exercise, index) => renderExercise(exercise, dayId, index)).join("")
    : `<div class="rest-day-panel"><span class="rest-day-overline">${day.label} · RECUPERAÇÃO</span><h3>Sem treino programado.</h3><p>Este dia está livre na sua semana.</p><button class="rest-day-add" type="button" data-activate-day="${dayId}">Adicionar treino neste dia <span aria-hidden="true">+</span></button></div>`;
  list.querySelectorAll(".exercise-photo img").forEach((img) => img.addEventListener("error", () => {
    const photo = img.parentElement;
    const media = photo.parentElement;
    photo.classList.add("image-fallback");
    img.remove();
    media.querySelector(".image-toggle")?.remove();
    const placeholder = document.createElement("span");
    placeholder.className = "photo-placeholder";
    placeholder.innerHTML = "FIGURA<br />INDISPONÍVEL";
    photo.prepend(placeholder);
  }, { once: true }));
  renderDayTabs();
  renderWeekProgress();
}

function renderWeekProgress() {
  const activeDays = weekDays.filter((day) => state.activeDays[day.id]);
  const done = activeDays.filter((day) => isSessionDone(day.id)).length;
  document.querySelector("#week-count").textContent = done;
  document.querySelector("#week-count-label").innerHTML = `de ${activeDays.length} treinos<br />na semana`;
  document.querySelector("#week-progress-bar").style.width = `${activeDays.length ? (done / activeDays.length) * 100 : 0}%`;
  document.querySelector("#week-summary").textContent = `${activeDays.length} ${activeDays.length === 1 ? "treino" : "treinos"} na semana`;
  document.querySelector("#week-footnote").textContent = !activeDays.length
    ? "Adicione um dia de treino para acompanhar a semana."
    : done === activeDays.length
      ? "Todos os treinos programados foram concluídos."
      : done
        ? `${activeDays.length - done} ${activeDays.length - done === 1 ? "treino restante" : "treinos restantes"} nesta semana.`
        : "Cada sessão conta. A próxima começa quando você quiser.";
  renderCompletionCalendar();
}

function renderCompletionCalendar() {
  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const startDate = new Date(year, month, 1 - firstDay.getDay());
  const currentDate = new Date();
  const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  document.querySelector("#calendar-month").textContent = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(calendarMonth);
  document.querySelector('[data-calendar-shift="1"]').disabled = calendarMonth >= currentMonth;
  document.querySelector("#completion-calendar").innerHTML = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + index);
    const dateKey = localDateKey(date);
    const completed = state.completedDates.includes(dateKey);
    const classes = ["calendar-day"];
    if (date.getMonth() !== month) classes.push("outside-month");
    if (dateKey === localDateKey()) classes.push("is-today");
    if (completed) classes.push("is-complete");
    const label = new Intl.DateTimeFormat("pt-BR", { dateStyle: "full" }).format(date);
    return `<span class="${classes.join(" ")}" role="gridcell" aria-label="${label}${completed ? ", treino concluído" : ""}"><span>${date.getDate()}</span>${completed ? '<span class="calendar-check" aria-hidden="true">✓</span>' : ""}</span>`;
  }).join("");
}

document.querySelector(".calendar-nav").addEventListener("click", (event) => {
  const shift = Number(event.target.closest("[data-calendar-shift]")?.dataset.calendarShift);
  if (!shift) return;
  const nextMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + shift, 1);
  const currentDate = new Date();
  const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  if (nextMonth > currentMonth) return;
  calendarMonth = nextMonth;
  renderCompletionCalendar();
});

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function chooseDay(dayId) {
  state.selectedDay = dayId;
  saveState();
  render();
}

document.querySelector("#today-label").textContent = new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "numeric", month: "long" }).format(new Date());

function createWorkoutForDay(dayId) {
  const activeCount = Object.values(state.activeDays).filter(Boolean).length;
  const templates = Object.values(defaultPlanByDay);
  const templateId = templates[(activeCount - 1) % templates.length];
  const workout = structuredClone(initialSessions[templateId]);
  workout.exercises = workout.exercises.map((exercise) => ({ ...exercise, id: `${dayId}-${exercise.id}` }));
  state.sessions[dayId] = workout;
}

function toggleTrainingDay(dayId) {
  state.activeDays[dayId] = !state.activeDays[dayId];
  if (state.activeDays[dayId] && !state.sessions[dayId]) createWorkoutForDay(dayId);
  if (!state.activeDays[dayId]) delete state.completed[dayId];
  saveState();
  render();
}

document.querySelector("#configure-days-button").addEventListener("click", (event) => {
  editingWeek = !editingWeek;
  event.currentTarget.textContent = editingWeek ? "Concluir edição" : "Editar semana";
  event.currentTarget.setAttribute("aria-pressed", String(editingWeek));
  document.querySelector("#week-edit-hint").hidden = !editingWeek;
  renderDayTabs();
});

document.querySelector("#session-tabs").addEventListener("click", (event) => {
  const tab = event.target.closest("[data-day]");
  if (!tab) return;
  if (editingWeek) toggleTrainingDay(tab.dataset.day);
  else chooseDay(tab.dataset.day);
});

document.querySelector("#exercise-list").addEventListener("input", (event) => {
  const input = event.target.closest("[data-field]");
  if (!input || input.dataset.field === "checked") return;
  const key = `${input.dataset.session}:${input.dataset.exercise}:${input.dataset.index}`;
  state.logs[key] ||= { checked: false, weight: "", reps: "" };
  state.logs[key][input.dataset.field] = input.value;
  saveState();
});

document.querySelector("#exercise-list").addEventListener("change", (event) => {
  const input = event.target.closest('[data-field="checked"]');
  if (!input) return;
  const key = `${input.dataset.session}:${input.dataset.exercise}:${input.dataset.index}`;
  state.logs[key] ||= { checked: false, weight: "", reps: "" };
  state.logs[key].checked = input.checked;
  if (!input.checked) clearSessionCompletion(input.dataset.session);
  saveState();
  render();
});

document.querySelector("#exercise-list").addEventListener("click", (event) => {
  const imageToggle = event.target.closest("[data-image-toggle]");
  if (imageToggle) {
    const card = imageToggle.closest(".exercise-card");
    const image = card.querySelector(".exercise-photo img");
    const nextFrame = image.dataset.frame === "0" ? "1" : "0";
    image.dataset.frame = nextFrame;
    image.src = exerciseImage(image.dataset.imageId, nextFrame);
    image.alt = `${card.querySelector(".exercise-name").textContent}, posição ${nextFrame === "0" ? "inicial" : "final"}`;
    imageToggle.innerHTML = nextFrame === "0" ? 'Ver final <span aria-hidden="true">↗</span>' : 'Ver início <span aria-hidden="true">↙</span>';
    imageToggle.setAttribute("aria-label", `Ver posição ${nextFrame === "0" ? "final" : "inicial"} de ${card.querySelector(".exercise-name").textContent}`);
    return;
  }
  const activateDayButton = event.target.closest("[data-activate-day]");
  if (activateDayButton) {
    toggleTrainingDay(activateDayButton.dataset.activateDay);
    return;
  }
  const addSetButton = event.target.closest("[data-add-set]");
  if (addSetButton) {
    const exercise = state.sessions[state.selectedDay].exercises.find((item) => item.id === addSetButton.dataset.addSet);
    if (exercise.sets >= 8) return showToast("Este exercício já atingiu o limite de 8 séries.");
    exercise.sets += 1;
    clearSessionCompletion(state.selectedDay);
    saveState();
    render();
    return;
  }
  const removeButton = event.target.closest("[data-remove]");
  if (removeButton) {
    const exercise = state.sessions[state.selectedDay].exercises.find((item) => item.id === removeButton.dataset.remove);
    if (!exercise) return;
    state.sessions[state.selectedDay].exercises = state.sessions[state.selectedDay].exercises.filter((item) => item.id !== exercise.id);
    Object.keys(state.logs).filter((key) => key.startsWith(`${state.selectedDay}:${exercise.id}:`)).forEach((key) => delete state.logs[key]);
    clearSessionCompletion(state.selectedDay);
    saveState();
    render();
    showToast(`${exercise.name} removido da sessão.`);
  }
});

document.querySelector("#finish-button").addEventListener("click", () => {
  const completedAt = localDateKey();
  state.completed[state.selectedDay] = completedAt;
  if (!state.completedDates.includes(completedAt)) state.completedDates.push(completedAt);
  saveState();
  render();
  showToast("Treino concluído e salvo neste aparelho.");
});

document.querySelector("#clear-session-button").addEventListener("click", () => {
  const dayId = state.selectedDay;
  Object.keys(state.logs).filter((key) => key.startsWith(`${dayId}:`)).forEach((key) => delete state.logs[key]);
  clearSessionCompletion(dayId);
  saveState();
  render();
  showToast(`Registros de ${weekDays.find((day) => day.id === dayId).name} limpos.`);
});

const dialog = document.querySelector("#exercise-dialog");
document.querySelector("#add-exercise-button").addEventListener("click", () => dialog.showModal());
document.querySelector("#close-dialog").addEventListener("click", () => dialog.close());
document.querySelector("#cancel-dialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
document.querySelector("#exercise-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = String(form.get("name")).trim();
  if (!name) return;
  const id = `custom-${crypto.randomUUID()}`;
  state.sessions[state.selectedDay].exercises.push({ id, name, muscle: String(form.get("muscle")), sets: Number(form.get("sets")), reps: String(form.get("reps")).trim(), rest: "90 s", image: "", query: `${name} execução exercício` });
  clearSessionCompletion(state.selectedDay);
  saveState();
  event.currentTarget.reset();
  document.querySelector("#exercise-sets").value = "3";
  document.querySelector("#exercise-reps").value = "8–12";
  dialog.close();
  render();
  showToast(`${name} adicionado ao treino de ${weekDays.find((day) => day.id === state.selectedDay).name}.`);
  document.querySelector(`[data-card="${CSS.escape(id)}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
});

const installButton = document.querySelector("#install-button");
const installHint = document.querySelector("#install-hint");
const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
const isStandalone = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone;
if (isIos && !isStandalone) {
  installButton.hidden = false;
  installButton.addEventListener("click", () => { installHint.hidden = !installHint.hidden; });
}
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
  installButton.hidden = false;
  installButton.textContent = "Instalar aplicativo";
  installButton.addEventListener("click", async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    await installPrompt.userChoice;
    installPrompt = null;
    installButton.hidden = true;
  }, { once: true });
});
window.addEventListener("appinstalled", () => { installButton.hidden = true; showToast("Ritmo instalado com sucesso."); });

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}

render();