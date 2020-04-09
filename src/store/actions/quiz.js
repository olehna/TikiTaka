import axios from "../../axios/axios-quiz";
import firebase from "../../firebase";
import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY,
  QUIZ_SET_STATE,
  QUIZ_DECR_TIMER,
  QUIZ_SHOW_LOADER,
  QUIZ_HIDE_LOADER,
  QUIZ_RESET_TIMER
} from "./actionTypes";

export function fetchQuizes() {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axios.get("/quiz.json");

      const quizes = [];

      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `${response.data[key][0].topic}`,
        });
      });

      let uniqueTopics = () => {
        let passedVals = [];
        const newArr = quizes
          .sort(() => Math.random() - 0.5)
          .filter(
            (el) => !passedVals.includes(el.name) && passedVals.push(el.name)
          );
        return newArr;
      };

      dispatch(fetchQuizesSuccess(uniqueTopics()));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  };
}

export function fetchQuizById(quizId) {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());

    try {
      const response = await axios.get(`/quiz/${quizId}.json`);
      const quiz = response.data;

      dispatch(fetchQuizSuccess(quiz));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  };
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz,
  };
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START,
  };
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes,
  };
}

export function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e,
  };
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results,
  };
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ,
  };
}

export function quizNextQuestion(number) {
  return {
    type: QUIZ_NEXT_QUESTION,
    number,
  };
}

export function retryQuiz() {
  return {
    type: QUIZ_RETRY,
  };
}

export function decSecondsAC() {
  return {
    type: QUIZ_DECR_TIMER,
  };
}

export function showLoader() {
  return {
    type: QUIZ_SHOW_LOADER,
  };
}

export function hideLoader() {
  return {
    type: QUIZ_HIDE_LOADER,
  };
}

export function resetTimer() {
  return {
    type: QUIZ_RESET_TIMER,
  };
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz;

    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === "success") {
        return;
      }
    }

    const question = state.quiz[state.activeQuestion];
    const results = state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = "success";
      }
      dispatch(quizSetState({ [answerId]: "success" }, results));
    } else {
      results[question.id] = "error";
      dispatch(quizSetState({ [answerId]: "error" }, results));
    }

    dispatch(decSecondsAC())

    setTimeout(() => {
      dispatch(showLoader());
      const timeout = setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz());
          firebase
            .firestore()
            .collection("users")
            .doc(localStorage.userId)
            .update({
              games: firebase.firestore.FieldValue.increment(1),
              rightAnswers: firebase.firestore.FieldValue.increment(
                Object.values(results).filter((elem) => elem === "success")
                  .length
              ),
            });
          console.log(results);
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1));
        }
        dispatch(hideLoader());
        clearTimeout(timeout);
      }, 1000);
    }, 1000);
  };
}

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length;
}
