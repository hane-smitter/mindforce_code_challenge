import axios from "axios";

import {
  FETCH_LISTS_REQ,
  FETCH_LISTS_SUCCESS,
  FETCH_LISTS_ERROR,
} from "../constants";

//Action creators
export const getList = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_LISTS_REQ });
    //fetch data
    const { data: payload } = await axios(
      "https://jsonplaceholder.typicode.com/photos?_start=0&_limit=70"
    );
    console.log(payload);
    dispatch({ type: FETCH_LISTS_SUCCESS, payload });
  } catch (error) {
    logError(error, dispatch, FETCH_LISTS_ERROR);
  }
};

function logError(error, dispatch, actionType) {
  if (error.response) {
    dispatch({ type: actionType, payload: error.response.data });
  } else if (error.request) {
    dispatch({ type: actionType, payload: "Could not get response" });
  } else {
    dispatch({ type: actionType, payload: "Oops! An unknown error occured!" });
  }
}
