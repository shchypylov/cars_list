import { createContext } from "react";

export const initialFiltersReducerState = {
  color: null,
  manufacturer: null,
};

export const filtersReducer = (state, action) => {
  switch (action.type) {
    case "SET_COLOR":
      return { ...state, color: action.payload };
    case "SET_MANUFACTURER":
      return { ...state, manufacturer: action.payload };
    default:
      return state;
  }
};

export const filtersContext = createContext({
  state: {},
  dispatch: () => 1,
});
