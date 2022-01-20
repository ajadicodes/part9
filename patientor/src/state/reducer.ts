import { Diagnosis, Entry, Patient } from "../types";

import { State } from "./state";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT_INFO";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT_ENTRY";
      payload: Entry;
      patientId: string;
    }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "ADD_PATIENT_INFO":
      return {
        ...state,
        patientInfo: {
          // TODO: check for existing payload id
          ...state.patientInfo,
          [action.payload.id]: action.payload,
        },
      };
    case "ADD_PATIENT_ENTRY":
      const patientInfo = state.patientInfo[action.patientId];
      const updatedPatientEntries = patientInfo.entries.concat(action.payload);
      const updatedPatientInfo: Patient = {
        ...patientInfo,
        entries: updatedPatientEntries,
      };

      return {
        ...state,
        patientInfo: {
          ...state.patientInfo,
          [action.patientId]: updatedPatientInfo,
        },
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: action.payload,
      };
    default:
      return state;
  }
};

export const setPatientList = (payload: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", payload };
};

export const setDiagnoses = (payload: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES",
    payload,
  };
};

export const addPatient = (payload: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload,
  };
};

export const addPatientInfo = (payload: Patient): Action => {
  return {
    type: "ADD_PATIENT_INFO",
    payload,
  };
};

export const addPatientEntry = (patientId: string, payload: Entry): Action => {
  return {
    type: "ADD_PATIENT_ENTRY",
    payload,
    patientId,
  };
};
