import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Tableau de bord" },
  { to: "/machines", label: "Machines" },
  { to: "/machines/new", label: "Ajouter" },
  { to: "/kanban", label: "Kanban" },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <span className="brand">
          <span className="brand-dot" aria-hidden="true" />
          FactoryPulse
        </span>
        <nav aria-label="Navigation principale">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end className={({ isActive }) => (isActive ? "active" : "")}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
