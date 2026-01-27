/**
 * 🏠 Home Page - Next.js 14+
 * Questo sostituisce App.js come entry point
 */

import HomePage from '../components/HomePage';

// Questa pagina è un Server Component per default
// Il componente HomePage è un Client Component (con "use client")
export default function Page() {
  return <HomePage />;
}
