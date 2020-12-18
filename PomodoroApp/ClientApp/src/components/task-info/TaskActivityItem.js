import React, { Component } from 'react';
import { Button, Container, Label, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

const TaskActivityItem = ({ taskActivity }) => {
  return (
    <ListGroup horizontal>
      <ListGroupItem>
        <ListGroupItemHeading>Duration:</ListGroupItemHeading>
        <ListGroupItemText>{taskActivity.duration}</ListGroupItemText>
      </ListGroupItem>
      <ListGroupItem>
        <ListGroupItemHeading>Started At:</ListGroupItemHeading>
        <ListGroupItemText>{taskActivity.startTime}</ListGroupItemText>
      </ListGroupItem>
      <ListGroupItem>
        <ListGroupItemHeading>Ended At:</ListGroupItemHeading>
        <ListGroupItemText>{taskActivity.endTime}</ListGroupItemText>
      </ListGroupItem>
    </ListGroup>
  );
}

export { TaskActivityItem }
