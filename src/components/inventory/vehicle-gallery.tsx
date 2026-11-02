"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function VehicleGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  if (!images.length) return <div className="aspect-[3/2] rounded-xl bg-muted" />;
  return (
    <div>
      <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-muted">
        <Image src={images[active]} alt={`${title} — photo ${active + 1} of ${images.length}`} fill priority sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" />
      </div>
      {images.length > 1 && (
        <ul className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6" aria-label="Photo thumbnails">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === active}
                className={cn("relative block aspect-[3/2] w-full overflow-hidden rounded-md border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", i === active ? "border-primary" : "border-transparent")}
              >
                <Image src={src} alt="" fill sizes="120px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
