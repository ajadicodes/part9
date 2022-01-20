import {
  EntryFormValues,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../../types";
import { Formik, FormikErrors } from "formik";

import AddHealthCheckEntryForm from "./AddHealthCheckEntryForm";
import AddHospitalEntryForm from "./AddHospitalEntryForm";
import AddOccupationalHealthCareEntryForm from "./AddOccupationalHealthCareEntryForm";
import { EntryOption } from "../FormField";
import React from "react";
import { useStateValue } from "../../state";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryOptions: EntryOption[] = [
  { value: "Hospital", label: "Hospital" },
  { value: "HealthCheck", label: "Health Check" },
  { value: "OccupationalHealthcare", label: "Occupational Health Care" },
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      enableReinitialize
      initialValues={{
        type: "Hospital",
        date: "",
        description: "",
        specialist: "",
        diagnosisCodes: [],

        discharge: {
          date: "",
          criteria: "",
        },

        healthCheckRating: 0,

        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: "",
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: FormikErrors<EntryFormValues> = {};

        const getBaseErrors = (values: EntryFormValues) => {
          if (values.date.length === 0) {
            errors.date = requiredError;
          }
          if (values.description.length === 0) {
            errors.description = requiredError;
          }
          if (values.specialist.length === 0) {
            errors.specialist = requiredError;
          }

          return errors;
        };

        if (values.type === "Hospital") {
          const errors: FormikErrors<HospitalEntry> = {};
          const baseErrors = getBaseErrors(values);

          if (!values.discharge.date) {
            // errors.discharge.date = requiredError;
            errors.discharge = {
              date: requiredError,
            };
          }
          if (!values.discharge.criteria) {
            errors.discharge = {
              criteria: requiredError,
            };
          }
          return {
            ...baseErrors,
            ...errors,
          };
        }

        if (values.type === "HealthCheck") {
          // const errors: FormikErrors<HealthCheckEntry> = {};
          const baseErrors = getBaseErrors(values);

          return {
            ...baseErrors,
          };
        }

        if (values.type === "OccupationalHealthcare") {
          const errors: FormikErrors<OccupationalHealthcareEntry> = {};
          const baseErrors = getBaseErrors(values);
          if (values.employerName.length === 0) {
            errors.employerName = requiredError;
          }
          return {
            ...baseErrors,
            ...errors,
          };
        }
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        switch (values.type) {
          case "Hospital":
            return (
              <AddHospitalEntryForm
                entryOptions={entryOptions}
                diagnoses={diagnoses}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                onCancel={onCancel}
                dirty={dirty}
                isValid={isValid}
              />
            );

          case "HealthCheck":
            return (
              <AddHealthCheckEntryForm
                entryOptions={entryOptions}
                diagnoses={diagnoses}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                onCancel={onCancel}
                dirty={dirty}
                isValid={isValid}
              />
            );

          case "OccupationalHealthcare":
            return (
              <AddOccupationalHealthCareEntryForm
                entryOptions={entryOptions}
                diagnoses={diagnoses}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                onCancel={onCancel}
                dirty={dirty}
                isValid={isValid}
              />
            );
          default:
            throw new Error("Should not even get here");
        }
      }}
    </Formik>
  );
};

export default AddEntryForm;
