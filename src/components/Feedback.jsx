export function Loader() {
  return (
    <div className="feedback" role="status">
      <span className="spinner" aria-hidden="true" />
      Chargement des machines…
    </div>
  );
}

export function ErrorMessage({ message }) {
  return (
    <div className="feedback error" role="alert">
      {message}
    </div>
  );
}
