import { Button, Icon } from "semantic-ui-react";
import { Diagnosis, Entry, Patient } from "../types";
import React, { useEffect, useState } from "react";
import {
  addPatientEntry,
  addPatientInfo,
  setDiagnoses,
  useStateValue,
} from "../state";

import AddEntryModal from "../Modal/AddEntryModal";
import EntryDetails from "../components/EntryDetails";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { useParams } from "react-router-dom";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patientInfo, diagnoses }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const openModal = () => setModalOpen(true);

  const closeModal = () => {
    setModalOpen(false);
    setError(undefined);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitNewEntry = async (values: any) => {
    try {
      // if sick leave dates are empty strings, then they are
      // undefined
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      let formValues = values;

      if (
        values.sickLeave &&
        values.sickLeave.startDate === "" &&
        values.sickLeave.endDate === ""
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        formValues = {
          ...values,
          sickLeave: undefined,
        };
      }

      if (
        values.sickLeave &&
        values.sickLeave.startDate === "" &&
        values.sickLeave.endDate !== ""
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        formValues = {
          ...values,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          sickLeave: {
            ...values.sickLeave,
            startDate: undefined,
          },
        };
      }

      if (
        values.sickLeave &&
        values.sickLeave.startDate !== "" &&
        values.sickLeave.endDate === ""
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        formValues = {
          ...values,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          sickLeave: {
            ...values.sickLeave,
            endDate: undefined,
          },
        };
      }

      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        formValues
      );
      dispatch(addPatientEntry(id, newEntry));
      closeModal();
    } catch (error) {
      console.error(error.response?.data || "Unknown Error");
      setError(error.response?.data || "Unknown error");
    }
  };

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        // only fetch if patient info does not already exist in global state
        if (!patientInfo[id]) {
          const { data } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );

          dispatch(addPatientInfo(data));
        }
      } catch (error) {
        console.error(error);
      }
    };

    void fetchPatientData();
  }, [id]);

  useEffect(() => {
    const fetchDiagnosis = async () => {
      if (diagnoses.length === 0) {
        try {
          const { data } = await axios.get<Diagnosis[]>(
            `${apiBaseUrl}/diagnoses`
          );
          dispatch(setDiagnoses(data));
        } catch (error) {
          console.error(error);
        }
      }
    };

    void fetchDiagnosis();
  }, []);
  return (
    <div className="App">
      <div>
        {patientInfo[id] && (
          <div>
            <h2>
              {patientInfo[id].name}{" "}
              <span>
                {patientInfo[id].gender === "male" && <Icon name="mars" />}
                {patientInfo[id].gender === "female" && <Icon name="female" />}
                {patientInfo[id].gender === "other" && (
                  <Icon name="genderless" />
                )}
              </span>
            </h2>
          </div>
        )}
        {patientInfo[id] && <p>SSN: {patientInfo[id].ssn}</p>}
        {patientInfo[id] && <p>{patientInfo[id].occupation}</p>}

        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />

        <Button onClick={() => openModal()}>Add New Entry</Button>
      </div>

      {patientInfo[id] &&
        patientInfo[id].entries &&
        patientInfo[id].entries.length > 0 && (
          <div>
            <h2>Entries</h2>
            {patientInfo[id].entries.map((entry) => (
              // <div key={entry.id}>
              //   <p>
              //     {entry.date} {entry.description}
              //   </p>
              //   <ul>
              //     {entry.diagnosisCodes?.map((diagnosisCode) => (
              //       <li key={diagnosisCode}>{diagnosisCode}</li>
              //     ))}
              //   </ul>
              // </div>
              <EntryDetails key={entry.id} entry={entry} />
            ))}
          </div>
        )}
    </div>
  );
};

export default PatientPage;
