import { beforeEach, describe, expect, it, vi } from "vitest";
import { freshState, loadState, moveExercise, saveState } from "./state";

const items = new Map<string, string>();
beforeEach(() => {
  items.clear();
  vi.stubGlobal("localStorage", {
    getItem: (key: string) => items.get(key) ?? null,
    setItem: (key: string, value: string) => { items.set(key, value); },
  });
});

describe("registros locais", () => {
  it("preserva cargas, series e o dia selecionado ao recarregar", () => {
    const state = freshState();
    state.selectedDay = "mon";
    state.logs["mon:mon-barbell-bench:0"] = { checked: true, weight: "42", reps: "8" };
    saveState(state);
    const restored = loadState();
    expect(restored.selectedDay).toBe("mon");
    expect(restored.logs["mon:mon-barbell-bench:0"]).toEqual({ checked: true, weight: "42", reps: "8" });
  });

  it("salva a nova ordem sem trocar os registros de exercicio", () => {
    const state = freshState();
    state.logs["mon:mon-barbell-bench:0"] = { checked: true, weight: "42", reps: "8" };
    expect(moveExercise(state, "mon", "mon-barbell-bench", "mon-crossover")).toBe(true);
    expect(moveExercise(state, "mon", "inexistente", "mon-crossover")).toBe(false);
    saveState(state);
    const restored = loadState();
    expect(restored.sessions.mon?.exercises.map((exercise) => exercise.id)).toEqual([
      "mon-incline-dumbbell", "mon-dumbbell-shoulder-press", "mon-lateral-raise",
      "mon-crossover", "mon-barbell-bench", "mon-rope-pushdown",
    ]);
    expect(restored.logs["mon:mon-barbell-bench:0"].weight).toBe("42");
  });

  it("migra uma ficha padrao antiga sem perder o registro de um exercicio equivalente", () => {
    const state = freshState();
    state.planVersion = 2;
    state.sessions.mon = {
      title: "Superiores A", focus: "", description: "",
      exercises: [["a-chest-press", 2], ["a-row", 2], ["a-incline", 2], ["a-pulldown", 2], ["a-lateral", 2], ["a-triceps", 2], ["a-curl", 2]].map(([id, sets]) => ({ id: String(id), sets: Number(sets), name: String(id), muscle: "", reps: "8–12", rest: "90 s" })),
    };
    state.logs["mon:a-incline:0"] = { checked: true, weight: "17", reps: "9" };
    saveState(state);
    const restored = loadState();
    expect(restored.planVersion).toBe(3);
    expect(restored.sessions.mon?.title).toBe("Peito, ombros e tríceps");
    expect(restored.logs["mon:mon-incline-dumbbell:0"].weight).toBe("17");
  });

  it("inicia com a ficha padrao se os dados estiverem corrompidos", () => {
    items.set("ritmo-training-log-v1", "{invalido");
    expect(loadState().sessions.mon?.exercises.length).toBeGreaterThan(0);
  });
});