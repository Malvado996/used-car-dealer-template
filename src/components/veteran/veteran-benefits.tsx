import { Check, Star } from "lucide-react";
import { dealer, hasVeteranBenefits } from "@/config/dealer";

/** "Veteran & Military Benefits" section. Hidden unless dealer.veteran has content. */
export function VeteranBenefits() {
  const v = dealer.veteran;
  if (!v || !hasVeteranBenefits()) return null;
  return (
    <section aria-labelledby="vet-heading" className="relative overflow-hidden border-y bg-card">
      <div aria-hidden className="stripe-rule" />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[1fr_1.2fr] md:items-center">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-accent">
            <Star aria-hidden className="size-4 fill-current" /> Thank you for your service
          </p>
          <h2 id="vet-heading" className="mt-2 text-3xl font-bold text-primary sm:text-4xl">Veteran &amp; Military Benefits</h2>
          {v.veteranOwned && <p className="mt-3 text-muted-foreground">{dealer.name} is proudly veteran-owned and operated.</p>}
          {!!v.branchesServed?.length && (
            <p className="mt-2 text-sm text-muted-foreground">
              Our team has served in the {v.branchesServed.join(", ")}.
            </p>
          )}
        </div>
        <div className="rounded-lg border bg-background p-6 shadow-sm">
          {v.militaryDiscount && <p className="text-lg font-semibold text-primary">{v.militaryDiscount}</p>}
          {!!v.perks?.length && (
            <ul className="mt-4 space-y-2">
              {v.perks.map((p) => (
                <li key={p} className="flex gap-2"><Check aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-accent" />{p}</li>
              ))}
            </ul>
          )}
          {v.disclaimer && <p className="mt-4 text-xs text-muted-foreground">{v.disclaimer}</p>}
        </div>
      </div>
    </section>
  );
}
