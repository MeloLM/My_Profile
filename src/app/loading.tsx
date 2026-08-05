/**
 * ⏳ Loading State - Next.js App Router
 * Mostrato automaticamente durante il caricamento della pagina
 * Utilizza lo stesso tema Dark Souls del loading screen principale
 */

import Image from 'next/image';

export default function Loading() {
  return (
    <div className="loading-screen" role="status" aria-label="Loading page">
      <div className="loading-content d-flex flex-column align-items-center justify-content-center text-center">
        <Image
          src="/img/bonfire.gif"
          alt="Bonfire loading animation"
          width={80}
          height={80}
          unoptimized
          className="mb-3"
        />
        <h3 className="loading-subtitle m-0 text-center">loading character ...</h3>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      </div>
    </div>
  );
}
