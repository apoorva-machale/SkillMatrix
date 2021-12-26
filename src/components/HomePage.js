import React, { useState } from "react";
import Signup from "./Signup";
import axios from "../Axios";
import { toast } from "react-toastify";
import NavBar from "./NavBar";

const HomePage = (props) => {
  // debugger;
  const [errors, setErrors] = useState({});
  //const [checked, setChecked] = useState(false);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    cpassword: "",
    kibo_team: "",
    role: "",
    personal_email: "",
    phone_number: "",
  });

  function formIsValid() {
    const _errors = {};
    const re = /^[a-zA-Z0-9_.-]+@xpanxion.com$/;
    const re1 = /^[a-zA-Z0-9_.-]+@kibocommerce.com$/;
    const re2 = /^[a-zA-Z0-9_.-]+@blueconchtech.com$/;
    const etest = re.test(user.email);
    const etest1 = re1.test(user.email);
    const etest2 = re2.test(user.email);
    console.log("email flag", etest);
    const res = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    // apoorva98@Xp
    const reset = res.test(user.password);
    //console.log(user.fname);
    if (!(user.first_name.length >= 3)) {
      _errors.first_name = "First name should be more than length 3";
      console.log("incorect fname");
    }
    if (!(user.last_name.length >= 3)) {
      _errors.last_name = "Last name should be more than length 3";
      console.log("incorect lname");
    }
    if (!(etest || etest1 || etest2)) {
      _errors.email = "Incorrect Email ";
      console.log("incorect email");
      console.log("email flag", etest);
    }
    if (!reset) {
      _errors.password = "Incorrect Password";
      console.log("incorect password");
    }
    if (!(user.password === user.cpassword)) {
      _errors.cpassword = "Password does not match";
      console.log("incorect match password");
    }

    setErrors(_errors);
    //form is valid if the errors object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleChange({ target }) {
    // console.log("check target", target.value);
    // console.log(target.checked);
    //const value = target.type === "checkbox" ? target.checked : target.value;
    setUser({
      ...user,
      [target.name]: target.value,
    });

    //console.log("is_Admin ", user.is_admin);
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
    // console.log(user.email);
    // console.log(user.password);
    // console.log(user.cpassword);
    // console.log(user.is_admin);
    axios
      .post("https://kibo-skill-matrix.herokuapp.com/api/signup/", user)
      .then((res) => {
        console.log("user saved");
        console.log("response", res.data);
      })
      .catch((error) => console.log("Error", error));

    props.history.push("/");
    toast.success("user data saved");
  }

  return (
    <div className="jumbotron">
      <NavBar />
      <Signup
        error={errors}
        user={user}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default HomePage;
