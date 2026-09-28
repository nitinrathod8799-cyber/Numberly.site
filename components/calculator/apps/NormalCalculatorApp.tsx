"use client";

import { useEffect, useState } from "react";
import { Delete } from "lucide-react";
import { evaluateExpression, CalculatorError } from "@/lib/calculators/normal";

const KEYS: { label: string; type: "digit" | "op" | "action"; value: string }[] = [
  { label: "AC", type: "action", value: "clear" },
  { label: "( )", type: "action", value: "parens" },
  { label: "%", type: "op", value: "%" },
  { label: "÷", type: "op", value: "/" },

  { label: "7", type: "digit", value: "7" },
  { label: "8", type: "digit", value: "8" },
  { label: "9", type: "digit", value: "9" },
  { label: "×", type: "op", value: "*" },

  { label: "4", type: "digit", value: "4" },
  { label: "5", type: "digit", value: "5" },
  { label: "6", type: "digit", value: "6" },
  { label: "−", type: "op", value: "-" },

  { label: "1", type: "digit", value: "1" },
  { label: "2", type: "digit", value: "2" },
  { label: "3", type: "digit", value: "3" },
  { label: "+", type: "op", value: "+" },

  { label: "0", type: "digit", value: "0" },
  { label: ".", type: "digit", value: "." },
  { label: "DEL", type: "action", value: "delete" },
  { label: "=", type: "action", value: "equals" },
];

interface HistoryEntry {
  expression: string;
  result: string;
}

const HISTORY_KEY = "numberly:normal-calc-history";

export function NormalCalculatorApp() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openParens, setOpenParens] = useState(0);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(HISTORY_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from localStorage on mount
      if (raw) setHistory(JSON.parse(raw));
    } catch {
      // ignore corrupt/local-storage-unavailable state
    }
  }, []);

  function persistHistory(next: HistoryEntry[]) {
    setHistory(next);
    try {
      window.localStorage.setItem(HISTORY_KEY, JSON.stringify(next.slice(0, 20)));
    } catch {
      // best-effort only
    }
  }

  function append(value: string) {
    setError(null);
    setExpression((prev) => prev + value);
  }

  function handleAction(key: (typeof KEYS)[number]) {
    if (key.type === "digit" || key.type === "op") {
      append(key.value);
      return;
    }

    switch (key.value) {
      case "clear":
        setExpression("");
        setResult(null);
        setError(null);
        setOpenParens(0);
        break;
      case "delete":
        setExpression((prev) => prev.slice(0, -1));
        setError(null);
        break;
      case "parens":
        if (openParens > 0 && /[0-9)]$/.test(expression)) {
          append(")");
          setOpenParens((n) => n - 1);
        } else {
          append("(");
          setOpenParens((n) => n + 1);
        }
        break;
      case "equals":
        evaluate();
        break;
    }
  }

  function evaluate() {
    if (!expression.trim()) return;
    try {
      const value = evaluateExpression(expression);
      const formatted = formatResult(value);
      setResult(formatted);
      setError(null);
      persistHistory([{ expression, result: formatted }, ...history]);
    } catch (err) {
      setResult(null);
      setError(err instanceof CalculatorError ? err.message : "Invalid expression.");
    }
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key >= "0" && e.key <= "9") return append(e.key);
      if (["+", "-", "*", "/", "%", "(", ")", "."].includes(e.key)) return append(e.key);
      if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        return evaluate();
      }
      if (e.key === "Backspace") return setExpression((prev) => prev.slice(0, -1));
      if (e.key === "Escape") {
        setExpression("");
        setResult(null);
        setError(null);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expression, history]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,380px)_1fr]">
      <div className="mx-auto w-full max-w-sm rounded-xl border border-line bg-surface p-4 shadow-sm shadow-black/5">
        <div
          className="min-h-24 rounded-lg bg-ink px-4 py-3 text-right"
          role="status"
          aria-live="polite"
        >
          <p className="min-h-5 truncate text-sm text-white/50">{expression || " "}</p>
          <p className="mt-1 truncate text-3xl font-semibold tabular-nums text-white">
            {error ? "Error" : result ?? (expression ? "" : "0")}
          </p>
          {error && <p className="mt-1 text-xs font-medium text-red-300">{error}</p>}
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {KEYS.map((key) => (
            <button
              key={key.label}
              type="button"
              onClick={() => handleAction(key)}
              aria-label={
                key.value === "delete" ? "Delete last character" : key.value === "clear" ? "Clear all" : key.label
              }
              className={`flex h-13 items-center justify-center rounded-lg text-lg font-medium transition-colors active:scale-[0.97] ${
                key.type === "digit"
                  ? "bg-paper text-ink hover:bg-line"
                  : key.type === "op"
                    ? "bg-brand-soft text-brand-dark hover:bg-brand/15"
                    : key.value === "equals"
                      ? "bg-brand text-white hover:bg-brand-dark"
                      : "bg-paper text-ink-soft hover:bg-line"
              }`}
            >
              {key.value === "delete" ? <Delete className="h-5 w-5" aria-hidden /> : key.label}
            </button>
          ))}
        </div>

        <p className="mt-3 text-center text-xs text-ink-faint">
          Keyboard supported: digits, + − × ÷, Enter, Backspace, Esc
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink">History</h2>
          {history.length > 0 && (
            <button
              type="button"
              onClick={() => persistHistory([])}
              className="text-xs font-medium text-ink-soft hover:text-danger"
            >
              Clear history
            </button>
          )}
        </div>
        <div className="mt-2 rounded-lg border border-line bg-surface">
          {history.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-ink-faint">
              Your recent calculations will appear here. History stays only in this browser.
            </p>
          ) : (
            <ul className="max-h-96 divide-y divide-line overflow-y-auto">
              {history.map((entry, i) => (
                <li key={i} className="px-4 py-2.5">
                  <button
                    type="button"
                    className="w-full text-left"
                    onClick={() => {
                      setExpression(entry.expression);
                      setResult(entry.result);
                    }}
                  >
                    <p className="truncate text-xs text-ink-faint">{entry.expression}</p>
                    <p className="tabular-nums font-medium text-ink">= {entry.result}</p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function formatResult(value: number): string {
  if (Number.isInteger(value)) return value.toString();
  return Number(value.toFixed(10)).toString();
}
