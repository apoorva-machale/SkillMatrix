import React, { useState, useEffect } from "react";
import UpdatePage from "./UpdatePage";
import axios from "../Axios";
import { CircularProgress } from "@material-ui/core";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import NavBar from "./NavBar";

const useStyles = makeStyles((theme) => ({
  progress: {
    display: "flex",
    justifyContent: "center",
    margin: "17px",
  },
}));
const Update = (props) => {
  // debugger;
  const classes = useStyles();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState([]);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    personal_email: "",
    phone_number: "",
    kibo_team: "",
    role: "",
  });
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
        setUser({
          first_name: user.data.first_name,
          last_name: user.data.last_name,
          role: user.data.role,
          kibo_team: user.data.kibo_team,
          personal_email: user.data.personal_email,
          phone_number: user.data.phone_number,
        });
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
  function formIsValid() {
    const _errors = {};
    const re = /^[a-zA-Z0-9_.-]+@gmail.com$/;
    const test = re.test(user.personal_email);
    const res = /^\+?1?\d{11,15}$/;
    // apoorva98@Xp
    const reset = res.test(user.phone_number);
    //console.log(user.fname);
    // if (!(user.first_name && user.first_name.length > 3)) {
    //   _errors.first_name = "first name is required";
    //   console.log("incorect fname");
    // }
    // if (!(user.last_name && user.last_name.length > 3)) {
    //   _errors.last_name = "last name is required";
    //   console.log("incorect lname");
    // }
    if (!test) {
      _errors.personal_email = "email  is required";
      console.log("incorect email");
    }
    if (!reset) {
      _errors.phone_number = "phone number is required";
      console.log("incorect phone number");
    }

    setErrors(_errors);
    //form is valid if the errors object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleChange({ target }) {
    setUser({
      ...user,
      [target.name]: target.value,
    });
  }
  // useEffect(() => {}, []);

  function handleSubmit(event) {
    event.preventDefault();

    if (!formIsValid()) {
      console.log("invalid");
      return;
    }
    // console.log(user.first_name);
    // console.log(user.last_name);
    // console.log(user.personal_email);
    // console.log(user.phone_number);
    // console.log(user.role);
    // console.log(user.kibo_team);

    const obj = JSON.parse(sessionStorage.getItem("login"));
    const accessToken = obj.token;

    console.log(accessToken);
    setLoading(true);
    axios({
      method: "post",
      url: "https://kibo-skill-matrix.herokuapp.com/api/updateprofile/",
      headers: {
        Authorization: `Token ${accessToken}`,
      },
      data: user,
    })
      .then((res) => {
        console.log("user data updated");
        console.log("response", res.data);
        toast.success("user data updated");
        setLoading(true);
        history.push("/profile");
      })
      .catch((error) => {
        // console.log({
        //   error,
        //   "error status": error.response.status,
        //   "error response": error.response.data,
        // });
        console.log("error", error);
        if (
          error.response.data.detail === "Token has expired" ||
          error.response.data.detail === "Invalid token"
        ) {
          history.push("/");
          toast.error("Session expired");
        }
      });
  }

  return (
    <div className="jumbotron">
      <NavBar />
      <div className={classes.progress}>
        {loading && <CircularProgress color="primary" />}
      </div>
      {!loading && (
        <UpdatePage
          error={errors}
          user={user}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Update;
