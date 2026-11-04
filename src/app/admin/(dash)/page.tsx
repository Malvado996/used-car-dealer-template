import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { requireAdmin } from "@/lib/admin-auth";
import { formatMileage, formatPrice, getAllVehiclesForAdmin, vehicleSlug, vehicleTitle } from "@/lib/inventory";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

function Thumb({ src, alt }: { src?: string; alt: string }) {
  return (
    <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded bg-muted">
      {src && <Image src={src} alt={alt} fill sizes="64px" className="object-cover" />}
    </div>
  );
}

function Status({ s }: { s?: string }) {
  const status = s ?? "available";
  return <Badge variant={status === "sold" ? "secondary" : status === "pending" ? "outline" : "default"} className="capitalize">{status}</Badge>;
}

function Actions({ slug }: { slug: string }) {
  return (
    <div className="flex gap-2">
      <Link href={`/admin/vehicles/${slug}/edit`} className={buttonVariants({ variant: "outline", size: "sm" })}>Edit</Link>
      <Link href={`/admin/vehicles/${slug}/photos`} className={buttonVariants({ variant: "outline", size: "sm" })}>Upload photos</Link>
    </div>
  );
}

export default async function AdminDashboard() {
  await requireAdmin();
  const vehicles = await getAllVehiclesForAdmin();
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl">Inventory</h1>
          <p className="text-sm text-muted-foreground">{vehicles.length} vehicles (including sold)</p>
        </div>
        <Link href="/admin/vehicles/new" className={cn(buttonVariants(), "h-10 px-4")}>
          <Plus className="size-4" /> Add vehicle
        </Link>
      </div>

      {/* Mobile: cards */}
      <ul className="grid gap-3 md:hidden">
        {vehicles.map((v) => {
          const slug = vehicleSlug(v);
          return (
            <li key={v.id} className="rounded-lg border bg-background p-3">
              <div className="flex gap-3">
                <Thumb src={v.images[0]} alt={vehicleTitle(v)} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{vehicleTitle(v)}</p>
                  <p className="text-sm text-muted-foreground">{formatPrice(v.price)} · {formatMileage(v.mileage)}</p>
                </div>
                <Status s={v.status} />
              </div>
              <div className="mt-3"><Actions slug={slug} /></div>
            </li>
          );
        })}
      </ul>

      {/* Desktop: table */}
      <div className="hidden overflow-x-auto rounded-lg border bg-background md:block">
        <table className="w-full text-sm">
          <thead className="border-b text-left text-muted-foreground">
            <tr>
              <th className="p-3 font-medium">Photo</th>
              <th className="p-3 font-medium">Vehicle</th>
              <th className="p-3 font-medium">Price</th>
              <th className="p-3 font-medium">Mileage</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => (
              <tr key={v.id} className="border-b last:border-0">
                <td className="p-3"><Thumb src={v.images[0]} alt={vehicleTitle(v)} /></td>
                <td className="p-3"><p className="font-medium">{vehicleTitle(v)}</p><p className="text-xs text-muted-foreground">#{v.stockNumber}</p></td>
                <td className="p-3">{formatPrice(v.price)}</td>
                <td className="p-3">{formatMileage(v.mileage)}</td>
                <td className="p-3"><Status s={v.status} /></td>
                <td className="p-3"><Actions slug={vehicleSlug(v)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
