import { describe, it, expect } from "vitest";
import { evaluateExpression, CalculatorError } from "@/lib/calculators/normal";

describe("evaluateExpression - basic operations", () => {
  it("adds", () => expect(evaluateExpression("25+50")).toBe(75));
  it("subtracts", () => expect(evaluateExpression("100-45")).toBe(55));
  it("multiplies", () => expect(evaluateExpression("100*5")).toBe(500));
  it("divides", () => expect(evaluateExpression("18/4")).toBe(4.5));
  it("handles decimals", () => expect(evaluateExpression("1.5+2.25")).toBe(3.75));
  it("respects operator precedence", () => expect(evaluateExpression("2+3*4")).toBe(14));
  it("handles parentheses", () => expect(evaluateExpression("(2+3)*4")).toBe(20));
  it("handles unary minus", () => expect(evaluateExpression("-5+10")).toBe(5));
  it("handles percent", () => expect(evaluateExpression("50%")).toBe(0.5));
});

describe("evaluateExpression - errors", () => {
  it("throws on division by zero", () => {
    expect(() => evaluateExpression("10/0")).toThrow(CalculatorError);
  });

  it("throws on an empty expression", () => {
    expect(() => evaluateExpression("")).toThrow(CalculatorError);
  });

  it("throws on an invalid expression", () => {
    expect(() => evaluateExpression("5+*3")).toThrow(CalculatorError);
  });

  it("throws on unmatched parentheses", () => {
    expect(() => evaluateExpression("(2+3")).toThrow(CalculatorError);
  });
});
