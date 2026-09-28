"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { formatCompactCurrency } from "@/lib/format";

export function EmiChart({
  principal,
  interest,
}: {
  principal: number;
  interest: number;
}) {
  const data = [
    { name: "Principal", value: principal, color: "#0d6b53" },
    { name: "Interest", value: interest, color: "#a9762f" },
  ];

  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={58}
            outerRadius={82}
            paddingAngle={2}
            strokeWidth={0}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [formatCompactCurrency(Number(value)), String(name)]}
            contentStyle={{ borderRadius: 8, border: "1px solid #e2e6e2", fontSize: 13 }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-1 flex items-center justify-center gap-5 text-xs text-ink-soft">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-brand" /> Principal
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-gold" /> Interest
        </span>
      </div>
    </div>
  );
}
