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
  QUIZ_RESET_TIMER,
} from "../actions/actionTypes";

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
};

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state,
        loading: false,
        quizes: action.quizes,
      };
    case FETCH_QUIZES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        quiz: action.quiz,
      };
    case QUIZ_SET_STATE:
      return {
        ...state,
        answerState: action.answerState,
        results: action.results,
      };
    case FINISH_QUIZ:
      return {
        ...state,
        isFinished: true,
      };
    case QUIZ_NEXT_QUESTION:
      return {
        ...state,
        answerState: null,
        activeQuestion: action.number,
      };
    case QUIZ_RETRY:
      return {
        ...state,
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        results: {},
      };
    case QUIZ_DECR_TIMER:
      return {
        ...state,
        seconds: state.seconds - 1,
      };
    case QUIZ_SHOW_LOADER:
      return {
        ...state,
        loading: true,
      };
    case QUIZ_HIDE_LOADER:
      return {
        ...state,
        loading: false,
      };
    case QUIZ_RESET_TIMER:
      return {
        ...state,
        seconds: initialState.start,
      };

    default:
      return state;
  }
}
