import React, { Component } from "react";
import { connect } from "react-redux";
import {
  decSecondsAC,
  quizAnswerClick,
  resetTimer,
} from "../../../store/actions/quiz";
import classes from "./Timer.module.css";

class Timer extends Component {
  // state = {
  //   seconds: 15,
  // }

  componentDidMount() {
    this.props.resetTimerToStart();
    this.myInterval = setInterval(() => {
      const { seconds, decSeconds, nextQuestion } = this.props;
      console.log(seconds);
      if (seconds > 0) {
        decSeconds();
      } else if (seconds === 0) {
        nextQuestion();
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    const { seconds } = this.props;
    return seconds >= 0 ? (
      <div className={classes.Timer}>
        {seconds}
        {/* { seconds < 10 ? `0${seconds}` : seconds } */}
      </div>
    ) : (
      <div className={classes.timeOut}>
        Сорян, время вышло
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    seconds: store.quiz.seconds,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    decSeconds: () => dispatch(decSecondsAC()),
    nextQuestion: () => dispatch(quizAnswerClick()),
    resetTimerToStart: () => dispatch(resetTimer()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
