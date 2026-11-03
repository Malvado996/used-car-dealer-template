import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { type Vehicle, formatMileage, formatPrice, vehicleSlug, vehicleTitle } from "@/lib/vehicle";

export function VehicleCard({ v }: { v: Vehicle }) {
  const title = vehicleTitle(v);
  return (
    <article className="group overflow-hidden rounded-xl border bg-card shadow-sm transition-[transform,box-shadow] duration-300 ease-out hover:shadow-lg motion-safe:hover:scale-105 motion-safe:focus-within:scale-105 focus-within:ring-2 focus-within:ring-ring">
      <Link href={`/inventory/${vehicleSlug(v)}`} className="block outline-none">
        <div className="relative aspect-[3/2] bg-muted">
          <Image
            src={v.images[0]}
            alt={title}
            fill
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="object-cover"
          />
          {v.sample && <Badge className="absolute left-2 top-2 bg-brand-accent text-brand-accent-foreground">Sample</Badge>}
        </div>
        <div className="space-y-1 p-4">
          <h3 className="font-semibold leading-tight group-hover:text-primary">{title}</h3>
          <p className="text-xl font-bold text-primary">{formatPrice(v.price)}</p>
          <p className="text-sm text-muted-foreground">
            {formatMileage(v.mileage)} · {v.transmission} · {v.drivetrain}
          </p>
          <p className="text-xs text-muted-foreground">Stock #{v.stockNumber}</p>
        </div>
      </Link>
    </article>
  );
}
