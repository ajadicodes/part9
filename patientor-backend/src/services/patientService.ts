import {
  Entry,
  EntryWithoutId,
  NewPatient,
  Patient,
  PublicPatient,
} from "../types";

import patients from "../../data/patients";
import utils from "../utils";
import { v1 as uuid } from "uuid";

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string) => {
  return patients.find((patient) => patient.id === id);
};

const addNewPatient = (entry: NewPatient): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addNewEntry = (
  patientId: Patient["id"],
  entry: EntryWithoutId
): Entry | undefined => {
  // -----------------------------------------
  // add new entry to patient's record
  // -----------------------------------------

  // find patient to be updated
  const patient = patients.find((patient) => patient.id === patientId);

  // update it's entries only if user exists
  if (!patient) return undefined;

  switch (entry.type) {
    case "Hospital":
      const parsedHospitalEntry = utils.parseHospitalEntry(entry);
      const hospitalEntry = {
        ...parsedHospitalEntry,
        id: uuid(),
        type: entry.type,
      };

      patient.entries.push(hospitalEntry);
      return hospitalEntry;
    case "HealthCheck":
      const parsedHealthCheckEntry = utils.parseHealthCheckEntry(entry);
      const healthCheckEntry = {
        ...parsedHealthCheckEntry,
        id: uuid(),
        type: entry.type,
      };

      patient.entries.push(healthCheckEntry);
      return healthCheckEntry;
    case "OccupationalHealthcare":
      const parsedEntry = utils.parseOccupationalHealthcareEntry(entry);
      const occupationalHealthcareEntry = {
        ...parsedEntry,
        id: uuid(),
        type: entry.type,
      };

      patient.entries.push(occupationalHealthcareEntry);
      return occupationalHealthcareEntry;
    default:
      return utils.assertNever(entry);
  }
};

export default {
  getPublicPatients,
  addNewPatient,
  getPatient,
  addNewEntry,
};
