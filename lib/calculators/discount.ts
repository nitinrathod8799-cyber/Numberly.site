export interface DiscountInput {
  originalPrice: number;
  discountPercent: number;
  /** Optional second, successive discount applied on top of the first. */
  secondDiscountPercent?: number;
}

export interface DiscountResult {
  originalPrice: number;
  finalPrice: number;
  amountSaved: number;
  effectiveDiscountPercent: number;
  /** Price after only the first discount, useful when a second discount is applied. */
  priceAfterFirstDiscount: number;
}

export function calculateDiscount(input: DiscountInput): DiscountResult {
  const { originalPrice, discountPercent } = input;
  const secondDiscountPercent = input.secondDiscountPercent ?? 0;

  if (originalPrice < 0) throw new Error("Original price cannot be negative.");
  if (discountPercent < 0 || discountPercent > 100) throw new Error("Discount must be between 0 and 100%.");
  if (secondDiscountPercent < 0 || secondDiscountPercent > 100) {
    throw new Error("Second discount must be between 0 and 100%.");
  }

  const priceAfterFirstDiscount = originalPrice * (1 - discountPercent / 100);
  const finalPrice = priceAfterFirstDiscount * (1 - secondDiscountPercent / 100);
  const amountSaved = originalPrice - finalPrice;
  const effectiveDiscountPercent = originalPrice === 0 ? 0 : (amountSaved / originalPrice) * 100;

  return {
    originalPrice: round2(originalPrice),
    finalPrice: round2(finalPrice),
    amountSaved: round2(amountSaved),
    effectiveDiscountPercent: round2(effectiveDiscountPercent),
    priceAfterFirstDiscount: round2(priceAfterFirstDiscount),
  };
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}
