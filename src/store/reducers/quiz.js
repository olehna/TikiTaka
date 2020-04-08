import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS, FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_RETRY,
  QUIZ_SET_STATE,
  QUIZ_SET_TIMER,
  QUIZ_DECR_TIMER ,
} from '../actions/actionTypes';

const initialState = {
  quizes: [],
  loading: false,
  error: null,
  results: {},
  isFinished: false,
  activeQuestion: 0,
  answerState: null,
  quiz: null,
  seconds: 15,
  start: 15,
}

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state, loading: true
      }
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state, loading: false, quizes: action.quizes
      }
    case FETCH_QUIZES_ERROR:
      return {
        ...state, loading: false, error: action.error
      }
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state, loading: false, quiz: action.quiz
      }
    case QUIZ_SET_STATE:
      return {
        ...state, answerState: action.answerState, results: action.results, seconds: state.start
      }
    case FINISH_QUIZ:
      return {
        ...state, isFinished: true
      }
    case QUIZ_NEXT_QUESTION:
      return {
        ...state, answerState: null, activeQuestion: action.number
      }
    case QUIZ_RETRY:
      return {
        ...state,
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        results: {}
      }
    // case QUIZ_SET_TIMER:
    //   return {
    //     ...state, 
    //     seconds: action.second -1,
    //   }
    case QUIZ_DECR_TIMER:
      return {
        ...state,
        seconds: state.seconds - 1,
      }
      
    default:
      return state
  }
}
