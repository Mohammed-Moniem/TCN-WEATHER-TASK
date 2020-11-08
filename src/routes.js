import React from "react";
import { Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import MainLayout from "./layouts/MainLayout";
import NotFoundView from "./views/errors/NotFoundView";
import CityListView from "./views/product/CityListView";
import CityHistory from "./views/product/CityListView/CityHistory";

const routes = [
  {
    path: "app",
    element: <DashboardLayout />,
    children: [
      { path: "cities", element: <CityListView /> },
      { path: "city/:name", element: <CityHistory /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "404", element: <NotFoundView /> },
      { path: "/", element: <Navigate to="/app/cities" /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
