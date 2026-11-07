/**
 * Decorative flag field on the main column. 100 five-point stars,
 * server-rendered. Motion is CSS only (see globals.css).
 *
 * Left-to-right breeze: column 0 is ahead of column 9.
 * delay = -((9 - col) * 0.48s + row * 0.05s)
 * The 34% crest is reached on the left first and arrives at the
 * right-hand column 4.32s later. A negative delay that grows with
 * column would run the crest the other way, so it is not used.
 */

const COLS = 10;
const ROWS = 10;
const COLUMN_STAGGER_S = 0.48;
const ROW_STAGGER_S = 0.05;

const STAR_PATH =
  "M12 1.4 14.82 8.18 22.1 8.76 16.78 13.68 18.62 21.02 12 17.02 5.38 21.02 7.22 13.68 1.9 8.76 9.18 8.18Z";

type Star = {
  id: string;
  col: number;
  row: number;
  x: number;
  y: number;
  delay: number;
};

/** 10×10 flag field. Odd rows sit half a column to the right. */
function flagStars(): Star[] {
  const stars: Star[] = [];
  const minSlot = 0.25;
  const maxSlot = 10.25;
  for (let row = 0; row < ROWS; row++) {
    const shifted = row % 2 === 1;
    for (let col = 0; col < COLS; col++) {
      const slot = col + (shifted ? 1 : 0.5);
      const x = 5 + ((slot - minSlot) / (maxSlot - minSlot)) * 90;
      const y = 6 + ((row + 0.5) / ROWS) * 88;
      stars.push({
        id: `r${row}c${col}`,
        col,
        row,
        x,
        y,
        delay: -((COLS - 1 - col) * COLUMN_STAGGER_S + row * ROW_STAGGER_S),
      });
    }
  }
  return stars;
}

export function Starfield() {
  return (
    <div className="starfield-slot" aria-hidden="true">
      <div className="starfield">
      {flagStars().map((star) => (
        <svg
          key={star.id}
          aria-hidden="true"
          focusable="false"
          className="starfield-star"
          data-col={star.col}
          data-row={star.row}
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
    </div>
  );
}
