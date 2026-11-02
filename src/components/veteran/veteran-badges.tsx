import { BadgePercent, Flag } from "lucide-react";
import { dealer } from "@/config/dealer";
import { cn } from "@/lib/utils";

/** Small pill badges: "Veteran-Owned" and "Military Discount". Renders nothing if not configured. */
export function VeteranBadges({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const v = dealer.veteran;
  if (!v || (!v.veteranOwned && !v.militaryDiscount)) return null;
  const pill = cn(
    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider",
    tone === "dark" ? "border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground" : "border-primary/20 bg-primary/5 text-primary",
  );
  return (
    <ul className={cn("flex flex-wrap gap-2", className)} aria-label="Veteran and military benefits">
      {v.veteranOwned && <li className={pill}><Flag aria-hidden className="size-3.5 text-brand-accent" />Veteran-Owned</li>}
      {v.militaryDiscount && <li className={pill}><BadgePercent aria-hidden className="size-3.5 text-brand-accent" />Military Discount</li>}
    </ul>
  );
}
