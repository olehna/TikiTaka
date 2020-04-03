import React, { Component } from 'react'
import classes from './Logo.module.css'


class Logo extends Component {
  render() {
    return (
      <div>
        <img className={classes.logo} src='./img/logo.png' alt='Logo'/>
      </div>
    )
  }
}

export default Logo
