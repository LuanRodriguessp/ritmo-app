export type DayId = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
export type PlanId = "A" | "B" | "C" | "D" | "E";

export interface Exercise {
  id: string;
  name: string;
  muscle: string;
  sets: number;
  reps: string;
  rest: string;
  imageId?: string;
  query?: string;
  alternative?: string;
}

export interface Session {
  title: string;
  focus: string;
  description: string;
  exercises: Exercise[];
}

export const weekDays: { id: DayId; label: string; name: string }[] = [
  { id: "mon", label: "SEG", name: "Segunda" }, { id: "tue", label: "TER", name: "Terça" },
  { id: "wed", label: "QUA", name: "Quarta" }, { id: "thu", label: "QUI", name: "Quinta" },
  { id: "fri", label: "SEX", name: "Sexta" }, { id: "sat", label: "SÁB", name: "Sábado" },
  { id: "sun", label: "DOM", name: "Domingo" },
];

export const defaultPlanByDay: Partial<Record<DayId, PlanId>> = { mon: "A", tue: "B", wed: "C", thu: "D", fri: "E" };

export const initialSessions: Record<PlanId, Session> = {
  A: {
    title: "Peito, ombros e tríceps", focus: "PEITO · OMBROS · TRÍCEPS",
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
    title: "Pernas A · ênfase em quadríceps", focus: "QUADRÍCEPS · POSTERIOR · PANTURRILHAS",
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
    title: "Costas e bíceps", focus: "COSTAS · DELTOIDE POSTERIOR · BÍCEPS",
    description: "Quarta-feira · Na remada unilateral, complete as repetições de cada lado antes de iniciar a próxima série.",
    exercises: [
      { id: "wed-lat-pulldown", name: "Puxada alta", muscle: "Costas · Bíceps", sets: 3, reps: "6–10", rest: "2–3 min", imageId: "Wide-Grip_Lat_Pulldown", query: "puxada alta na frente execução" },
      { id: "wed-seated-row", name: "Remada baixa", muscle: "Costas · Bíceps", sets: 3, reps: "8–12", rest: "2 min", imageId: "Seated_Cable_Rows", query: "remada baixa cabo execução" },
      { id: "wed-one-arm-row", name: "Remada unilateral", muscle: "Costas · Bíceps", sets: 3, reps: "8–12", rest: "2 min", imageId: "One-Arm_Dumbbell_Row", query: "remada unilateral halter execução" },
      { id: "wed-straight-arm-pulldown", name: "Pulldown com braços estendidos", muscle: "Costas", sets: 2, reps: "10–15", rest: "1–1:30 min", imageId: "Straight-Arm_Pulldown", query: "pulldown braços estendidos execução", alternative: "Pulldown unilateral na polia — 2 × 10–15" },
      { id: "wed-face-pull", name: "Face pull", muscle: "Deltoide posterior · Costas", sets: 3, reps: "12–15", rest: "1–1:30 min", imageId: "Face_Pull", query: "face pull polia execução" },
      { id: "wed-barbell-curl", name: "Rosca direta", muscle: "Bíceps", sets: 3, reps: "8–12", rest: "1–1:30 min", imageId: "Barbell_Curl", query: "rosca direta barra execução" },
      { id: "wed-hammer-curl", name: "Rosca martelo", muscle: "Bíceps · Braquial", sets: 2, reps: "10–15", rest: "1–1:30 min", imageId: "Hammer_Curls", query: "rosca martelo halteres execução" },
    ],
  },
  D: {
    title: "Pernas B · posterior e glúteos", focus: "POSTERIOR · GLÚTEOS · QUADRÍCEPS",
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
    title: "Peito, costas e ombros", focus: "PEITO · COSTAS · OMBROS",
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

export const exerciseImage = (id: string, frame = 0) => `${import.meta.env.BASE_URL}assets/exercises/${id}/${frame}.jpg`;