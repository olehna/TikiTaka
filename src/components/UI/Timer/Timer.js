import React, { Component } from 'react';
import classes from './Timer.module.css'

export default class Timer extends Component {
  state = {
    seconds: 15,
  }
  componentDidMount() {
    this.myInterval = setInterval(() => {
        const { seconds } = this.state
        if (seconds > 0) {
            this.setState(({ seconds }) => ({
                seconds: seconds - 1
            }))
        }
    }, 1000)
}
  render() {
    const { seconds } = this.state
    return(
      <div className={classes.Timer}>
          { seconds < 10 ? `0${seconds}` : seconds }
      </div>
    )
  }
}
