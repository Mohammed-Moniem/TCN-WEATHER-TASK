import http from "../../helpers/http";
import { cityConstants } from "../constants/city_constants";
import messages from "../../helpers/messages";
import getDates from "../../helpers/dates";

export const getCityWeather = (previousCities, city) => async (dispatch) => {
  try {
    let alreadyAdded;
    const result = await http.get(
      `http://api.weatherapi.com/v1/current.json?key=bc9c90854f8f4385aff193124200511&q=${city}`
    );
    if (previousCities.length > 0) {
      for (let i = 0; i < previousCities.length; i++) {
        if (result.data.location.name === previousCities[i].location.name) {
          messages.warn("Common! You added this city already!");
          return (alreadyAdded = true);
        }
      }
    }
    if (result && !alreadyAdded) {
      dispatch({
        type: cityConstants.ADD_CITY_SUCCESS,
        payload: result.data,
      });
      messages.success("city was added. You can check the weather now Yeeeey!");
    }
  } catch (error) {
    dispatch({
      type: cityConstants.ADD_CITY_FAILURE,
    });
    messages.error(
      error.message +
        "probably this city is not supported through the weather api"
    );
  }
};

export const getCityHistory = async (name) => {
  try {
    //Dates middleware is used because the free weather API gives you only up to 3 days history behind.
    // You need subscription to have more historical data. I made it also to format the dates in the specific format that the API requires which is YYYY-MM-DD
    const dates = getDates();
    const result = await http.get(
      `http://api.weatherapi.com/v1/history.json?key=bc9c90854f8f4385aff193124200511&q=${name}&end_dt=${dates.today}&dt=${dates.twoDaysAgo}`
    );
    if (result) {
      messages.success("History was made!");
      return result.data.forecast.forecastday;
    }
  } catch (error) {
    messages.error(error.message);
  }
};

export const saveCities = (cities) => {
  try {
    localStorage.setItem("cities", JSON.stringify(cities));
  } catch (error) {
    messages.error("Cities were saved");
  }
};

export const getSavedCities = () => async (dispatch) => {
  try {
    const result = JSON.parse(localStorage.getItem("cities"));
    console.log(result);
    if (result) {
      dispatch({
        type: cityConstants.GET_SAVED_CITIES_SUCCESS,
        payload: result,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeCities = () => {
  try {
    localStorage.clear();
  } catch (error) {
    messages.error("Cities were saved");
  }
};

export const deleteCity = (cities, cityName) => async (dispatch) => {
  try {
    const result = cities.filter((c) => c.location.name !== cityName);
    if (result) {
      dispatch({
        type: cityConstants.DELETE_CITY_SUCCESS,
        payload: result,
      });
    }
    messages.success("city was removed >_<");
  } catch (error) {
    dispatch({
      type: cityConstants.DELETE_CITY_FAILURE,
    });
    messages.error(error.message);
  }
};
