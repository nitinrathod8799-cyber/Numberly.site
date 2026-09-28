const FT_PER_M = 3.28084;
const DRY_VOLUME_FACTOR = 1.54; // accounts for bulking of sand and wastage during mixing
const CEMENT_DENSITY_KG_PER_M3 = 1440;
const CEMENT_BAG_KG = 50;

export type MixGrade = "M15" | "M20" | "M25";

/** cement : sand : aggregate */
export const MIX_RATIOS: Record<MixGrade, [number, number, number]> = {
  M15: [1, 2, 4],
  M20: [1, 1.5, 3],
  M25: [1, 1, 2],
};

export interface ConcreteInput {
  /** All dimensions in feet. */
  lengthFt: number;
  widthFt: number;
  depthFt: number;
  grade: MixGrade;
}

export interface ConcreteResult {
  wetVolumeCft: number;
  wetVolumeCum: number;
  dryVolumeCum: number;
  cementBags: number;
  sandCum: number;
  aggregateCum: number;
}

export function calculateConcrete(input: ConcreteInput): ConcreteResult {
  const { lengthFt, widthFt, depthFt, grade } = input;
  if (lengthFt <= 0 || widthFt <= 0 || depthFt <= 0) {
    throw new Error("All dimensions must be greater than zero.");
  }

  const wetVolumeCft = lengthFt * widthFt * depthFt;
  const wetVolumeCum = wetVolumeCft / Math.pow(FT_PER_M, 3);
  const dryVolumeCum = wetVolumeCum * DRY_VOLUME_FACTOR;

  const [cementRatio, sandRatio, aggregateRatio] = MIX_RATIOS[grade];
  const sum = cementRatio + sandRatio + aggregateRatio;

  const cementVolumeCum = (dryVolumeCum * cementRatio) / sum;
  const sandCum = (dryVolumeCum * sandRatio) / sum;
  const aggregateCum = (dryVolumeCum * aggregateRatio) / sum;

  const cementWeightKg = cementVolumeCum * CEMENT_DENSITY_KG_PER_M3;
  const cementBags = cementWeightKg / CEMENT_BAG_KG;

  return {
    wetVolumeCft: round2(wetVolumeCft),
    wetVolumeCum: round3(wetVolumeCum),
    dryVolumeCum: round3(dryVolumeCum),
    cementBags: round2(cementBags),
    sandCum: round3(sandCum),
    aggregateCum: round3(aggregateCum),
  };
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}
function round3(value: number): number {
  return Math.round(value * 1000) / 1000;
}
