"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function YearlyTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: (string | number)[][];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-line bg-surface">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-ink"
      >
        Show yearly breakdown
        <ChevronDown className={`h-4 w-4 text-ink-soft transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>

      {open && (
        <div className="table-scroll overflow-x-auto border-t border-line">
          <table className="w-full min-w-125 border-collapse text-sm">
            <thead>
              <tr className="bg-paper text-left text-xs font-semibold uppercase tracking-wide text-ink-soft">
                {columns.map((col) => (
                  <th key={col} scope="col" className="px-4 py-2.5">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-2.5 tabular-nums text-ink">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
