import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { dealer } from "@/config/dealer";
import { getAllVehicles } from "@/lib/inventory";
import { InventoryBrowser } from "@/components/inventory/inventory-browser";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VeteranBadges } from "@/components/veteran/veteran-badges";

export default async function HomePage() {
  const vehicles = await getAllVehicles();
  return (
    <>
      <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        {/* Subtle flag motif: star field upper-left, faint stripes fading in from the right */}
        <div
          aria-hidden
          className="bg-stars absolute inset-y-0 left-0 -z-10 w-full md:w-1/2"
        />
        <div
          aria-hidden
          className="bg-stripes absolute inset-y-0 right-0 -z-10 w-2/3 [mask-image:linear-gradient(to_left,black,transparent)]"
        />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:py-24 md:grid-cols-[1fr_auto]">
          <div>
            {dealer.hero.eyebrow && (
              <p className="text-sm font-semibold uppercase tracking-[0.2em] opacity-80">
                {dealer.hero.eyebrow}
              </p>
            )}
            <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
              {dealer.hero.heading || dealer.name}
            </h1>
            <p className="mt-4 max-w-xl text-lg opacity-90">
              {dealer.hero.subheading || dealer.tagline}
            </p>
            <VeteranBadges tone="dark" className="mt-6" />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#inventory"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 bg-brand-accent px-5 text-brand-accent-foreground hover:bg-brand-accent/90",
                )}
              >
                Browse inventory
              </Link>
              <a
                href={`tel:${dealer.phone.tel}`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 border-primary-foreground/40 bg-transparent px-5 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground",
                )}
              >
                <Phone aria-hidden /> {dealer.phone.display}
              </a>
            </div>
          </div>
          <Image
            src="/brand/hero-car.webp"
            alt="Illustrated front view of a classic muscle car"
            width={1247}
            height={897}
            priority
            sizes="(min-width: 768px) 18rem, 0px"
            className="mx-auto hidden h-auto w-72 md:block"
          />
        </div>
        <div aria-hidden className="stripe-rule" />
      </section>
      <section
        id="inventory"
        aria-labelledby="inventory-heading"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 py-12"
      >
        <h2
          id="inventory-heading"
          className="mb-6 text-2xl font-bold sm:text-3xl"
        >
          Current inventory
        </h2>
        <InventoryBrowser vehicles={vehicles} />
      </section>
    </>
  );
}
