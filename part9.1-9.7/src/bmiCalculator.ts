import { inRange } from "lodash";

interface Result {
  weight: number;
  height: number;
  bmi: string;
}

interface ErrorResult {
  error: string;
}

export const calculateBmi = (
  height: number,
  weight: number
): Result | ErrorResult => {
  if (!isNaN(height) && !isNaN(weight)) {
    const bmiResult: number = weight / (height / 100) ** 2;

    let bmi = "";

    if (bmiResult < 16.0) bmi = "Underweight (Severe thinness)";
    if (inRange(bmiResult, 16.0, 17.0)) bmi = "Underweight (Moderate thinness)";
    if (inRange(bmiResult, 17.0, 18.5)) bmi = "Underweight (Mild thinness";
    if (inRange(bmiResult, 18.5, 25.0)) bmi = "Normal (healthy weight)";
    if (inRange(bmiResult, 25.0, 30.0)) bmi = "Overweight (Pre-obese)";
    if (inRange(bmiResult, 30.0, 35.0)) bmi = "Obese (Class I)";
    if (inRange(bmiResult, 35.0, 39.9)) bmi = "Obese (Class II)";
    if (bmiResult >= 40) bmi = "Obese (Class III)";

    return {
      height,
      weight,
      bmi,
    };
  } else {
    return {
      error: "malformatted parameters",
    };
  }
};
