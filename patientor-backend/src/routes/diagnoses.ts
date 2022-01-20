import diagnoseService from "../services/diagnoseService";
import express from "express";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("diagnoses route is available");
  res.send(diagnoseService.getDiagnoses());
});

export default router;
