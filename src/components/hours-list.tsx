import { dealer } from "@/config/dealer";

const fmt = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  const d = new Date(2000, 0, 1, h, m);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
};

export function HoursList({ className }: { className?: string }) {
  return (
    <dl className={className}>
      {dealer.hours.map((h) => (
        <div key={h.day} className="flex justify-between gap-4 py-0.5">
          <dt>{h.day}</dt>
          <dd>{h.open && h.close ? `${fmt(h.open)} – ${fmt(h.close)}` : "Closed"}</dd>
        </div>
      ))}
    </dl>
  );
}
