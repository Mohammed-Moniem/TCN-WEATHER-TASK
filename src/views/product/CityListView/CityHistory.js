import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { getCityHistory } from "../../../redux/actions/city_actions";
import { useParams } from "react-router";
import {
  localization,
  tableOptions,
  cityHistoryColumns,
} from "./../../../helpers/constants";
import Dashboard from "./../../reports/Reports/index";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(5),
    marginTop: theme.spacing(5),
    marginRight: theme.spacing(5),
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: "75vw",
      height: "800px",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(3) * 2)]: {
      marginBottom: theme.spacing(6),
      padding: theme.spacing(2),
    },
  },
}));

export default function CityHistory() {
  const classes = useStyles();
  const { name } = useParams();
  const [cityHistory, setCityHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCityHistory(name);
      if (result) {
        setCityHistory(
          result.map((history) => ({
            ...history,
            day: {
              ...history.day,
              condition: {
                ...history.day.condition,
                icon: (
                  <img src={history.day.condition.icon} alt="weather icon" />
                ),
              },
            },
          }))
        );
      }
    };
    fetchData();
  }, [name]);

  return (
    <div className={classes.layout}>
      {cityHistory[0] && (
        <React.Fragment>
          <Dashboard
            temperature={cityHistory[0].day.maxtemp_c}
            wind={cityHistory[0].day.maxwind_mph}
            sunrise={cityHistory[0].astro.sunrise}
            sunset={cityHistory[0].astro.sunset}
          />

          <MaterialTable
            title="City History"
            data={cityHistory}
            columns={cityHistoryColumns}
            options={tableOptions}
            localization={localization}
          />
        </React.Fragment>
      )}
    </div>
  );
}
