import React, { useState, useEffect } from "react";
import ResetPage from "./ResetPage";

const Reset = (props) => {
  // debugger;
  const [errors, setErrors] = useState({});

  const [user, setUser] = useState({
    email: "",
    password: "",
    cpassword: "",
  });

  function formIsValid() {
    const _errors = {};
    const re = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+$/;
    const test = re.test(user.email);
    const res = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const reset = res.test(user.password);
    //console.log(user.fname);

    if (!(user.email && test)) {
      _errors.email = "email  is required";
      console.log("incorect email");
    }
    if (!(user.password && reset)) {
      _errors.password = "password is required";
      console.log("incorect password");
    }
    if (!(user.password === user.cpassword)) {
      _errors.cpassword = "password does not match ";
      console.log("incorect match password");
    }

    setErrors(_errors);
    //form is valid if the errors object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleChange({ target }) {
    // console.log("check target", target.value);
    setUser({
      ...user,
      [target.name]: target.value,
    });
  }
  useEffect(() => {
    console.log(user.email);
    console.log(user.password);
  }, [user]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!formIsValid()) return;
  }

  return (
    <div className="jumbotron">
      <h3>Reset Password</h3>
      <ResetPage
        errors={errors}
        user={user}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Reset;
