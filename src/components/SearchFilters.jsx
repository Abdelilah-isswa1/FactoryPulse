import { STATUS_LIST } from "../constants/status.js";

export default function SearchFilters({ search, status, onSearch, onStatus, onReset }) {
  return (
    <div className="filters">
      <label>
        Rechercher par nom
        <input
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Ex. : Presse"
        />
      </label>
      <label>
        Statut
        <select value={status} onChange={(e) => onStatus(e.target.value)}>
          <option value="">Tous les statuts</option>
          {STATUS_LIST.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>
      <button type="button" className="btn secondary" onClick={onReset}>
        Réinitialiser
      </button>
    </div>
  );
}
