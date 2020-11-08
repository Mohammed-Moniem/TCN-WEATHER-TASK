import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
  makeStyles,
  colors,
} from "@material-ui/core";
import WbSunnyIcon from "@material-ui/icons/WbSunny";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56,
  },
}));

const Temp = ({ className, temperature, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Temperature
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {temperature}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <WbSunnyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={3}>
          <LinearProgress value={temperature} variant="determinate" />
        </Box>
      </CardContent>
    </Card>
  );
};

Temp.propTypes = {
  className: PropTypes.string,
};

export default Temp;
