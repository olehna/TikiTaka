import axios from '../../axios/axios-quiz'
import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS, FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_RETRY,
  QUIZ_SET_STATE,
  QUIZ_SET_TIMER
} from './actionTypes'

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try {
      const response = await axios.get('/quiz.json')

      const quizes = []

      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `${response.data[key][0].topic}`
        })
      })

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
  }
}

export function fetchQuizById(quizId) {
  return async dispatch => {
    dispatch(fetchQuizesStart())

    try {
      const response = await axios.get(`/quiz/${quizId}.json`)
      const quiz = response.data

      dispatch(fetchQuizSuccess(quiz))
    } catch (e) {
      dispatch(fetchQuizesError(e))
    }
  }
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
  }
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  }
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  }
}

export function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e
  }
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState, results
  }
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ
  }
}

export function quizNextQuestion(number) {
  return {
    type: QUIZ_NEXT_QUESTION,
    number
  }
}

export function retryQuiz() {
  return {
    type: QUIZ_RETRY
  }
}

export function setTimer(second) {
  return {
    type: QUIZ_SET_TIMER,
    second
  }
}


export function quizAnswerClick(answerId) {
  
  return (dispatch, getState) => {
    const state = getState().quiz

    if (state.answerState) {
      const key = Object.keys(state.answerState)[0]
      if (state.answerState[key] === 'success') {
        return
      }
    }

    const question = state.quiz[state.activeQuestion]
    const results = state.results


    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }

      dispatch(quizSetState({[answerId]: 'success'}, results))

      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz())
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1))
        }
        window.clearTimeout(timeout)
      }, 500)
    } else {
      results[question.id] = 'error'
      dispatch(quizSetState({[answerId]: 'error'}, results))

      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz())
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1))
        }
        window.clearTimeout(timeout)
      }, 500)
    }
  }
}

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length
}
