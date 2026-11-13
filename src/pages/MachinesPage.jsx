import { useState } from "react";
import { Link } from "react-router-dom";
import MachineCard from "../components/MachineCard.jsx";
import SearchFilters from "../components/SearchFilters.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import { Loader, ErrorMessage } from "../components/Feedback.jsx";

export default function MachinesPage({ machines, loading, error, onStatusChange, onDelete }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [toDelete, setToDelete] = useState(null);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  // Filtrage sur une copie : les données d'origine ne sont pas modifiées
  const visible = machines.filter(
    (m) =>
      m.name.toLowerCase().includes(search.trim().toLowerCase()) && (status === "" || m.status === status)
  );

  const reset = () => {
    setSearch("");
    setStatus("");
  };

  const confirmDelete = () => {
    onDelete(toDelete.id);
    setToDelete(null);
  };

  return (
    <section>
      <div className="page-head">
        <h1>Machines</h1>
        <Link to="/machines/new" className="btn primary">
          Ajouter une machine
        </Link>
      </div>
      <SearchFilters search={search} status={status} onSearch={setSearch} onStatus={setStatus} onReset={reset} />

      {visible.length === 0 ? (
        <div className="empty">Aucun résultat : aucune machine ne correspond à votre recherche.</div>
      ) : (
        <div className="grid">
          {visible.map((m) => (
            <MachineCard key={m.id} machine={m} onStatusChange={onStatusChange} onDelete={setToDelete} />
          ))}
        </div>
      )}

      {toDelete && (
        <ConfirmDialog
          title="Supprimer cette machine ?"
          message={`« ${toDelete.name} » sera retirée de la liste. Cette action est définitive pour la session.`}
          confirmLabel="Supprimer"
          onConfirm={confirmDelete}
          onCancel={() => setToDelete(null)}
        />
      )}
    </section>
  );
}
