import { Card, Icon, Rating } from "semantic-ui-react";

import { HealthCheckEntry } from "../types";
import React from "react";

const HealthCheckEntryCard: React.FC<{ entry: HealthCheckEntry }> = ({
  entry,
}) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="doctor" />
        </Card.Header>
        <Rating icon="heart" maxRating={4} rating={entry.healthCheckRating} />
        <Card.Description>{entry.description}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default HealthCheckEntryCard;
