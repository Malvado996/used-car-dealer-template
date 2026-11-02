/**
 * Inventory feed abstraction.
 *
 * Pages only call the exported functions below (getAllVehicles, getVehicleBySlug).
 * To switch data sources (CSV export, DMS API, etc.), implement another
 * `InventoryProvider` and change `activeProvider`. Nothing else needs to change.
 */
import fs from "node:fs/promises";
import path from "node:path";

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

export interface InventoryProvider {
  list(): Promise<Vehicle[]>;
}

/** Reads data/inventory.json at build/request time. */
export const jsonFileProvider: InventoryProvider = {
  async list() {
    const file = path.join(process.cwd(), "data", "inventory.json");
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as Vehicle[];
  },
};

/*
 * Example for later — a remote JSON/API feed:
 *
 * export const apiProvider: InventoryProvider = {
 *   async list() {
 *     const res = await fetch(process.env.INVENTORY_API_URL!, { next: { revalidate: 3600 } });
 *     const rows = await res.json();
 *     return rows.map(mapFeedRowToVehicle);
 *   },
 * };
 *
 * For CSV, parse the file (e.g. with `papaparse`) and map each row to `Vehicle`.
 */

const activeProvider: InventoryProvider = jsonFileProvider;

export function vehicleTitle(v: Pick<Vehicle, "year" | "make" | "model" | "trim">) {
  return [v.year, v.make, v.model, v.trim].filter(Boolean).join(" ");
}

export function vehicleSlug(v: Vehicle) {
  return `${v.year}-${v.make}-${v.model}-${v.stockNumber}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function getAllVehicles(): Promise<Vehicle[]> {
  const list = await activeProvider.list();
  return list.filter((v) => v.status !== "sold");
}

export async function getVehicleBySlug(slug: string) {
  const list = await getAllVehicles();
  return list.find((v) => vehicleSlug(v) === slug) ?? null;
}

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export const formatMileage = (n: number) => `${new Intl.NumberFormat("en-US").format(n)} mi`;
