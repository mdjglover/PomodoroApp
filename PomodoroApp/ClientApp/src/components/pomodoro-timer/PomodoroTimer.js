import React, { Component } from 'react';
import { Button, Container } from 'reactstrap';
import { useStore } from '../../stores/AppStore';
import { Timer } from '../../util/Timer';


class PomodoroTimer extends Component {
  constructor(props) {
    super();
    this.timer = new Timer();
    this.interval = null;
    this.alarm = new Audio('./alarm.wav');
    this.store = props.store;

    this.state = {
      elapsedTimeString: this.timer.elapsedTimeString,
      timerRunning: false,
      isTakingBreak: false,
      startTime: null,
      pomodoroDuration: 1000* 60 * 25,
      breakDuration: 1000 * 60 * 5,
      alarmTime: -1,
      alarmSounded: false
    }

    this.startPauseTimer = this.startPauseTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.hardResetTimer = this.hardResetTimer.bind(this);
    this.tick = this.tick.bind(this);
    this.handleBreakStartStop = this.handleBreakStartStop.bind(this);
  }

  startPauseTimer() {
    if (!this.state.timerRunning) {
      this.timer.startTimer();
      this.setState({
        timerRunning: true
      });

      if (this.state.startTime == null) {
        let currentTime = new Date();
        this.setState({ startTime: currentTime});
      }

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
    this.setState({ startTime: null });
    this.timer.resetTimer();
    this.tick(); // resets time string
  }

  hardResetTimer() {
    this.handleTaskActivity();
    this.setState({ isTakingBreak: false });
    this.resetTimer();
  }

  async handleBreakStartStop() {
    if (this.state.isTakingBreak) {
      await this.setState({
        isTakingBreak: false,
        alarmTime: this.state.pomodoroDuration
      });
    } else {
      this.handleTaskActivity();
      await this.setState({
        isTakingBreak: true,
        alarmTime: this.state.breakDuration
      });
    }
    this.resetTimer();
    this.startPauseTimer();
  }

  handleTaskActivity() {
    if (this.state.startTime != null && !this.state.isTakingBreak) {
      if (this.store.activeTask === null) {
        return;
      }
      let currentTime = new Date();
      let taskActivity = {
        taskId: this.store.activeTask.id,
        startTime: this.state.startTime,
        endTime: currentTime,
        duration: this.timer.elapsedTimeMillis
      };
      this.store.addTaskActivity(taskActivity);
    }
  }

  tick() {
    this.setState({
      elapsedTimeString: this.timer.elapsedTimeString
    });

    if (this.state.alarmTime > 0 && this.timer.elapsedTimeMillis >= this.state.alarmTime && !this.alarmSounded) {
      this.alarm.play();
      this.alarmSounded = true;
    }
  }

  render() {
    return (
      <Container className="mt-2 pt-2 border-top border-dark">
        <p className="mt-2">
          {this.state.elapsedTimeString}
        </p>
        <Button className="mr-2" onClick={this.startPauseTimer}>{this.state.timerRunning ? "Pause" : "Start"}</Button>
        <Button className="mx-2" onClick={this.hardResetTimer}>Reset</Button>
        <Button className="mx-4" onClick={this.handleBreakStartStop}>{this.state.isTakingBreak ? "Back to Work" : "Take a Break"}</Button>

      </Container>
    );
  }
}

function PomodoroTimerWrapper(Component) {
  return function WrappedPomodoroTimer(props) {
    const store = useStore();
    return <PomodoroTimer {...props} store={store} />;
  }
}

export default PomodoroTimerWrapper(PomodoroTimer);