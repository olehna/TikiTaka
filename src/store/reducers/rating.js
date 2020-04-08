import {
  FETCH_RATING_START,
  FETCH_RATING_SUCCESS,
  FETCH_RATING_ERROR,
} from "../actions/actionTypes";

const initialState = {
  users: [],
  loading: false,
}

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_RATING_START:
      return {
        ...state, loading: true
      }
    case FETCH_RATING_SUCCESS:
      return {
        ...state, loading: false, users: action.ratingPeople
      }
    case FETCH_RATING_ERROR:
      return {
        ...state, loading: false, error: 'error'
      }
    default:
      return state
  }
}
