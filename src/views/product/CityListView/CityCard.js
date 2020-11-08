import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Tooltip,
  Button,
  makeStyles,
} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { Delete } from "@material-ui/icons";
import OpenIcon from "@material-ui/icons/Launch";
import { deleteCity } from "./../../../redux/actions/city_actions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  statsItem: {
    alignItems: "center",
    display: "flex",
  },
  statsIcon: {
    marginRight: theme.spacing(1),
  },
}));

const CityCard = (props) => {
  //Const
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Local State
  const { city } = props;
  const { location, current } = props.city;

  //Cities From Reducer
  const cities = useSelector((store) => store.cityReducer.cities);

  //Handle City Remove
  const handleCityRemove = () => {
    //Dispatch Delete City Action
    const removeCity = async () => {
      await dispatch(deleteCity(cities, location.name));
    };
    removeCity();
  };

  return (
    <Card className={clsx(classes.root, props.className)}>
      {city && (
        <React.Fragment>
          <CardContent>
            <Box display="flex" justifyContent="center" mb={3}>
              <Avatar
                alt="City"
                src={current ? current.condition.icon : ""}
                variant="square"
              />
            </Box>
            <Typography
              align="center"
              color="textPrimary"
              gutterBottom
              variant="h4"
            >
              {location ? location.name : ""}
            </Typography>
            <Typography align="center" color="textPrimary" variant="body1">
              {location ? location.country : ""}
            </Typography>
            <Typography align="center" color="textPrimary" variant="body1">
              {location ? location.region : ""}
            </Typography>
          </CardContent>
          <Box flexGrow={1} />
          <Divider />
          <Box p={2}>
            <Grid container justify="space-between" spacing={2}>
              <Grid className={classes.statsItem} item>
                <AccessTimeIcon className={classes.statsIcon} color="action" />
                <Typography
                  color="textSecondary"
                  display="inline"
                  variant="body2"
                >
                  {location ? location.localtime : ""}
                </Typography>
              </Grid>
              <Grid className={classes.statsItem} item>
                <Tooltip title="Remove City">
                  <Button onClick={handleCityRemove}>
                    <Delete className={classes.statsIcon} color="action" />
                  </Button>
                </Tooltip>
              </Grid>
              <Grid className={classes.statsItem} item>
                <Tooltip title="Remove City">
                  <Button
                    onClick={() => navigate(`/app/city/${location.name}`)}
                  >
                    <OpenIcon className={classes.statsIcon} color="action" />
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>
        </React.Fragment>
      )}
    </Card>
  );
};

CityCard.propTypes = {
  className: PropTypes.string,
  city: PropTypes.object.isRequired,
};

export default CityCard;
