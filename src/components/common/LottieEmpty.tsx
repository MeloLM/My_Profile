/**
 * 🎬 LottieEmpty Component
 * Animazione Lottie per stato vuoto (nessun risultato)
 * Usa un'animazione SVG/CSS fallback se Lottie non disponibile
 */
'use client';

import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

// Animazione inline: cerchio pulsante "nessun risultato" stile Dark Souls
const emptyAnimation = {
  v: '5.7.4',
  fr: 30,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  nm: 'Empty',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'Circle',
      sr: 1,
      ks: {
        o: { a: 1, k: [{ t: 0, s: [40], e: [100] }, { t: 30, s: [100], e: [40] }, { t: 60, s: [40] }], ix: 11 },
        r: { a: 0, k: 0, ix: 10 },
        p: { a: 0, k: [100, 100, 0], ix: 2, l: 2 },
        a: { a: 0, k: [0, 0, 0], ix: 1, l: 2 },
        s: { a: 1, k: [{ t: 0, s: [90, 90, 100] }, { t: 30, s: [110, 110, 100] }, { t: 60, s: [90, 90, 100] }], ix: 6, l: 2 },
      },
      ao: 0,
      shapes: [
        {
          ty: 'el',
          d: 1,
          s: { a: 0, k: [80, 80], ix: 2 },
          p: { a: 0, k: [0, 0], ix: 3 },
          nm: 'Ellipse Path',
          hd: false,
        },
        {
          ty: 'st',
          c: { a: 0, k: [0.878, 0.533, 0.129, 1], ix: 3 },
          o: { a: 0, k: 100, ix: 4 },
          w: { a: 0, k: 4, ix: 5 },
          lc: 1,
          lj: 1,
          ml: 4,
          nm: 'Stroke',
          hd: false,
        },
        {
          ty: 'fl',
          c: { a: 0, k: [0.878, 0.533, 0.129, 0.1], ix: 4 },
          o: { a: 0, k: 10, ix: 5 },
          r: 1,
          bm: 0,
          nm: 'Fill',
          hd: false,
        },
      ],
      ip: 0,
      op: 60,
      st: 0,
    },
  ],
};

interface LottieEmptyProps {
  message?: string;
  height?: number;
}

export default function LottieEmpty({ message = 'Nessun risultato', height = 120 }: LottieEmptyProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '20px 0' }}>
      <Lottie
        animationData={emptyAnimation}
        loop
        style={{ height, width: height }}
        aria-hidden="true"
      />
      <p style={{ color: '#888', fontSize: 15, margin: 0, letterSpacing: '0.05em' }}>{message}</p>
    </div>
  );
}
