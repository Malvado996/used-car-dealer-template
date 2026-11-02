/** Client-safe vehicle types and helpers (no Node APIs). */

export type Vehicle = {
  id: string;
  /** true for template demo data; shown with a "Sample" badge */
  sample?: boolean;
  stockNumber: string;
  vin: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
  price: number;
  mileage: number;
  bodyStyle?: string;
  exteriorColor?: string;
  interiorColor?: string;
  transmission?: string;
  drivetrain?: string;
  fuelType?: string;
  engine?: string;
  condition?: "Used" | "Certified" | "New";
  status?: "available" | "pending" | "sold";
  images: string[];
  features: string[];
  description: string;
};

export function vehicleTitle(v: Pick<Vehicle, "year" | "make" | "model" | "trim">) {
  return [v.year, v.make, v.model, v.trim].filter(Boolean).join(" ");
}

export function vehicleSlug(v: Vehicle) {
  return `${v.year}-${v.make}-${v.model}-${v.stockNumber}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export const formatMileage = (n: number) => `${new Intl.NumberFormat("en-US").format(n)} mi`;
