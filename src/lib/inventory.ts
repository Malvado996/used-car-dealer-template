/**
import "server-only";
 * Inventory feed abstraction.
 *
 * Pages only call the exported functions below (getAllVehicles, getVehicleBySlug).
 * To switch data sources (CSV export, DMS API, etc.), implement another
 * `InventoryProvider` and change `activeProvider`. Nothing else needs to change.
 */
import fs from "node:fs/promises";
import path from "node:path";
import type { Vehicle } from "@/lib/vehicle";

export * from "@/lib/vehicle";
import { vehicleSlug } from "@/lib/vehicle";

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

export async function getAllVehicles(): Promise<Vehicle[]> {
  const list = await activeProvider.list();
  return list.filter((v) => v.status !== "sold");
}

export async function getVehicleBySlug(slug: string) {
  const list = await getAllVehicles();
  return list.find((v) => vehicleSlug(v) === slug) ?? null;
}
