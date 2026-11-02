"use client";

import { useMemo, useState } from "react";
import type { Vehicle } from "@/lib/vehicle";
import { formatPrice } from "@/lib/vehicle";
import { VehicleCard } from "./vehicle-card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type SortKey = "price-asc" | "price-desc" | "mileage-asc" | "year-desc";

const PRICE_STEPS = [10000, 15000, 20000, 25000, 30000, 40000];
const MILEAGE_STEPS = [30000, 50000, 75000, 100000];

const selectCls =
  "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

export function InventoryBrowser({ vehicles }: { vehicles: Vehicle[] }) {
  const [make, setMake] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [maxMileage, setMaxMileage] = useState("");
  const [sort, setSort] = useState<SortKey>("price-asc");

  const makes = useMemo(() => [...new Set(vehicles.map((v) => v.make))].sort(), [vehicles]);

  const results = useMemo(() => {
    const list = vehicles.filter(
      (v) =>
        (!make || v.make === make) &&
        (!maxPrice || v.price <= Number(maxPrice)) &&
        (!maxMileage || v.mileage <= Number(maxMileage)),
    );
    const cmp: Record<SortKey, (a: Vehicle, b: Vehicle) => number> = {
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      "mileage-asc": (a, b) => a.mileage - b.mileage,
      "year-desc": (a, b) => b.year - a.year,
    };
    return [...list].sort(cmp[sort]);
  }, [vehicles, make, maxPrice, maxMileage, sort]);

  const reset = () => {
    setMake("");
    setMaxPrice("");
    setMaxMileage("");
    setSort("price-asc");
  };

  return (
    <div>
      <form
        className="grid gap-4 rounded-xl border bg-muted/40 p-4 sm:grid-cols-2 lg:grid-cols-5 lg:items-end"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Filter inventory"
      >
        <div className="space-y-1.5">
          <Label htmlFor="f-make">Make</Label>
          <select id="f-make" className={selectCls} value={make} onChange={(e) => setMake(e.target.value)}>
            <option value="">All makes</option>
            {makes.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="f-price">Max price</Label>
          <select id="f-price" className={selectCls} value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
            <option value="">Any price</option>
            {PRICE_STEPS.map((p) => <option key={p} value={p}>Under {formatPrice(p)}</option>)}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="f-miles">Max mileage</Label>
          <select id="f-miles" className={selectCls} value={maxMileage} onChange={(e) => setMaxMileage(e.target.value)}>
            <option value="">Any mileage</option>
            {MILEAGE_STEPS.map((m) => <option key={m} value={m}>Under {m.toLocaleString("en-US")} mi</option>)}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="f-sort">Sort by</Label>
          <select id="f-sort" className={selectCls} value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="mileage-asc">Mileage: lowest first</option>
            <option value="year-desc">Year: newest first</option>
          </select>
        </div>
        <Button type="button" variant="outline" className="h-10" onClick={reset}>Reset filters</Button>
      </form>

      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
        Showing {results.length} of {vehicles.length} vehicles
      </p>
      {results.length ? (
        <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((v) => <li key={v.id}><VehicleCard v={v} /></li>)}
        </ul>
      ) : (
        <p className="mt-8 text-center">No vehicles match those filters. <button className="underline" onClick={reset}>Reset filters</button></p>
      )}
    </div>
  );
}
