import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/admin/coming-soon";
import { requireAdmin } from "@/lib/admin-auth";
import { getAdminVehicleBySlug, vehicleTitle } from "@/lib/inventory";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  await requireAdmin();
  const v = await getAdminVehicleBySlug((await params).slug);
  if (!v) notFound();
  return <ComingSoon title={`Edit: ${vehicleTitle(v)}`} description={`Editing details for stock #${v.stockNumber} will live here.`} />;
}
