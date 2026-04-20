/**
 * ⏳ Loading State - Next.js App Router
 * Mostrato automaticamente durante il caricamento della pagina
 * Utilizza lo stesso tema Dark Souls del loading screen principale
 */

export default function Loading() {
  return (
    <div className="loading-screen" role="status" aria-label="Loading page">
      <div className="loading-content">
        <div className="bonfire-animation">🔥</div>
        <h1 className="loading-title">LOADING...</h1>
        <p className="loading-subtitle">rest at the bonfire</p>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      </div>
    </div>
  );
}
