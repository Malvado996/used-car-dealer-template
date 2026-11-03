import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Placeholder slot for a hero icon, logo, or illustration.
 * Swap the children for a real <Image /> or SVG when the dealer has artwork.
 */
export function HeroIconPlaceholder({ className, label = "Icon placeholder", children }: { className?: string; label?: string; children?: React.ReactNode }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "flex aspect-square w-full max-w-xs items-center justify-center rounded-xl border-2 border-dashed border-primary-foreground/40 bg-primary-foreground/5 text-primary-foreground/60",
        className,
      )}
    >
      {children ?? (
        <div className="flex flex-col items-center gap-2 text-sm font-semibold uppercase tracking-wider">
          <ImageIcon aria-hidden className="size-12" />
          {label}
        </div>
      )}
    </div>
  );
}
