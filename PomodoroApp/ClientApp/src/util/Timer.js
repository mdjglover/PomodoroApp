class Timer {
  constructor() {
    this._totalTime = 0;

    this._isRunning = false;
    this._lastUpdate = 0;
  }

  get isRunning() {
    return this._isRunning;
  }

  startTimer() {
    if (!this._isRunning) {
      this._lastUpdate = Date.now();
      this._isRunning = true;
    }
  }

  pauseTimer() {
    if (this._isRunning) {
      this._updateTotalTime();

      this._isRunning = false;
    }
  }

  resetTimer() {
    this._totalTime = 0;
    this._lastUpdate = 0;
    this._isRunning = false;
  }

  get elapsedTimeMillis() {
    if (this._isRunning) {
      this._updateTotalTime();
    }
    return this._totalTime;
  }

  get elapsedTimeString() {
    // Returns total running time of timer in format "HH:MM:SS" 

    function addLeadingZero(n) {
      return n < 10 ? `0${n}` : `${n}`;
    }

    if (this._isRunning) {
      this._updateTotalTime();
    }

    let seconds = addLeadingZero(Math.floor((this._totalTime / 1000) % 60));
    let minutes = addLeadingZero(Math.floor((this._totalTime / (1000 * 60))) % 60);
    let hours = addLeadingZero(Math.floor((this._totalTime / (1000 * 60 * 60))) % 60);

    return `${hours}:${minutes}:${seconds}`;
  }

  _updateTotalTime() {
    let currentTime = Date.now();
    this._totalTime += currentTime - this._lastUpdate;
    this._lastUpdate = currentTime;
  }

}

export {Timer}