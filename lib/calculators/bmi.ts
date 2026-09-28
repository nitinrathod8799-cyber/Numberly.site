export type BmiUnits = "metric" | "imperial";
export type BmiCategory = "Underweight" | "Normal weight" | "Overweight" | "Obese";

export interface BmiInput {
  units: BmiUnits;
  /** cm for metric, total inches for imperial */
  height: number;
  /** kg for metric, lb for imperial */
  weight: number;
}

export interface BmiResult {
  bmi: number;
  category: BmiCategory;
  /** Healthy weight range for this height, in the same unit as the input weight. */
  healthyWeightRange: { min: number; max: number };
}

export function categoryForBmi(bmi: number): BmiCategory {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

export function calculateBmi(input: BmiInput): BmiResult {
  const { units, height, weight } = input;
  if (height <= 0) throw new Error("Height must be greater than zero.");
  if (weight <= 0) throw new Error("Weight must be greater than zero.");

  let bmi: number;
  let healthyMin: number;
  let healthyMax: number;

  if (units === "metric") {
    const heightM = height / 100;
    bmi = weight / (heightM * heightM);
    healthyMin = 18.5 * heightM * heightM;
    healthyMax = 24.9 * heightM * heightM;
  } else {
    bmi = (703 * weight) / (height * height);
    healthyMin = (18.5 * height * height) / 703;
    healthyMax = (24.9 * height * height) / 703;
  }

  return {
    bmi: round1(bmi),
    category: categoryForBmi(bmi),
    healthyWeightRange: { min: round1(healthyMin), max: round1(healthyMax) },
  };
}

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}
