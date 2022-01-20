import { Entry } from "../types";
import HealthCheckEntryCard from "./HealthCheckEntryCard";
import HospitalEntryCard from "./HospitalEntryCard";
import OccupationalHealthcardEntryCard from "./OccupationalHealthcardEntryCard";
import React from "react";
import utils from "../utils";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryCard entry={entry} />;

    case "HealthCheck":
      return <HealthCheckEntryCard entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcardEntryCard entry={entry} />;
    default:
      return utils.assertNever(entry);
  }
};

export default EntryDetails;
