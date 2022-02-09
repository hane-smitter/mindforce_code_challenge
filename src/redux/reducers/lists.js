import {
  FETCH_LISTS_REQ,
  FETCH_LISTS_SUCCESS,
  FETCH_LISTS_ERROR,
} from "../constants";

export const lists = (
  lists = {
    list: [],
    loading: false,
    err: "",
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_LISTS_REQ:
      return {
        ...lists,
        loading: true,
      };
    case FETCH_LISTS_SUCCESS:
      return {
        ...lists,
        list: payload,
        loading: false,
      };
    case FETCH_LISTS_ERROR:
      return {
        ...lists,
        err: payload,
        loading: false,
      };
    default:
      return lists;
  }
};
