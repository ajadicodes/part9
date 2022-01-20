import { Diagnose } from "../types";
import diagnoseData from "../../data/diagnoses";

const getDiagnoses = (): Diagnose[] => {
  return diagnoseData;
};

export default {
  getDiagnoses,
};
