// A safe arithmetic expression evaluator for the basic calculator.
// Deliberately avoids eval()/Function(): expressions are tokenized and
// parsed with a small recursive-descent parser, then evaluated.
//
// Supported: + - * / % (percent), decimals, unary minus, parentheses.

export class CalculatorError extends Error {}

type Token =
  | { type: "number"; value: number }
  | { type: "op"; value: "+" | "-" | "*" | "/" }
  | { type: "percent" }
  | { type: "lparen" }
  | { type: "rparen" };

function tokenize(expression: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const src = expression.replace(/\s+/g, "");

  while (i < src.length) {
    const ch = src[i];

    if (/[0-9.]/.test(ch)) {
      let num = ch;
      i++;
      while (i < src.length && /[0-9.]/.test(src[i])) {
        num += src[i];
        i++;
      }
      if ((num.match(/\./g) || []).length > 1) {
        throw new CalculatorError("Invalid number format.");
      }
      tokens.push({ type: "number", value: Number(num) });
      continue;
    }

    if ("+-*/".includes(ch)) {
      tokens.push({ type: "op", value: ch as "+" | "-" | "*" | "/" });
      i++;
      continue;
    }

    if (ch === "%") {
      tokens.push({ type: "percent" });
      i++;
      continue;
    }

    if (ch === "(") {
      tokens.push({ type: "lparen" });
      i++;
      continue;
    }

    if (ch === ")") {
      tokens.push({ type: "rparen" });
      i++;
      continue;
    }

    throw new CalculatorError(`Unsupported character: "${ch}"`);
  }

  return tokens;
}

// Recursive-descent parser producing a number.
// expr   := term (('+' | '-') term)*
// term   := unary (('*' | '/') unary)*
// unary  := '-' unary | postfix
// postfix:= primary '%'?
// primary:= number | '(' expr ')'
class Parser {
  private tokens: Token[];
  private pos = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  private peek(): Token | undefined {
    return this.tokens[this.pos];
  }

  private consume(): Token {
    const t = this.tokens[this.pos];
    if (!t) throw new CalculatorError("Unexpected end of expression.");
    this.pos++;
    return t;
  }

  parse(): number {
    if (this.tokens.length === 0) throw new CalculatorError("Empty expression.");
    const value = this.expr();
    if (this.pos !== this.tokens.length) {
      throw new CalculatorError("Invalid expression.");
    }
    return value;
  }

  private expr(): number {
    let value = this.term();
    while (this.peek()?.type === "op" && (this.peek() as { value: string }).value !== "*" && (this.peek() as { value: string }).value !== "/") {
      const op = this.consume() as { type: "op"; value: "+" | "-" };
      const rhs = this.term();
      value = op.value === "+" ? value + rhs : value - rhs;
    }
    return value;
  }

  private term(): number {
    let value = this.unary();
    while (this.peek()?.type === "op" && ((this.peek() as { value: string }).value === "*" || (this.peek() as { value: string }).value === "/")) {
      const op = this.consume() as { type: "op"; value: "*" | "/" };
      const rhs = this.unary();
      if (op.value === "/") {
        if (rhs === 0) throw new CalculatorError("Cannot divide by zero.");
        value = value / rhs;
      } else {
        value = value * rhs;
      }
    }
    return value;
  }

  private unary(): number {
    if (this.peek()?.type === "op" && (this.peek() as { value: string }).value === "-") {
      this.consume();
      return -this.unary();
    }
    return this.postfix();
  }

  private postfix(): number {
    let value = this.primary();
    while (this.peek()?.type === "percent") {
      this.consume();
      value = value / 100;
    }
    return value;
  }

  private primary(): number {
    const token = this.consume();
    if (token.type === "number") return token.value;
    if (token.type === "lparen") {
      const value = this.expr();
      const close = this.consume();
      if (close.type !== "rparen") throw new CalculatorError("Missing closing parenthesis.");
      return value;
    }
    throw new CalculatorError("Invalid expression.");
  }
}

export function evaluateExpression(expression: string): number {
  const tokens = tokenize(expression);
  const result = new Parser(tokens).parse();
  if (!Number.isFinite(result)) {
    throw new CalculatorError("Result is too large or undefined.");
  }
  // Guard against absurdly large numbers that would break formatting/UI.
  if (Math.abs(result) > 1e15) {
    throw new CalculatorError("Number is too large.");
  }
  return result;
}
