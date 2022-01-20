import { Modal, Segment } from "semantic-ui-react";

// import AddOccupationalHealthCareEntryForm from "./AddOccupationalHealthCareEntryForm";
// import AddHealthCheckEntryForm from "./AddHealthCheckEntryForm";
import AddEntryForm from "./AddEntryForm";
// import AddHospitalEntryForm from "./AddHospitalEntryForm";
import { EntryFormValues } from "../../types";
import React from "react";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add new patient entry</Modal.Header>
    <Modal.Content>
      {error && (
        <Segment inverted color="red">
          {error}
        </Segment>
      )}
      {/* <AddEntryForm
        onSubmit={onSubmit}
        onCancel={onClose}
      /> */}

      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
      {/* <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} /> */}
      {/* <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} /> */}
      {/* <AddOccupationalHealthCareEntryForm
        onSubmit={onSubmit}
        onCancel={onClose}
      /> */}
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;
