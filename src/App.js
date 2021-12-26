import React from "react";
import NotFoundPage from "./components/NotFoundPage";
import { makeStyles } from "@material-ui/core/styles";
import HomePage from "./components/HomePage";
import Skill from "./components/Skill";
import Update from "./components/Update";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import DashboardPage from "./components/DashboardPage";
import { ToastContainer } from "react-toastify";
import ProfilePage from "./components/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const App = () => {
  const classes = useStyles();
  const obj = JSON.parse(sessionStorage.getItem("login"));
  const accessToken = obj ? obj.token : null;
  console.log(accessToken);

  return (
    <div className={classes.root}>
      <ToastContainer autoClose={3000} hideProgressBar />

      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signup" component={HomePage} />
        <PrivateRoute path="/skill" component={Skill} />
        <PrivateRoute path="/update" component={Update} />
        <PrivateRoute path="/profile" component={ProfilePage} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
};

export default App;
