import React, { Component } from "react";
import classes from "./QuizCard.module.css";
export default class QuizCard extends Component {
 
  render() {
    return (
      <div className={classes.card}>
        <div className={classes.cardImage}>
       
          <img className={classes.img} src={`./img/iconCard/${this.props.icon}.png`} alt="" />
        </div>
        <div className={classes.cardTitle}>{this.props.name}</div>
      </div>
    );
  }
}
