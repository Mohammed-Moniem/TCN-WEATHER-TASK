import { cityConstants } from "../constants/city_constants";

const initialState = {
  cities: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case cityConstants.ADD_CITY_SUCCESS:
      return {
        ...state,
        cities: [...state.cities, action.payload],
      };
    case cityConstants.DELETE_CITY_SUCCESS:
      return {
        cities: [...action.payload],
      };
    case cityConstants.GET_SAVED_CITIES_SUCCESS:
      return {
        ...state,
        cities: [...action.payload],
      };
    case cityConstants.ADD_CITY_FAILURE:
    case cityConstants.DELETE_CITY_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};
