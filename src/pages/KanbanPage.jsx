import { useState } from "react";
import { Loader, ErrorMessage } from "../components/Feedback.jsx";
import { STATUS_LIST, STATUS_CLASS } from "../constants/status.js";

export default function KanbanPage({ machines, loading, error, onStatusChange }) {
  const [dragId, setDragId] = useState(null);
  const [overCol, setOverCol] = useState(null);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  const handleDrop = (e, status) => {
    e.preventDefault();
    const id = Number(e.dataTransfer.getData("text/plain")) || dragId;
    const machine = machines.find((m) => m.id === id);
    if (machine && machine.status !== status) onStatusChange(id, status);
    setDragId(null);
    setOverCol(null);
  };

  return (
    <section>
      <h1>Kanban</h1>
      <p className="muted">Glissez une carte vers une autre colonne pour changer le statut de la machine.</p>
      <div className="kanban">
        {STATUS_LIST.map((status) => {
          const items = machines.filter((m) => m.status === status);
          return (
            <div
              key={status}
              className={`column ${STATUS_CLASS[status]} ${overCol === status ? "over" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setOverCol(status);
              }}
              onDragLeave={() => setOverCol(null)}
              onDrop={(e) => handleDrop(e, status)}
            >
              <h2>
                {status} <span className="count">{items.length}</span>
              </h2>
              {items.length === 0 && <p className="muted">Aucune machine</p>}
              {items.map((m) => (
                <article
                  key={m.id}
                  className={`kcard ${dragId === m.id ? "dragging" : ""}`}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("text/plain", String(m.id));
                    setDragId(m.id);
                  }}
                  onDragEnd={() => {
                    setDragId(null);
                    setOverCol(null);
                  }}
                >
                  <h3>{m.name}</h3>
                  <p className="muted">{m.zone}</p>
                  <p>{m.production} pièces</p>
                  {/* Alternative tactile / clavier au glisser-déposer */}
                  <select
                    aria-label={`Changer le statut de ${m.name}`}
                    value={m.status}
                    onChange={(e) => onStatusChange(m.id, e.target.value)}
                  >
                    {STATUS_LIST.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </article>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}
