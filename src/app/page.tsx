import Link from "next/link";
import { Phone } from "lucide-react";
import { dealer } from "@/config/dealer";
import { getAllVehicles } from "@/lib/inventory";
import { InventoryBrowser } from "@/components/inventory/inventory-browser";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function HomePage() {
  const vehicles = await getAllVehicles();
  return (
    <>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">{dealer.name}</h1>
          <p className="mt-4 max-w-xl text-lg opacity-90">{dealer.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#inventory" className={cn(buttonVariants({ size: "lg" }), "h-11 bg-brand-accent px-5 text-brand-accent-foreground hover:bg-brand-accent/90")}>
              Browse inventory
            </Link>
            <a href={`tel:${dealer.phone.tel}`} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 border-primary-foreground/40 bg-transparent px-5 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground")}>
              <Phone aria-hidden /> {dealer.phone.display}
            </a>
          </div>
        </div>
      </section>
      <section id="inventory" aria-labelledby="inventory-heading" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-12">
        <h2 id="inventory-heading" className="mb-6 text-2xl font-bold sm:text-3xl">Current inventory</h2>
        <InventoryBrowser vehicles={vehicles} />
      </section>
    </>
  );
}
