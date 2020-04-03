import React, { Component } from "react";
import classes from "./QuizList.module.css";
import { NavLink } from "react-router-dom";
import Loader from "../../components/UI/Loader2/Loader";
import { connect } from "react-redux";
import { fetchQuizes } from "../../store/actions/quiz";

class QuizList extends Component {
  renderQuizes() {
    return this.props.quizes.map(quiz => {
      return (
        <NavLink to={"/quiz/" + quiz.id}>
          <div className={classes.card} key={quiz.id}>
            <div className={classes.cardImage}>
              <img className={classes.img} src="https://clck.ru/MoKAU" alt="" />
            </div>
            <div className={classes.cardTitle}>{quiz.name}</div>
          </div>
        </NavLink>
      );
    });
  }

  componentDidMount() {
    this.props.fetchQuizes();
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1 className={classes.title}>Список тестов</h1>

          {this.props.loading && this.props.quizes.length !== 0 ? (
            <Loader />
          ) : (
            <div className={classes.cardList}>
              <div className={classes.cardWrap}>
                {this.renderQuizes()}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
