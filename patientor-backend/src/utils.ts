import {
  BaseEntryWithoutId,
  Diagnose,
  Discharge,
  EntryWithoutId,
  Fields,
  Gender,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  NewPatient,
  OccupationalHealthcareEntry,
  SickLeave,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name))
    throw new Error("Incorrect or missing name: " + name);

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date))
    throw new Error("Incorrect or missing date: " + date);

  return date;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn))
    throw new Error("Incorrect or missing SSN: " + ssn);

  return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender))
    throw new Error("Incorrect or missing gender: " + gender);

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation))
    throw new Error("Incorrect or missing occupation: " + occupation);

  return occupation;
};

const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: [],
  };

  return newPatient;
};

const parseDescription = (description: unknown) => {
  if (!description) throw new Error("Missing description");

  if (!isString(description))
    throw new Error(
      `Expected description to be of type "string" but got ${typeof description}"`
    );

  return description;
};

const parseSpecialist = (specialist: unknown) => {
  if (!specialist) throw new Error("Missing specialist");

  if (!isString(specialist))
    throw new Error(
      `Expected description to be of type "string" but got ${typeof specialist}"`
    );

  return specialist;
};

// PROOFING REQUEST
// parse each field and make sure that the return
// value is exactly of type EntryInput
interface EntryInputFields {
  type: unknown;
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: unknown;
}

const parseDiagnosisCodes = (
  diagnoses: unknown
): Array<Diagnose["code"]> | undefined => {
  if (!diagnoses) return undefined;

  // ensure every element is a diagnose
  if (!Array.isArray(diagnoses) || !diagnoses.every(isString))
    throw new Error("Diagnosis Codes contains incorrect data");

  // return the code for diagnose
  return diagnoses;
};

const parseBaseEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
}: EntryInputFields): BaseEntryWithoutId => {
  return {
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown) => {
  if (!rating) throw new Error("Missing health check rating");

  if (!isHealthCheckRating(rating))
    throw new Error(`Incorrect health care rating: ${rating}`);

  return rating;
};

const parseDischargeDate = (date: unknown) => {
  if (!date) throw new Error("Missing discharge date");

  if (!isString(date) || !isDate(date))
    throw new Error(`Incorrect discharge date: ${date}.`);

  return date;
};

const parseDischargeCriteria = (criteria: unknown) => {
  if (!criteria) throw new Error("Missing discharge criteria");

  if (!isString(criteria))
    throw new Error(`Incorrect discharge criteria: ${criteria}.`);

  return criteria;
};

interface HealthCheckEntryFields extends EntryInputFields {
  healthCheckRating: unknown;
}
const parseHealthCheckEntry = ({
  type,
  description,
  date,
  specialist,
  diagnosisCodes,
  healthCheckRating,
}: HealthCheckEntryFields): Omit<HealthCheckEntry, "id"> => {
  const basicEntryInput = parseBaseEntry({
    description,
    date,
    specialist,
    diagnosisCodes,
    type,
  });

  return {
    ...basicEntryInput,
    type: "HealthCheck",
    healthCheckRating: parseHealthCheckRating(healthCheckRating),
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (discharge: any): discharge is Discharge => {
  return discharge.date !== undefined && discharge.criteria !== undefined;
};

interface HospitalEntryFields extends EntryInputFields {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  discharge: any;
}

const parseHospitalEntry = ({
  type,
  description,
  date,
  specialist,
  diagnosisCodes,
  discharge,
}: HospitalEntryFields): Omit<HospitalEntry, "id"> => {
  const basicEntryInput = parseBaseEntry({
    type,
    description,
    date,
    specialist,
    diagnosisCodes,
  });

  if (!discharge || !isDischarge(discharge))
    throw new Error("Missing discharge information");

  return {
    ...basicEntryInput,
    type: "Hospital",
    discharge: {
      date: parseDischargeDate(discharge.date),
      criteria: parseDischargeCriteria(discharge.criteria),
    },
  };
};

const parseEmployeeName = (name: unknown): string => {
  if (!name) throw new Error("Missing employee name");

  if (!isString(name)) throw new Error(`Incorrect employee name: ${name}`);

  return name;
};

const parseSickLeaveStartDate = (date: unknown) => {
  if (!date) throw new Error("Missing sick leave start date");

  if (!isString(date) || !isDate(date))
    throw new Error(`Incorrect sick leave start date: ${date}`);

  return date;
};

const parseSickLeaveEndDate = (date: unknown) => {
  if (!date) throw new Error("Missing sick leave end date");

  if (!isString(date) || !isDate(date))
    throw new Error(`Incorrect sick leave end date: ${date}`);

  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (sickLeave: any): sickLeave is SickLeave => {
  return sickLeave.startDate !== undefined && sickLeave.endDate !== undefined;
};

const parseSickLeave = ({ sickLeave }: { sickLeave: unknown }) => {
  if (!sickLeave) return undefined;

  if (!isSickLeave(sickLeave))
    throw new Error("Incorrect or missing sick leave.");

  return sickLeave;
};

interface OccupationalHealthcareEntryFields extends EntryInputFields {
  sickLeave?: unknown;
  employerName: unknown;
}
const parseOccupationalHealthcareEntry = ({
  type,
  description,
  date,
  specialist,
  diagnosisCodes,
  sickLeave,
  employerName,
}: OccupationalHealthcareEntryFields): Omit<
  OccupationalHealthcareEntry,
  "id"
> => {
  const baseEntry = parseBaseEntry({
    type,
    description,
    date,
    specialist,
    diagnosisCodes,
  });

  const parsedSickLeave = parseSickLeave({ sickLeave });

  if (parsedSickLeave) {
    return {
      ...baseEntry,
      type: "OccupationalHealthcare",
      employerName: parseEmployeeName(employerName),
      sickLeave: {
        startDate: parseSickLeaveStartDate(parsedSickLeave.startDate),
        endDate: parseSickLeaveEndDate(parsedSickLeave.endDate),
      },
    };
  }

  return {
    ...baseEntry,
    type: "OccupationalHealthcare",
    employerName: parseEmployeeName(employerName),
  };
};

interface EntryFields {
  type: unknown;
  date: unknown;
  description: unknown;
  diagnosisCodes: unknown;
  discharge: unknown;
  specialist: unknown;
  healthCheckRating: unknown;
  employerName: unknown;
  sickLeave: unknown;
}
const toEntryWithoutId = ({
  type,
  date,
  description,
  diagnosisCodes,
  specialist,
  discharge,
  healthCheckRating,
  employerName,
  sickLeave,
}: EntryFields): EntryWithoutId => {
  if (!type) throw new Error("Missing entry type.");

  if (type === "Hospital")
    return parseHospitalEntry({
      type,
      date,
      description,
      diagnosisCodes,
      discharge,
      specialist,
    });

  if (type === "HealthCheck")
    return parseHealthCheckEntry({
      type,
      date,
      description,
      diagnosisCodes,
      specialist,
      healthCheckRating,
    });
  if (type === "OccupationalHealthcare")
    return parseOccupationalHealthcareEntry({
      type,
      date,
      description,
      diagnosisCodes,
      specialist,
      employerName,
      sickLeave,
    });

  throw new Error(`Incorrect entry type: ${type}`);
};

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default {
  toNewPatient,
  assertNever,
  parseBaseEntry,
  parseHospitalEntry,
  parseHealthCheckEntry,
  parseOccupationalHealthcareEntry,
  toEntryWithoutId,
};
