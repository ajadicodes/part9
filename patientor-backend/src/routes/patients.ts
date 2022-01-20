import express from "express";
import patientService from "../services/patientService";
import utils from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPublicPatients());
});

router.post("/", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = utils.toNewPatient(req.body);

    const addedPatient = patientService.addNewPatient(newPatientEntry);

    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get("/:id", (req, res) => {
  const patientId = req.params.id;
  const patient = patientService.getPatient(patientId);
  res.json(patient);
});

router.post("/:id/entries", (req, res) => {
  try {
    const patientId = req.params.id;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry = utils.toEntryWithoutId(req.body);
    const addedEntry = patientService.addNewEntry(patientId, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      console.error(error);
      errorMessage += " Error: " + error.message;
    }

    res.status(400).send(errorMessage);
  }
});

export default router;
