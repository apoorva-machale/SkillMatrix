import React, { useEffect, useState } from "react";
import LoginPage from "./LoginPage";
import axios from "../Axios";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router";
import NavBar from "./NavBar";

const useStyles = makeStyles((theme) => ({
  progress: {
    display: "flex",
    justifyContent: "center",
    margin: "17px",
  },
}));

const Login = (props) => {
  const classes = useStyles();
  // const obj = JSON.parse(sessionStorage.getItem("login"));
  // console.log("test", obj);
  // debugger;
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    login: JSON.parse(sessionStorage.getItem("login"))
      ? JSON.parse(sessionStorage.getItem("login")).login
      : false,
    store: "",
    is_admin: false,
    error: false,
  });
  useEffect(() => {
    if (user.login && user.is_admin === true) {
      toast.success("You are logged in as admin");
    } else if (user.login) {
      toast.success("You are logged in ");
    }
  }, [user.login, user.is_admin]);

  function formIsValid() {
    const _errors = {};
    const re = /^[a-zA-Z0-9_.-]+@xpanxion.com$/;
    const re1 = /^[a-zA-Z0-9_.-]+@kibocommerce.com$/;
    const re2 = /^[a-zA-Z0-9_.-]+@blueconchtech.com$/;
    const etest = re.test(user.email);
    const etest1 = re1.test(user.email);
    const etest2 = re2.test(user.email);
    const res = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const reset = res.test(user.password);
    //console.log(user.fname);

    if (!(etest || etest1 || etest2)) {
      _errors.email = "email  incorrect";
      console.log("incorect email");
      console.log("email flag", etest);
    }
    if (!reset) {
      _errors.password = "password is required";
      console.log("incorect password");
    }

    setErrors(_errors);
    //form is valid if the errors object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleChange({ target }) {
    // console.log("check target", target.value);
    setUser({
      ...user,
      error: false,
      [target.name]: target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formIsValid()) return;
    setLoading(true);
    axios
      .post("https://kibo-skill-matrix.herokuapp.com/api/login/", user)
      .then((res) => {
        console.log("user logged in ");
        console.log("response", res.data);
        sessionStorage.setItem(
          "login",
          JSON.stringify({
            login: true,
            token: res.data.token,
          })
        );

        const testLogin = JSON.parse(sessionStorage.getItem("login"));
        console.log("admin ", user.is_admin, res.data.is_admin);
        setUser({
          ...user,
          login: testLogin.login,
          store: testLogin.token,
          is_admin: res.data.is_admin,
        });
        console.log("admin ", user.is_admin, res.data.is_admin);
        console.log("status", user.login);
        if (testLogin.login && res.data.is_admin === true) {
          history.push("/dashboard");
          // toast.success("You are logged in as admin");
        } else if (testLogin.login && res.data.is_admin === false) {
          history.push("/skill");
          // toast.success("You are logged in ");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error", error);
        setLoading(false);
        setUser({ ...user, error: true });
      });
  }

  return (
    <div className="jumbotron">
      <NavBar />
      {/* <div className={classes.progress}>
        {loading && <CircularProgress color="primary" />}
      </div>
      {!loading && ( */}
      <LoginPage
        error={errors}
        user={user}
        loading={loading}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      {/* )} */}
    </div>
  );
};

export default Login;
