import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/admin/coming-soon";
import { requireAdmin } from "@/lib/admin-auth";
import { getAdminVehicleBySlug, vehicleTitle } from "@/lib/inventory";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  await requireAdmin();
  const v = await getAdminVehicleBySlug((await params).slug);
  if (!v) notFound();
  return <ComingSoon title={`Upload photos: ${vehicleTitle(v)}`} description={`Photo uploads for stock #${v.stockNumber} will live here.`} />;
}
