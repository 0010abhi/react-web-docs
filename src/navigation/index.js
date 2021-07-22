import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import EditDetail from "../pages/Dashboard/EditDetail";

const NAV_CONST = [
  {
    path: "/",
    component: Dashboard,
  },
  {
    path: "/editdetail",
    component: EditDetail,
  },
];

export default function AppNavigation() {
  return (
    <Switch>
      {NAV_CONST.map((datum, index) => (
        <Route
          key={index}
          exact
          path={datum.path}
          component={datum.component}
        />
      ))}
      {/* <Redirect to="/" /> */}
    </Switch>
  );
}
