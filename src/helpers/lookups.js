import http from "./http";

export const getCities = async (countryCode) => {
  try {
    const res = await http.get(
      `https://countries-cities.p.rapidapi.com/location/country/${countryCode}/city/list`,
      {}
    );
    return res.data.cities.map((city) => ({ name: city.name }));
  } catch (err) {
    console.log(err);
  }
};
