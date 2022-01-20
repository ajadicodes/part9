import cors from "cors";
import diagnosesRouter from "./routes/diagnoses";
import express from "express";
import patientRouter from "./routes/patients";

const app = express();
app.use(express.json());

// Add a list of allowed origins.
const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors(options));

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientRouter);
// app.get("/api/patients/:id", );

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
