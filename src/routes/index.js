import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";
import AdminDoctorLayout from "../layouts/AdminDoctorLayout";

const Routes = (props) => {
  return (
    <Switch>
      <PrivateRoute path='/admin' component={AdminLayout} />
      <PrivateRoute path='/admin-doctor' component={AdminDoctorLayout} />
      <PrivateRoute path='/user' component={UserLayout} />
      <Route path='/' component={PublicLayout} />
    </Switch>
  );
};
export default Routes;
