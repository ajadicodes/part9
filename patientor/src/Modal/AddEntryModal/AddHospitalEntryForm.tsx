import { Button, Grid } from "semantic-ui-react";
import {
  DiagnosisSelection,
  EntryOption,
  EntrySelectField,
  TextField,
} from "../FormField";
import { Field, Form, FormikProps } from "formik";

import { Diagnosis } from "../../types";
import React from "react";

interface Props {
  entryOptions: EntryOption[];
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
  onCancel: () => void;
  dirty: boolean;
  isValid: boolean;
}

const AddHospitalEntryForm = ({
  entryOptions,
  diagnoses,
  setFieldValue,
  setFieldTouched,
  onCancel,
  dirty,
  isValid,
}: Props) => {
  return (
    <Form className="form ui">
      <EntrySelectField
        label="Type of Entry"
        name="type"
        options={entryOptions}
      />
      <Field
        label="Description"
        placeholder="Entry Description"
        name="description"
        component={TextField}
      />
      <Field
        label="Date of Entry"
        placeholder="YYYY-MM-DD"
        name="date"
        component={TextField}
      />
      <Field
        label="Specialist"
        placeholder="Specialist"
        name="specialist"
        component={TextField}
      />
      <DiagnosisSelection
        diagnoses={diagnoses}
        setFieldValue={setFieldValue}
        setFieldTouched={setFieldTouched}
      />
      <Field
        label="Discharge Criteria"
        placeholder="Criteria"
        name="discharge.criteria"
        component={TextField}
      />
      <Field
        label="Discharge Date"
        placeholder="YYYY-MM-DD"
        name="discharge.date"
        component={TextField}
      />

      <Grid>
        <Grid.Column floated="left" width={5}>
          <Button type="button" onClick={onCancel} color="red">
            Cancel
          </Button>
        </Grid.Column>
        <Grid.Column floated="right" width={5}>
          <Button
            type="submit"
            floated="right"
            color="green"
            disabled={!dirty || !isValid}
          >
            Add
          </Button>
        </Grid.Column>
      </Grid>
    </Form>
  );
};

export default AddHospitalEntryForm;
