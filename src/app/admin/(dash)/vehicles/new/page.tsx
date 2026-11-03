import { ComingSoon } from "@/components/admin/coming-soon";
import { requireAdmin } from "@/lib/admin-auth";

export default async function NewVehiclePage() {
  await requireAdmin();
  return <ComingSoon title="Add vehicle" description="A form to add a new vehicle to inventory will live here." />;
}
