import { Card, Icon } from "semantic-ui-react";

import { HospitalEntry } from "../types";
import React from "react";

const HospitalEntryCard: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="hospital" />
        </Card.Header>
        {/* <Card.Meta>{entry.}</Card.Meta> */}
        <Card.Description>{entry.description}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default HospitalEntryCard;
