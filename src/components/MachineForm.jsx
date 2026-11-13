import { useState } from "react";
import { STATUS, STATUS_LIST } from "../constants/status.js";

const EMPTY = { name: "", zone: "", status: STATUS.RUNNING, production: "" };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Le nom de la machine est obligatoire.";
  if (!values.zone.trim()) errors.zone = "La zone de production est obligatoire.";
  if (!STATUS_LIST.includes(values.status)) errors.status = "Choisissez un statut dans la liste.";
  const prod = String(values.production).trim();
  if (prod === "") errors.production = "La production journalière est obligatoire.";
  else if (!/^\d+$/.test(prod)) errors.production = "Saisissez un nombre entier supérieur ou égal à 0.";
  return errors;
}

export default function MachineForm({ onSubmit }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    onSubmit({
      name: values.name.trim(),
      zone: values.zone.trim(),
      status: values.status,
      production: parseInt(values.production, 10),
    });
    setValues(EMPTY);
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <label>
        Nom de la machine
        <input name="name" value={values.name} onChange={handleChange} aria-invalid={!!errors.name} />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </label>
      <label>
        Zone de production
        <input name="zone" value={values.zone} onChange={handleChange} aria-invalid={!!errors.zone} />
        {errors.zone && <span className="field-error">{errors.zone}</span>}
      </label>
      <label>
        Statut
        <select name="status" value={values.status} onChange={handleChange}>
          {STATUS_LIST.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.status && <span className="field-error">{errors.status}</span>}
      </label>
      <label>
        Production journalière (pièces)
        <input
          name="production"
          inputMode="numeric"
          value={values.production}
          onChange={handleChange}
          aria-invalid={!!errors.production}
        />
        {errors.production && <span className="field-error">{errors.production}</span>}
      </label>
      <button type="submit" className="btn primary">
        Enregistrer la machine
      </button>
    </form>
  );
}
