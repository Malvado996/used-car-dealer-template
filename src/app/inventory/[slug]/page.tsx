import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Mail, Phone } from "lucide-react";
import { dealer } from "@/config/dealer";
import { formatMileage, formatPrice, getAllVehicles, getVehicleBySlug, vehicleSlug, vehicleTitle } from "@/lib/inventory";
import { vehicleJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { VehicleGallery } from "@/components/inventory/vehicle-gallery";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getAllVehicles()).map((v) => ({ slug: vehicleSlug(v) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const v = await getVehicleBySlug(slug);
  if (!v) return { title: "Vehicle not found" };
  const title = `${vehicleTitle(v)} – ${formatPrice(v.price)}`;
  const description = `${vehicleTitle(v)} with ${formatMileage(v.mileage)} for ${formatPrice(v.price)} at ${dealer.name} in ${dealer.address.city}, ${dealer.address.region}. Stock #${v.stockNumber}.`;
  return {
    title,
    description,
    alternates: { canonical: `/inventory/${slug}` },
    openGraph: { title, description, images: v.images.slice(0, 1), type: "website" },
  };
}

export default async function VehiclePage({ params }: Props) {
  const { slug } = await params;
  const v = await getVehicleBySlug(slug);
  if (!v) notFound();
  const title = vehicleTitle(v);

  const specs: [string, string | number | undefined][] = [
    ["Year", v.year], ["Make", v.make], ["Model", v.model], ["Trim", v.trim],
    ["Mileage", formatMileage(v.mileage)], ["Body style", v.bodyStyle], ["Exterior", v.exteriorColor],
    ["Interior", v.interiorColor], ["Engine", v.engine], ["Transmission", v.transmission],
    ["Drivetrain", v.drivetrain], ["Fuel", v.fuelType], ["VIN", v.vin], ["Stock #", v.stockNumber],
  ];
  const subject = encodeURIComponent(`Inquiry: ${title} (Stock #${v.stockNumber})`);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
        <Link href="/" className="underline">Home</Link> / <Link href="/#inventory" className="underline">Inventory</Link> / <span aria-current="page">{title}</span>
      </nav>
      <div className="grid gap-8 lg:grid-cols-[3fr_2fr]">
        <VehicleGallery images={v.images} title={title} />
        <div>
          {v.sample && <Badge className="mb-2 bg-brand-accent text-brand-accent-foreground">Sample listing</Badge>}
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="mt-2 text-3xl font-bold text-primary">{formatPrice(v.price)}</p>
          <p className="mt-1 text-muted-foreground">{formatMileage(v.mileage)} · Stock #{v.stockNumber}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a href={`tel:${dealer.phone.tel}`} className={cn(buttonVariants({ size: "lg" }), "h-12 text-base")}>
              <Phone aria-hidden /> Call {dealer.phone.display}
            </a>
            <Link href={`/contact?vehicle=${encodeURIComponent(`${title} (Stock #${v.stockNumber})`)}`} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 text-base")}>
              <Mail aria-hidden /> Contact us
            </Link>
          </div>
          <p className="mt-3 text-sm">
            Or email <a className="underline" href={`mailto:${dealer.email}?subject=${subject}`}>{dealer.email}</a>
          </p>
          <section aria-labelledby="specs" className="mt-8">
            <h2 id="specs" className="text-xl font-semibold">Specifications</h2>
            <dl className="mt-3 divide-y rounded-lg border text-sm">
              {specs.filter(([, val]) => val !== undefined && val !== "").map(([k, val]) => (
                <div key={k} className="grid grid-cols-2 gap-2 px-3 py-2">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="break-all font-medium">{val}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>
      <section aria-labelledby="desc" className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 id="desc" className="text-xl font-semibold">Description</h2>
          <p className="mt-3 leading-relaxed">{v.description}</p>
        </div>
        {v.features.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold">Features</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {v.features.map((f) => (
                <li key={f} className="flex items-center gap-2"><Check className="size-4 text-primary" aria-hidden /> {f}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
      <JsonLd data={vehicleJsonLd(v)} />
    </div>
  );
}
