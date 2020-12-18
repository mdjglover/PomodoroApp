import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useStore } from '../stores/AppStore';
import { ActiveTaskBox } from './task-info/ActiveTaskBox';
import { TaskList } from './task-list/TaskList';
import PomodoroTimer from  './pomodoro-timer/PomodoroTimer';

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
            <Container>
              <Row>
                <ActiveTaskBox />
              </Row>
              <Row>
                <PomodoroTimer />
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    )
  }
}
