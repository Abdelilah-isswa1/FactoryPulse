export const STATUS = {
  RUNNING: "En fonctionnement",
  STOPPED: "À l'arrêt",
  BROKEN: "En panne",
};

export const STATUS_LIST = Object.values(STATUS);

// Classe CSS associée à chaque statut
export const STATUS_CLASS = {
  [STATUS.RUNNING]: "running",
  [STATUS.STOPPED]: "stopped",
  [STATUS.BROKEN]: "broken",
};
