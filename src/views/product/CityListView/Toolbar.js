import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { Button, Card, CardContent, Grid, makeStyles } from "@material-ui/core";
import Autocomplete from "../../../components/Autocomplete";
import { countries } from "../../../helpers/constants";
import { getCities } from "../../../helpers/lookups";
import { getCityWeather } from "./../../../redux/actions/city_actions";
import { validateCityGeneralForm } from "./../../../validation/validators";

const useStyles = makeStyles((theme) => ({
  root: {},
  grid: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
  },
  gridItem: {
    marginLeft: "10px",
  },
}));

const Toolbar = ({ className, ...rest }) => {
  //Const
  const classes = useStyles();
  const dispatch = useDispatch();

  //Local States
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState({ name: "" });

  //Cities From Reducer to check if the city already exist
  const perviousCities = useSelector((store) => store.cityReducer.cities);

  //Handlers
  const handleCountrySelection = async (e, v) => {
    if (v && v.code) {
      e.preventDefault();
      const res = await getCities(v.code);
      if (res) {
        setCities(res);
      }
    } else {
      setCities([]);
    }
  };

  const handleCitySelection = (e, v) => {
    if (v) {
      e.preventDefault();
      setCity({ name: v.name });
    } else {
      setCity({ name: "" });
    }
  };

  const handleAddCity = async () => {
    if (!validateCityGeneralForm(city)) {
      //Dispatch Add City Action
      await dispatch(getCityWeather(perviousCities, city.name));
    }
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Card>
        <CardContent>
          <Grid container className={classes.grid}>
            <Grid xs={3}>
              <Autocomplete
                data={countries}
                label="Select Your Country!"
                onChange={handleCountrySelection}
              />
            </Grid>
            <Grid xs={3} className={classes.gridItem}>
              <Autocomplete
                data={cities}
                name="city"
                label="Select Your City!"
                onChange={handleCitySelection}
              />
            </Grid>
            <Grid xs={3} className={classes.gridItem}>
              <Button
                color="primary"
                variant="contained"
                onClick={handleAddCity}
              >
                Add city!
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
};

export default Toolbar;
