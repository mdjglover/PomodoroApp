import React, { Component, useState, useEffect } from 'react';
import { Button, Container } from 'reactstrap';
import { useStore } from '../../stores/AppStore';
import { Timer } from '../../util/Timer';


class PomodoroTimer extends Component {
  constructor() {
    super();
    this.timer = new Timer();
    this.interval = null;

    this.state = {
      elapsedTimeString: this.timer.elapsedTimeString,
      timerRunning: false
    }

    this.startPauseTimer = this.startPauseTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.tick = this.tick.bind(this);
  }

  startPauseTimer() {
    if (!this.state.timerRunning) {
      this.timer.startTimer();
      this.setState({
        timerRunning: true
      });
      this.interval = setInterval(this.tick, 1000);
    } else {
      this.timer.pauseTimer();
      this.setState({
        timerRunning: false
      });
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  resetTimer() {
    if (this.state.timerRunning) {
      this.startPauseTimer();
    }
    this.timer.resetTimer();
    this.tick(); // resets time string
  }

  tick() {
    this.setState({
      elapsedTimeString: this.timer.elapsedTimeString
    });
  }

  render() {
    return (
      <Container>
        <p>
          {this.state.elapsedTimeString}
        </p>
        <Button onClick={this.startPauseTimer}>{this.state.timerRunning ? "Pause" : "Start"}</Button>
        <Button onClick={this.resetTimer}>Reset</Button>
      </Container>
    );
  }
}

export { PomodoroTimer }