import Link from "next/link";
import { dealer } from "@/config/dealer";
import { requireAdmin } from "@/lib/admin-auth";
import { logout } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();
  return (
    <>
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link href="/admin" className="font-heading text-lg">
            {dealer.name} <span className="text-muted-foreground">· Admin</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">{session.email}</span>
            <Link href="/" className="text-sm underline-offset-4 hover:underline">View site</Link>
            <form action={logout}>
              <Button type="submit" variant="outline" size="sm">Log out</Button>
            </form>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-6">{children}</div>
    </>
  );
}
