import React, { useEffect } from "react";
import { Box, Container, Grid, Fab, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Page from "./../../../components/Page";
import Toolbar from "./Toolbar";
import CityCard from "./CityCard";
import { Save as SaveIcon } from "@material-ui/icons";
import {
  saveCities,
  getSavedCities,
} from "./../../../redux/actions/city_actions";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  cityCard: {
    height: "100%",
  },
  fab: {
    position: "absolute",
    right: "0",
    bottom: "0",
    marginRight: "25px",
  },
}));

const ProductList = () => {
  //Const
  const classes = useStyles();
  const dispatch = useDispatch();

  //Cities in the store
  const cities = useSelector((store) => store.cityReducer.cities);

  useEffect(() => {
    const fetch = async () => {
      await dispatch(getSavedCities());
    }
    fetch()
  }, [dispatch]);

  //Handlers

  const handleCitiesSaving = () => {
    saveCities(cities);
  };

  return (
    <Page className={classes.root} title="Cities">
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          {cities.length !== 0 && (
            <Grid container spacing={3}>
              {cities.length !== 0 &&
                cities.map((city) => (
                  <Grid
                    item
                    // key={city.location.name}
                    lg={4}
                    md={6}
                    xs={12}
                  >
                    {city && (
                      <CityCard className={classes.cityCard} city={city} />
                    )}
                  </Grid>
                ))}
            </Grid>
          )}
        </Box>
      </Container>
      <Fab color="primary" className={classes.fab} onClick={handleCitiesSaving}>
        <SaveIcon />
      </Fab>
    </Page>
  );
};

export default ProductList;
