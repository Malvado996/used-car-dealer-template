"use client";

import { usePathname } from "next/navigation";

/** Hides public header/footer on /admin routes. */
export function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}
