import { DndContext, KeyboardSensor, MouseSensor, TouchSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { weekDays, type DayId, type Exercise } from "./data";
import { ExerciseCard } from "./ExerciseCard";
import { clearSessionCompletion, countSession, createWorkoutForDay, getExerciseLog, isSessionDone, loadState, localDateKey, moveExercise, saveState, type ExerciseLog, type TrainingState } from "./state";

interface InstallEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: string }>;
}

function CompletionCalendar({ dates }: { dates: string[] }) {
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const start = new Date(month.getFullYear(), month.getMonth(), 1 - first.getDay());
  const current = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const monthLabel = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(month);
  return <section className="completion-calendar" aria-label="Calendário de treinos concluídos">
    <div className="calendar-heading">
      <div><span className="mini-overline">HISTÓRICO</span><h3 id="calendar-month">{monthLabel}</h3></div>
      <div className="calendar-nav"><button type="button" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} aria-label="Mês anterior" title="Mês anterior">‹</button><button type="button" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} disabled={month >= current} aria-label="Próximo mês" title="Próximo mês">›</button></div>
    </div>
    <div className="calendar-weekdays" aria-hidden="true"><span>Do</span><span>Se</span><span>Te</span><span>Qa</span><span>Qi</span><span>Se</span><span>Sa</span></div>
    <div className="calendar-grid" role="grid" aria-labelledby="calendar-month">{Array.from({ length: 42 }, (_, index) => {
      const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + index);
      const dateKey = localDateKey(date);
      const completed = dates.includes(dateKey);
      const label = new Intl.DateTimeFormat("pt-BR", { dateStyle: "full" }).format(date);
      return <span key={dateKey} className={`calendar-day${date.getMonth() !== month.getMonth() ? " outside-month" : ""}${dateKey === localDateKey() ? " is-today" : ""}${completed ? " is-complete" : ""}`} role="gridcell" aria-label={`${label}${completed ? ", treino concluído" : ""}`}><span>{date.getDate()}</span>{completed && <span className="calendar-check" aria-hidden="true">✓</span>}</span>;
    })}</div>
    <div className="calendar-legend"><span aria-hidden="true">✓</span> Treino concluído</div>
  </section>;
}

export default function App() {
  const [state, setState] = useState(loadState);
  const [editingWeek, setEditingWeek] = useState(false);
  const [toast, setToast] = useState("");
  const [installHint, setInstallHint] = useState(false);
  const [canInstall, setCanInstall] = useState(() => /iphone|ipad|ipod/i.test(navigator.userAgent)
    && !window.matchMedia("(display-mode: standalone)").matches
    && !(navigator as Navigator & { standalone?: boolean }).standalone);
  const installPrompt = useRef<InstallEvent | null>(null);
  const addDialog = useRef<HTMLDialogElement>(null);
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 180, tolerance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  useEffect(() => {
    try { saveState(state); } catch { setToast("Não foi possível salvar. Verifique o espaço disponível no aparelho."); }
  }, [state]);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 3000);
    return () => window.clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    const handleInstall = (event: Event) => {
      event.preventDefault();
      installPrompt.current = event as InstallEvent;
      setCanInstall(true);
    };
    const handleInstalled = () => { setCanInstall(false); setToast("Ritmo instalado com sucesso."); };
    window.addEventListener("beforeinstallprompt", handleInstall);
    window.addEventListener("appinstalled", handleInstalled);
    return () => { window.removeEventListener("beforeinstallprompt", handleInstall); window.removeEventListener("appinstalled", handleInstalled); };
  }, []);

  const update = (change: (draft: TrainingState) => void) => setState((current) => {
    const draft = structuredClone(current);
    change(draft);
    return draft;
  });
  const active = Boolean(state.activeDays[state.selectedDay] && state.sessions[state.selectedDay]);
  const session = state.sessions[state.selectedDay];
  const day = weekDays.find((item) => item.id === state.selectedDay)!;
  const counts = countSession(state, state.selectedDay);
  const done = isSessionDone(state, state.selectedDay);
  const activeDays = weekDays.filter((item) => state.activeDays[item.id]);
  const doneDays = activeDays.filter((item) => isSessionDone(state, item.id)).length;
  const progressMessage = !active ? "Dia livre para recuperar." : done ? "Sessão concluída. Bom trabalho." : counts.checked ? "Boa. Continue no seu ritmo." : "Um passo de cada vez.";
  const weekFootnote = !activeDays.length ? "Adicione um dia de treino para acompanhar a semana." : doneDays === activeDays.length ? "Todos os treinos programados foram concluídos." : doneDays ? `${activeDays.length - doneDays} ${activeDays.length - doneDays === 1 ? "treino restante" : "treinos restantes"} nesta semana.` : "Cada sessão conta. A próxima começa quando você quiser.";

  function toggleDay(dayId: DayId) {
    update((draft) => {
      draft.activeDays[dayId] = !draft.activeDays[dayId];
      if (draft.activeDays[dayId] && !draft.sessions[dayId]) createWorkoutForDay(draft, dayId);
      if (!draft.activeDays[dayId]) clearSessionCompletion(draft, dayId);
    });
  }
  function updateLog(exerciseId: string, index: number, field: keyof ExerciseLog, value: string | boolean) {
    update((draft) => {
      const key = `${draft.selectedDay}:${exerciseId}:${index}`;
      const log = getExerciseLog(draft, draft.selectedDay, exerciseId, index);
      draft.logs[key] = { ...log, [field]: value };
      if (field === "checked" && !value) clearSessionCompletion(draft, draft.selectedDay);
    });
  }
  function addSet(exerciseId: string) {
    if ((session?.exercises.find((item) => item.id === exerciseId)?.sets || 0) >= 8) { setToast("Este exercício já atingiu o limite de 8 séries."); return; }
    update((draft) => {
      const exercise = draft.sessions[draft.selectedDay]?.exercises.find((item) => item.id === exerciseId);
      if (exercise) exercise.sets += 1;
      clearSessionCompletion(draft, draft.selectedDay);
    });
  }
  function removeExercise(exerciseId: string) {
    const exercise = session?.exercises.find((item) => item.id === exerciseId);
    if (!exercise) return;
    if (!window.confirm(`Remover ${exercise.name} deste treino? Os registros deste exercício neste dia também serão apagados.`)) return;
    update((draft) => {
      const dayId = draft.selectedDay;
      draft.sessions[dayId]!.exercises = draft.sessions[dayId]!.exercises.filter((item) => item.id !== exerciseId);
      Object.keys(draft.logs).filter((key) => key.startsWith(`${dayId}:${exerciseId}:`)).forEach((key) => delete draft.logs[key]);
      clearSessionCompletion(draft, dayId);
    });
    setToast(`${exercise.name} removido da sessão.`);
  }
  function addExercise(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    if (!name) return;
    const exercise: Exercise = { id: `custom-${crypto.randomUUID()}`, name, muscle: String(form.get("muscle")), sets: Number(form.get("sets")), reps: String(form.get("reps")).trim(), rest: "90 s", query: `${name} execução exercício` };
    update((draft) => { draft.sessions[draft.selectedDay]?.exercises.push(exercise); clearSessionCompletion(draft, draft.selectedDay); });
    event.currentTarget.reset();
    addDialog.current?.close();
    setToast(`${name} adicionado ao treino de ${day.name}.`);
  }
  function clearSession() {
    if (!window.confirm(`Limpar os registros de ${day.name}? Esta ação não pode ser desfeita.`)) return;
    update((draft) => {
      Object.keys(draft.logs).filter((key) => key.startsWith(`${draft.selectedDay}:`)).forEach((key) => delete draft.logs[key]);
      clearSessionCompletion(draft, draft.selectedDay);
    });
    setToast(`Registros de ${day.name} limpos.`);
  }
  async function install() {
    if (!installPrompt.current) { setInstallHint((visible) => !visible); return; }
    await installPrompt.current.prompt();
    await installPrompt.current.userChoice;
    installPrompt.current = null;
  }

  return <>
    <div className="app-shell">
      <aside className="sidebar" aria-label="Navegação principal">
        <a className="brand" href="#treino" aria-label="Ritmo, início"><span className="brand-mark">r<span>.</span></span><span className="brand-name">ritmo<span>treino pessoal</span></span></a>
        <div className="side-label">ESPAÇO DE TREINO</div>
        <nav className="side-nav"><a className="nav-link active" href="#treino"><span className="nav-symbol">01</span> Meu treino</a><a className="nav-link" href="#progresso"><span className="nav-symbol">02</span> Progresso</a></nav>
        <div className="sidebar-bottom">
          <div className="natural-note"><span className="note-dot" /><span>Constância acima<br />de perfeição.</span></div>
          {canInstall && <><button className="install-button" type="button" onClick={install}>{installPrompt.current ? "Instalar aplicativo" : "Instalar no iPhone"}</button>{installHint && <p className="install-hint">No Safari: toque em Compartilhar e depois em “Adicionar à Tela de Início”.</p>}</>}
          <span className="offline-state"><span className="status-dot" /> Seus dados ficam neste aparelho</span>
        </div>
      </aside>
      <main className="main-content" id="treino">
        <header className="topbar"><div className="breadcrumb"><span>MEU ESPAÇO</span><span className="breadcrumb-separator">/</span><strong>TREINO</strong></div><div className="topbar-right"><span className="today-label">{new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "numeric", month: "long" }).format(new Date())}</span><span className="avatar" aria-hidden="true">R</span></div></header>
        <div className="page-heading"><div><p className="eyebrow">PLANO SEMANAL · REGISTRO LOCAL</p><h1>Seu treino<span className="heading-period">.</span></h1></div><button className="quiet-button" type="button" onClick={clearSession} hidden={!active} title="Limpar os registros desta sessão">Limpar sessão <span aria-hidden="true">↺</span></button></div>
        <section className="week-strip" aria-label="Escolha a sessão">
          <div className="week-strip-copy"><span className="mini-overline">SEMANA DE TREINO</span><span className="week-summary">{activeDays.length} {activeDays.length === 1 ? "treino" : "treinos"} na semana</span></div>
          <div className="session-tabs" role="group" aria-label="Dias da semana">{weekDays.map((item) => {
            const isActive = state.activeDays[item.id];
            const selected = state.selectedDay === item.id;
            const status = isActive ? "Treino" : "Livre";
            const label = editingWeek ? `${isActive ? "Remover treino de" : "Adicionar treino em"} ${item.name}` : `${item.name}: ${status.toLowerCase()}`;
            return <button key={item.id} className={`session-tab${selected ? " active" : ""}${isSessionDone(state, item.id) ? " is-done" : ""}${isActive ? " has-workout" : " is-rest"}`} type="button" aria-pressed={!editingWeek && selected} aria-label={label} title={label} onClick={() => editingWeek ? toggleDay(item.id) : update((draft) => { draft.selectedDay = item.id; })}><span className="tab-day">{item.label}</span><span className="tab-title">{status}</span><span className="tab-status" aria-hidden="true" />{editingWeek && <span className="day-edit-indicator" aria-hidden="true">{isActive ? "−" : "+"}</span>}</button>;
          })}</div>
          <button className="configure-days-button" type="button" aria-pressed={editingWeek} onClick={() => setEditingWeek(!editingWeek)}>{editingWeek ? "Concluir edição" : "Editar semana"}</button>
          {editingWeek && <span className="week-edit-hint">Toque em um dia para alternar entre treino e descanso.</span>}
        </section>
        <div className="content-grid">
          <section className="workout-column">
            <div className="session-heading"><div><div className="session-kicker"><span className="session-letter">{day.label}</span><span>{active ? session?.focus : `${day.name.toUpperCase()} · DIA DE DESCANSO`}</span></div><h2>{active ? session?.title : "Dia de descanso"}</h2><p className="session-description">{active ? session?.description : "Recuperação também faz parte do progresso."}</p></div><div className="completion-ring" aria-label="Progresso da sessão"><span>{active ? counts.checked : 0}/{active ? counts.total : 0}</span><small>séries</small></div></div>
            <div className="exercise-list">{active && session ? <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={({ active: dragged, over }) => {
              if (!over || dragged.id === over.id) return;
              const targetIndex = session.exercises.findIndex((item) => item.id === over.id);
              const exercise = session.exercises.find((item) => item.id === dragged.id);
              if (targetIndex < 0 || !exercise) return;
              update((draft) => { moveExercise(draft, draft.selectedDay, String(dragged.id), String(over.id)); });
              setToast(`${exercise.name} agora está na posição ${targetIndex + 1}.`);
            }}><SortableContext items={session.exercises.map((exercise) => exercise.id)} strategy={verticalListSortingStrategy}>
              {session.exercises.map((exercise, index) => <ExerciseCard key={exercise.id} exercise={exercise} dayId={state.selectedDay} index={index} state={state} onLog={updateLog} onAddSet={addSet} onRemove={removeExercise} />)}
            </SortableContext></DndContext>
              : <div className="rest-day-panel"><span className="rest-day-overline">{day.label} · RECUPERAÇÃO</span><h3>Sem treino programado.</h3><p>Este dia está livre na sua semana.</p><button className="rest-day-add" type="button" onClick={() => toggleDay(day.id)}>Adicionar treino neste dia <span aria-hidden="true">+</span></button></div>}</div>
            {active && <><button className="add-exercise-button" type="button" onClick={() => addDialog.current?.showModal()}><span className="add-symbol" aria-hidden="true">+</span> Adicionar exercício <span className="add-note">personalize sua sessão</span></button>
              <div className="session-footer"><div className="progress-copy"><span>{progressMessage}</span><div className="progress-track"><span style={{ width: `${counts.total ? counts.checked / counts.total * 100 : 0}%` }} /></div></div><button className="finish-button" type="button" disabled={!counts.total || counts.checked !== counts.total || done} onClick={() => { update((draft) => { const date = localDateKey(); draft.completed[draft.selectedDay] = date; if (!draft.completedDates.includes(date)) draft.completedDates.push(date); }); setToast("Treino concluído e salvo neste aparelho."); }}>{done ? "Treino concluído" : "Concluir treino"} <span aria-hidden="true">{done ? "✓" : "→"}</span></button></div>
            </>}
          </section>
          <aside className="insight-column" id="progresso">
            <section className="week-card"><div className="card-heading"><div><span className="mini-overline">RITMO DA SEMANA</span><h3>Seu progresso</h3></div><span className="week-icon" aria-hidden="true">↗</span></div><div className="week-count"><span>{doneDays}</span><span className="week-count-label">de {activeDays.length} treinos<br />na semana</span></div><div className="week-progress"><span style={{ width: `${activeDays.length ? doneDays / activeDays.length * 100 : 0}%` }} /></div><p className="week-footnote">{weekFootnote}</p></section>
            <CompletionCalendar dates={state.completedDates} />
            <section className="tip-panel"><div className="tip-index">PROGRESSÃO DUPLA</div><h3>Registre.<br /><em>Repita. Avance.</em></h3><p>Ao atingir o topo da faixa em todas as séries, com técnica e RIR planejado, aumente a carga pelo menor incremento. Com a carga nova, volte a subir as repetições gradualmente.</p><span className="tip-rule" aria-hidden="true" /><div className="tip-foot"><span>ALVO NA MAIORIA DAS SÉRIES</span><strong>1–3 <small>RIR</small></strong></div></section>
            <section className="program-notes" aria-label="Orientações do programa"><span className="mini-overline">COMPLEMENTO</span><p><strong>Cardio:</strong> 2–3 sessões por semana, 20–30 min em intensidade moderada. Evite atrapalhar a recuperação das pernas.</p><p><strong>Aquecimento:</strong> faça antes dos exercícios pesados; séries de aquecimento não contam como séries efetivas.</p><p className="program-caution">A ficha contém cerca de 97 séries efetivas semanais. Se o treino exceder seu tempo ou a recuperação piorar, ajuste o volume com orientação profissional; não encurte o descanso dos compostos.</p></section>
            <div className="privacy-note"><span className="privacy-icon" aria-hidden="true">●</span><p>Seu histórico fica neste aparelho. Ilustrações: <a href="https://github.com/yuhonas/free-exercise-db" target="_blank" rel="noreferrer">Free Exercise DB, Unlicense</a>.</p></div>
          </aside>
        </div>
      </main>
    </div>
    <nav className="mobile-nav" aria-label="Navegação inferior"><a className="mobile-nav-link active" href="#treino"><span aria-hidden="true">▤</span>Treino</a><a className="mobile-nav-link" href="#progresso"><span aria-hidden="true">↗</span>Progresso</a></nav>
    <dialog className="exercise-dialog" ref={addDialog} onClick={(event) => { if (event.target === addDialog.current) addDialog.current?.close(); }}>
      <form onSubmit={addExercise}>
        <div className="dialog-top"><span className="mini-overline">PERSONALIZE A SESSÃO</span><button className="dialog-close" type="button" onClick={() => addDialog.current?.close()} aria-label="Fechar">×</button></div>
        <h2>Novo exercício<span className="heading-period">.</span></h2>
        <label className="field-label" htmlFor="exercise-name">Nome do exercício</label><input className="text-field" id="exercise-name" name="name" maxLength={50} placeholder="Ex.: Remada unilateral" required />
        <div className="field-row"><div><label className="field-label" htmlFor="exercise-muscle">Grupo muscular</label><select className="text-field" id="exercise-muscle" name="muscle">{["Peito", "Costas", "Ombros", "Quadríceps", "Posterior de coxa", "Glúteos", "Bíceps", "Tríceps", "Panturrilhas", "Core"].map((muscle) => <option key={muscle}>{muscle}</option>)}</select></div><div><label className="field-label" htmlFor="exercise-sets">Séries</label><input className="text-field" id="exercise-sets" name="sets" type="number" min="1" max="8" defaultValue="3" required /></div></div>
        <label className="field-label" htmlFor="exercise-reps">Faixa de repetições</label><input className="text-field" id="exercise-reps" name="reps" maxLength={12} defaultValue="8–12" required />
        <div className="dialog-actions"><button className="dialog-cancel" type="button" onClick={() => addDialog.current?.close()}>Cancelar</button><button className="dialog-submit" type="submit">Adicionar à sessão <span aria-hidden="true">→</span></button></div>
      </form>
    </dialog>
    <div className={`toast${toast ? " is-visible" : ""}`} role="status" aria-live="polite">{toast}</div>
  </>;
}