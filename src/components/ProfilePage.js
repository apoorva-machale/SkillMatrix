import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import UserProfile from "./UserProfile";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import NavBar from "./NavBar";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  progress: {
    display: "flex",
    justifyContent: "center",
    margin: "17px",
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function ProfilePage(props) {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const obj = JSON.parse(sessionStorage.getItem("login"));
    const accessToken = obj ? obj.token : null;

    console.log(accessToken);
    setLoading(true);
    axios({
      method: "get",
      url: "https://kibo-skill-matrix.herokuapp.com/api/getprofile/",
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    })
      .then((user) => {
        console.log(user.data);
        setUsers(user.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
        if (
          error.response.data.detail === "Token has expired" ||
          error.response.data.detail === "Invalid token"
        ) {
          history.push("/");
          toast.error("Session expired");
        }
      });
  }, []);

  return (
    <div className="jumbotron">
      <NavBar />
      <div className={classes.progress}>
        {loading && <CircularProgress color="primary" />}
      </div>
      {!loading && <UserProfile user={users} />}
    </div>
  );
}

export default ProfilePage;
