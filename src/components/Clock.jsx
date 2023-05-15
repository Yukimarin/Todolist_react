import React, { Component } from "react";

export default class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
      isRunning: false,
    };
  }

  startTimer = () => {
    this.timerID = setInterval(() => {
      const { milliseconds, seconds } = this.state;

      if (milliseconds === 99) {
        this.setState((prevState) => ({
          milliseconds: 0,
          seconds: prevState.seconds + 1,
        }));
      } else {
        this.setState((prevState) => ({
          milliseconds: prevState.milliseconds + 1,
        }));
      }

      if (seconds === 59) {
        this.setState((prevState) => ({
          seconds: 0,
          minutes: prevState.minutes + 1,
        }));
      }
    }, 1);
    this.setState((prevState) => ({
      isRunning: !prevState.isRunning,
    }));
  };

  stopTimer = () => {
    clearInterval(this.timerID);
    this.setState((prevState) => ({
      isRunning: !prevState.isRunning,
    }));
  };

  resetTimer = () => {
    clearInterval(this.timerID);
    this.setState(() => ({
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
      isRunning: false,
    }));
  };

  render() {
    const { milliseconds, seconds, minutes, isRunning } = this.state;

    return (
      <div>
        <h1>
          {minutes < 10 ? "0" + minutes : minutes}:
          {seconds < 10 ? "0" + seconds : seconds}:
          {milliseconds < 10 ? "0" + milliseconds : milliseconds}
        </h1>
        {!isRunning ? (
          <button onClick={this.startTimer}>Start</button>
        ) : (
          <button onClick={this.stopTimer}>Stop</button>
        )}
        <button onClick={this.resetTimer}>Reset</button>
      </div>
    );
  }
}
