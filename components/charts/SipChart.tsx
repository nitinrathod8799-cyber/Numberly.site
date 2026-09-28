"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { formatCompactCurrency } from "@/lib/format";
import type { YearRow } from "@/lib/calculators/sip";

export function SipChart({ data }: { data: YearRow[] }) {
  const chartData = data.map((row) => ({
    year: `Y${row.year}`,
    invested: row.cumulativeInvestment,
    value: row.yearEndValue,
  }));

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="sipValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0d6b53" stopOpacity={0.28} />
              <stop offset="95%" stopColor="#0d6b53" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="sipInvested" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a9762f" stopOpacity={0.22} />
              <stop offset="95%" stopColor="#a9762f" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e6e2" vertical={false} />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 12, fill: "#7c8783" }}
            axisLine={{ stroke: "#e2e6e2" }}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#7c8783" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => formatCompactCurrency(v)}
            width={64}
          />
          <Tooltip
            formatter={(value, name) => [
              formatCompactCurrency(Number(value)),
              name === "value" ? "Estimated value" : "Invested",
            ]}
            labelFormatter={(label) => label}
            contentStyle={{
              borderRadius: 8,
              border: "1px solid #e2e6e2",
              fontSize: 13,
            }}
          />
          <Area
            type="monotone"
            dataKey="invested"
            stroke="#a9762f"
            strokeWidth={2}
            fill="url(#sipInvested)"
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#0d6b53"
            strokeWidth={2.25}
            fill="url(#sipValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="mt-2 flex items-center justify-center gap-5 text-xs text-ink-soft">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-brand" /> Estimated value
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-gold" /> Invested amount
        </span>
      </div>
    </div>
  );
}
