import firebase from "../../firebase";
import {
  FETCH_RATING_START,
  FETCH_RATING_SUCCESS,
  // FETCH_RATING_ERROR,
} from "./actionTypes";

export function fetchRating() {
  return async (dispatch) => {
    dispatch(fetchRatingStart());
    
      const unsubscribe = firebase
        .firestore()
        .collection("users")
        .orderBy("rightAnswers", "desc")
        .onSnapshot((snapshot) => {
          const ratingPeople = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch(fetchRatingSuccess(ratingPeople));
        });
      return () => unsubscribe();
  }
};



export function fetchRatingStart() {
  return {
    type: FETCH_RATING_START,
  };
}

export function fetchRatingSuccess(ratingPeople) {
  return {
    type: FETCH_RATING_SUCCESS,
    ratingPeople
  };
}
