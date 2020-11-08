import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors,
} from "@material-ui/core";
import { Sunrise as SunriseIcon } from "react-feather";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56,
  },
}));

const SunRise = ({ className, sunrise, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Sun Rise
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {sunrise}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <SunriseIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

SunRise.propTypes = {
  className: PropTypes.string,
};

export default SunRise;
