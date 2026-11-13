import { STATUS_CLASS, STATUS_LIST } from "../constants/status.js";
import StatusBadge from "./StatusBadge.jsx";

export default function MachineCard({ machine, onStatusChange, onDelete }) {
  return (
    <article className={`machine ${STATUS_CLASS[machine.status]}`}>
      <header>
        <div>
          <h3>{machine.name}</h3>
          <p className="muted">
            #{machine.id} — {machine.zone}
          </p>
        </div>
        <StatusBadge status={machine.status} />
      </header>
      <p className="production">
        <strong>{machine.production}</strong> pièces aujourd'hui
      </p>
      <footer>
        <label>
          Statut
          <select value={machine.status} onChange={(e) => onStatusChange(machine.id, e.target.value)}>
            {STATUS_LIST.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <button type="button" className="btn danger" onClick={() => onDelete(machine)}>
          Supprimer
        </button>
      </footer>
    </article>
  );
}
