import { calculateBmi } from "./src/bmiCalculator";
import { calculateExercises } from "./src/exerciseCalculator";
import express from "express";

const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;

  res.send(calculateBmi(Number(height), Number(weight)));
});

app.post("/exercise", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  res.send(calculateExercises(daily_exercises, target));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
