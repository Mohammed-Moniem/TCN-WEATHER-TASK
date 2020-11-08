import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Page from "../../../components/Page";
import SunSet from "./SunSet";
import Temp from "./Temp";
import Wind from "./Wind";
import SunRise from "./SunRise";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Dashboard = ({ temperature, wind, sunrise, sunset }) => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <SunSet sunset={sunset} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Wind wind={wind} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Temp temperature={temperature} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <SunRise sunrise={sunrise} />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}></Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
