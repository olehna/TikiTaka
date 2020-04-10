import React from "react";
import classes from "./ActiveQuiz.module.css";
import AnswersList from "./AnswersList/AnswersList";
import Timer from "../UI/Timer/Timer";

const ActiveQuiz = (props) => {

  return (
    <div className={classes.ActiveQuiz}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "flex-end",
        }}
      >
        <h1 className={classes.Title}>{props.topic}</h1>
      </div>
      <div className={classes.imgWrap}>
        <img src={props.ImgLink} alt="" className={classes.Image} />
        <small className={classes.Progress}>
          {props.answerNumber} / {props.quizLength}
        </small>
      </div>
      <p className={classes.Question}>
        <span className={classes.questText}>{props.question}</span>
      </p>

      <AnswersList
        state={props.state}
        answers={props.answers}
        onAnswerClick={props.onAnswerClick}
      />
      <div className="timerBox">
        <Timer />
      </div>
    </div>
  );
};

export default ActiveQuiz;
