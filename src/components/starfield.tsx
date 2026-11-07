/**
 * Decorative American-flag canton on the main column.
 * 50 five-point stars, server-rendered. Motion is CSS only
 * (see `.starfield-star` in globals.css): an 8s ease-in-out wave,
 * translateY ±8px and rotate ±2deg, delayed by
 * -(column * 0.45s + row * 0.12s) so the field ripples.
 */

const COLUMN_STAGGER_S = 0.45;
const ROW_STAGGER_S = 0.12;
const FLAG_COLUMNS = 6;
const FLAG_ROWS = 9;

const STAR_PATH =
  "M12 1.4 14.82 8.18 22.1 8.76 16.78 13.68 18.62 21.02 12 17.02 5.38 21.02 7.22 13.68 1.9 8.76 9.18 8.18Z";

const TONES = ["dim", "mid", "bright"] as const;

type Star = {
  id: string;
  x: number;
  y: number;
  delay: number;
  tone: (typeof TONES)[number];
};

/** Nine rows alternating 6 and 5 stars, odd rows shifted half a column. */
function flagStars(): Star[] {
  const stars: Star[] = [];
  for (let row = 0; row < FLAG_ROWS; row++) {
    const count = row % 2 === 0 ? FLAG_COLUMNS : FLAG_COLUMNS - 1;
    const offset = row % 2 === 0 ? 0 : 0.5;
    for (let col = 0; col < count; col++) {
      stars.push({
        id: `r${row}c${col}`,
        x: ((col + offset + 0.5) / FLAG_COLUMNS) * 100,
        y: ((row + 0.5) / FLAG_ROWS) * 100,
        delay: -(col * COLUMN_STAGGER_S + row * ROW_STAGGER_S),
        tone: TONES[(row + col) % TONES.length],
      });
    }
  }
  return stars;
}

export function Starfield() {
  return (
    <div className="starfield" aria-hidden="true">
      {flagStars().map((star) => (
        <svg
          key={star.id}
          aria-hidden="true"
          focusable="false"
          className="starfield-star"
          data-tone={star.tone}
          viewBox="0 0 24 24"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            animationDelay: `${star.delay}s`,
          }}
        >
          <path fill="currentColor" d={STAR_PATH} />
        </svg>
      ))}
    </div>
  );
}
