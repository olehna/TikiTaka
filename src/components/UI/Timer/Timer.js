import React, { Component } from 'react';
import { connect } from 'react-redux'
import { decSecondsAC, quizAnswerClick } from '../../../store/actions/quiz'
import classes from './Timer.module.css'


class Timer extends Component {


  // state = {
  //   seconds: 15,
  // }

  componentDidMount() {
    setTimeout(() => {
      
      this.myInterval = setInterval(() => {
        const { seconds, decSeconds, nextQuestion } = this.props
        console.log(seconds)
        if (seconds > 0) {
            decSeconds()
          } else {
            nextQuestion()
            // clearInterval(this.myInterval)
          }
      }, 1000)
    }, 2000)
}
  render() {
    const { seconds } = this.props
    return(
      <div className={classes.Timer}>
          {seconds}
          {/* { seconds < 10 ? `0${seconds}` : seconds } */}
      </div>
    )
  }
}


const mapStateToProps = (store) => {
  return {
    seconds: store.quiz.seconds,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    decSeconds: () => dispatch(decSecondsAC()),
    nextQuestion: () => dispatch(quizAnswerClick())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer)
