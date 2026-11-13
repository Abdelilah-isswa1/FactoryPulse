import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MachinesPage from "./pages/MachinesPage.jsx";
import AddMachinePage from "./pages/AddMachinePage.jsx";
import KanbanPage from "./pages/KanbanPage.jsx";

export default function App() {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Chargement initial depuis public/machines.json
  useEffect(() => {
    let cancelled = false;
    fetch("/machines.json")
      .then((res) => {
        if (!res.ok) throw new Error("Réponse invalide du serveur");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setMachines(data);
      })
      .catch(() => {
        if (!cancelled)
          setError("Impossible de charger les machines. Vérifiez le fichier machines.json puis rechargez la page.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const addMachine = (data) => {
    setMachines((prev) => {
      const nextId = prev.reduce((max, m) => Math.max(max, m.id), 0) + 1;
      return [...prev, { id: nextId, ...data }];
    });
  };

  const updateStatus = (id, status) =>
    setMachines((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));

  const deleteMachine = (id) =>
    setMachines((prev) => prev.filter((m) => m.id !== id));

  const shared = { machines, loading, error };

  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Dashboard {...shared} />} />
          <Route
            path="/machines"
            element={<MachinesPage {...shared} onStatusChange={updateStatus} onDelete={deleteMachine} />}
          />
          <Route path="/machines/new" element={<AddMachinePage onAdd={addMachine} />} />
          <Route path="/kanban" element={<KanbanPage {...shared} onStatusChange={updateStatus} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}
