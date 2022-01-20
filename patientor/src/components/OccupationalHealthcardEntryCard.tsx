import { Card, Icon } from "semantic-ui-react";

import { OccupationalHealthcareEntry } from "../types";
import React from "react";

const OccupationalHealthcardEntryCard: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="hospital symbol" />
        </Card.Header>
        <Card.Meta>{entry.employerName}</Card.Meta>
        <Card.Description>{entry.description}</Card.Description>
      </Card.Content>
    </Card>
  );
};
export default OccupationalHealthcardEntryCard;
