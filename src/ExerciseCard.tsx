import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { useRef, useState } from "react";
import { exerciseImage, type DayId, type Exercise } from "./data";
import { getExerciseLog, type ExerciseLog, type TrainingState } from "./state";

interface Props {
  exercise: Exercise;
  dayId: DayId;
  index: number;
  state: TrainingState;
  onLog: (exerciseId: string, index: number, field: keyof ExerciseLog, value: string | boolean) => void;
  onAddSet: (exerciseId: string) => void;
  onRemove: (exerciseId: string) => void;
}

export function ExerciseCard({ exercise, dayId, index, state, onLog, onAddSet, onRemove }: Props) {
  const [frame, setFrame] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [mediaOpen, setMediaOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({ id: exercise.id });
  const hasReference = Boolean(exercise.imageId) && !imageError;
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.query || `${exercise.name} execução exercício`)}`;
  const completed = Array.from({ length: Number(exercise.sets) }, (_, setIndex) => getExerciseLog(state, dayId, exercise.id, setIndex).checked).every(Boolean);

  return <article ref={setNodeRef} className={`exercise-card${completed ? " is-complete" : ""}${isDragging ? " is-dragging" : ""}`} style={{ transform: CSS.Transform.toString(transform), transition }}>
    <div className="exercise-media">
      <div className={`exercise-photo${hasReference ? "" : " image-fallback"}`}>
        {hasReference ? <img src={exerciseImage(exercise.imageId!, frame)} alt={`${exercise.name}, posição ${frame ? "final" : "inicial"}`} loading="lazy" onError={() => setImageError(true)} />
          : <span className="photo-placeholder">FIGURA<br />{imageError ? "INDISPONÍVEL" : "NÃO CADASTRADA"}</span>}
      </div>
      {hasReference && <div className="exercise-media-controls">
        <span className="photo-index">{String(index + 1).padStart(2, "0")}</span>
        <div className="media-actions">
          <button className="image-expand" type="button" aria-label={`Ampliar imagens de ${exercise.name}`} title="Ampliar imagens" onClick={() => { setMediaOpen(true); dialog.current?.showModal(); }}>⤢</button>
          <button className="image-toggle" type="button" aria-label={`Ver posição ${frame ? "inicial" : "final"} de ${exercise.name}`} onClick={() => setFrame(1 - frame)}>Ver {frame ? "início" : "final"} <span aria-hidden="true">{frame ? "↙" : "↗"}</span></button>
        </div>
      </div>}
    </div>
    <div className="exercise-body">
      <div className="exercise-topline"><span className="muscle-tag">{exercise.muscle}</span><div className="exercise-card-actions"><button className="drag-handle" type="button" ref={setActivatorNodeRef} {...attributes} {...listeners} aria-label={`Arrastar ${exercise.name} para mudar a ordem`} title="Arrastar para reordenar"><GripVertical size={17} aria-hidden="true" /></button><button className="remove-exercise" type="button" onClick={() => onRemove(exercise.id)} aria-label={`Remover ${exercise.name}`} title="Remover exercício">×</button></div></div>
      <div className="exercise-name-row"><h3 className="exercise-name">{exercise.name}</h3><span className="exercise-prescription">{exercise.sets} × {exercise.reps}</span></div>
      <div className="exercise-details"><span>Descanso <strong>{exercise.rest || "90 s"}</strong></span><span className="detail-dot">·</span><a className="demo-link" href={searchUrl} target="_blank" rel="noreferrer">Ver demonstração <span aria-hidden="true">↗</span></a></div>
      {exercise.alternative && <p className="exercise-alternative"><strong>Alternativa:</strong> {exercise.alternative}</p>}
      <div className="set-list">{Array.from({ length: Number(exercise.sets) }, (_, setIndex) => {
        const log = getExerciseLog(state, dayId, exercise.id, setIndex);
        return <div className={`set-row${log.checked ? " is-checked" : ""}`} key={setIndex}>
          <label className="set-check"><input type="checkbox" checked={log.checked} onChange={(event) => onLog(exercise.id, setIndex, "checked", event.target.checked)} aria-label={`Marcar série ${setIndex + 1} de ${exercise.name}`} /><span>Série {setIndex + 1}</span></label>
          <label className="set-input-wrap"><input className="set-input" type="number" inputMode="decimal" min="0" step="0.5" placeholder="kg" value={log.weight} onChange={(event) => onLog(exercise.id, setIndex, "weight", event.target.value)} aria-label={`Carga em quilogramas, série ${setIndex + 1}`} /><span>kg</span></label>
          <label className="set-input-wrap"><input className="set-input" type="number" inputMode="numeric" min="0" step="1" placeholder="reps" value={log.reps} onChange={(event) => onLog(exercise.id, setIndex, "reps", event.target.value)} aria-label={`Repetições, série ${setIndex + 1}`} /><span>rep</span></label>
        </div>;
      })}</div>
      <button className="add-set" type="button" onClick={() => onAddSet(exercise.id)}>+ Adicionar série</button>
    </div>
    {exercise.imageId && <dialog className="exercise-dialog media-dialog" ref={dialog} aria-label={`Execução de ${exercise.name}`} onClose={() => setMediaOpen(false)} onClick={(event) => { if (event.target === dialog.current) dialog.current?.close(); }} onKeyDown={(event) => { if (event.key === "Escape") { event.preventDefault(); dialog.current?.close(); } }}>
      <div className="dialog-top"><span className="mini-overline">EXECUÇÃO DO EXERCÍCIO</span><button className="dialog-close" type="button" onClick={() => dialog.current?.close()} aria-label="Fechar imagens">×</button></div>
      <h2>{exercise.name}</h2>
      {mediaOpen && <div className="media-frames">
        <figure><img src={exerciseImage(exercise.imageId, 0)} alt={`${exercise.name}, posição inicial`} /><figcaption>Posição inicial</figcaption></figure>
        <figure><img src={exerciseImage(exercise.imageId, 1)} alt={`${exercise.name}, posição final`} /><figcaption>Posição final</figcaption></figure>
      </div>}
    </dialog>}
  </article>;
}