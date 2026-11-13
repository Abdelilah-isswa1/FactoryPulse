# FactoryPulse

Application React + Vite de suivi des machines industrielles (React Router, useState, useEffect, fetch).

## Lancer le projet
```bash
npm install
npm run dev
```
Puis ouvrir http://localhost:5173

## Structure
- `public/machines.json` : données initiales (8 machines)
- `src/App.jsx` : état global (machines, chargement, erreur) + routes
- `src/pages/` : Dashboard, MachinesPage, AddMachinePage, KanbanPage (bonus)
- `src/components/` : Navbar, StatCard, MachineCard, SearchFilters, MachineForm, ConfirmDialog, StatusBadge, Feedback
- `src/constants/status.js` : statuts autorisés

Les modifications sont conservées en mémoire uniquement (perdues au rechargement).
