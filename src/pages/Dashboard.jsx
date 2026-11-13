import StatCard from "../components/StatCard.jsx";
import { Loader, ErrorMessage } from "../components/Feedback.jsx";
import { STATUS } from "../constants/status.js";

export default function Dashboard({ machines, loading, error }) {
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  // Indicateurs toujours calculés depuis la liste actuelle
  const total = machines.length;
  const running = machines.filter((m) => m.status === STATUS.RUNNING).length;
  const broken = machines.filter((m) => m.status === STATUS.BROKEN).length;

  return (
    <section>
      <h1>Tableau de bord</h1>
      <p className="muted">Vue d'ensemble de l'état des équipements.</p>
      <div className="stats">
        <StatCard label="Machines au total" value={total} />
        <StatCard label="En fonctionnement" value={running} tone="running" />
        <StatCard label="En panne" value={broken} tone="broken" />
      </div>
    </section>
  );
}
