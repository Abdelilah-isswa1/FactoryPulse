import { useNavigate } from "react-router-dom";
import MachineForm from "../components/MachineForm.jsx";

export default function AddMachinePage({ onAdd }) {
  const navigate = useNavigate();

  const handleAdd = (data) => {
    onAdd(data);
    navigate("/machines");
  };

  return (
    <section>
      <h1>Ajouter une machine</h1>
      <p className="muted">Tous les champs sont obligatoires.</p>
      <MachineForm onSubmit={handleAdd} />
    </section>
  );
}
