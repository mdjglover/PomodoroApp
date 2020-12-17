import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useStore } from '../stores/AppStore';
import { TaskList } from './task-list/TaskList';
import { PomodoroTimer } from './pomodoro-timer/PomodoroTimer';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <Container>
        <Row>
          <Col >
            <TaskList />
          </Col>
          <Col>
            <PomodoroTimer />
          </Col>
        </Row>
      </Container>
    )
  }
}
