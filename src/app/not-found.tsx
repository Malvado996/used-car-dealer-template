import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-3 text-muted-foreground">That vehicle may have sold or the link is out of date.</p>
      <Link href="/#inventory" className={buttonVariants({ className: "mt-6 h-10 px-4" })}>View inventory</Link>
    </div>
  );
}
