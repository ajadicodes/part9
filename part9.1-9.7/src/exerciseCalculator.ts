import { every, inRange, sum, without } from "lodash";

interface Input {
  dailyExercises: Array<number>;
  target: number;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ErrorResult {
  error: string;
}

const parseContent = (
  trainingHours: Array<number>,
  targetValue: number
): Input => {
  // ensure that all parameters are provided
  if (!trainingHours || !targetValue) {
    throw new Error("parameters missing");
  }

  // ensure that input values have the right type
  if (
    every(trainingHours, (value: number): boolean => !isNaN(Number(value))) &&
    !isNaN(Number(targetValue))
  ) {
    return {
      dailyExercises: trainingHours.map((value) => Number(value)),
      target: Number(targetValue),
    };
  } else {
    throw new Error("malformatted parameters");
  }
};

const getRating = (totalHours: number, periodLength: number): number => {
  if (totalHours * 60 >= 300 && periodLength >= 7) return 3;
  if (inRange(totalHours * 60, 75, 300) && periodLength >= 7) return 2;
  return 1;
};

const getRatingDescription = (rating: number): string => {
  switch (rating) {
    case 3:
      return "very good";
    case 2:
      return "not too bad but could be better";
    case 1:
      return "this is not good at all. put in more work";
    default:
      throw new Error("Invalid Rating");
  }
};

export const calculateExercises = (
  trainingHours: Array<number>,
  targetValue: number
): Result | ErrorResult => {
  try {
    const { dailyExercises, target } = parseContent(trainingHours, targetValue);
    const periodLength: number = dailyExercises.length;

    // remove zero hours
    const nonZeroTrainingHours: Array<number> = without(dailyExercises, 0);

    const trainingDays: number = nonZeroTrainingHours.length;

    const success: boolean = trainingDays >= target ? true : false;

    const totalTrainingHours: number = sum(dailyExercises);

    const rating: number = getRating(totalTrainingHours, periodLength);

    return {
      periodLength,
      trainingDays,
      success,
      rating,
      average: totalTrainingHours / periodLength,
      target: targetValue,
      ratingDescription: getRatingDescription(rating),
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }

    return {
      error: "Fatal Error",
    };
  }
};
