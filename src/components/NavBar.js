import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useHistory } from "react-router";
import axios from "axios";
import { Tooltip } from "@material-ui/core";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = (props) => {
  const classes = useStyles();
  const history = useHistory();
  // const obj = JSON.parse(sessionStorage.getItem("login"));
  // const accessToken = obj ? obj.token : null;
  // console.log(accessToken);

  // const auth = JSON.parse(sessionStorage.getItem("login"))
  //   ? JSON.parse(sessionStorage.getItem("login")).token
  //   : false;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [auth, setAuth] = useState(false);
  const [is_admin, setAdmin] = useState(false);

  useEffect(() => {
    const temp = JSON.parse(sessionStorage.getItem("login"))
      ? JSON.parse(sessionStorage.getItem("login")).token
      : false;
    setAuth(temp);

    axios({
      method: "get",
      url: "https://kibo-skill-matrix.herokuapp.com/api/getprofile/",
      headers: {
        Authorization: `Token ${temp}`,
      },
    })
      .then((user) => {
        console.log(user.data);
        console.log(user.data.is_admin);
        if (user.data.is_admin === true) setAdmin(true);
      })
      .catch((error) => {
        //console.log("error", error);
        // console.log({
        //   "error status": error.response.status,
        //   "error response": error.response.data,
        // });
        // if (
        //   error.response.data.detail === "Token has expired" ||
        //   error.response.data.detail === "Invalid token"
        // ) {
        //   history.push("/");
        //   toast.error("Session expired");
        // }
      });
  }, []);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  function handleProfile(event) {
    event.preventDefault();

    history.push("/profile");
  }
  function handleSkill() {
    history.push("/skill");
  }
  function handleDashboard() {
    history.push("/dashboard");
  }
  const handleLogout = () => {
    const temp = JSON.parse(sessionStorage.getItem("login"))
      ? JSON.parse(sessionStorage.getItem("login")).token
      : null;

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/logout/",
      headers: {
        Authorization: `Token ${temp}`,
      },
    })
      .then((res) => {
        console.log("user logged out");
        console.log(res.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
    sessionStorage.removeItem("login");
    history.push("/");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography color="inherit" className={classes.title}>
            XPANXION
          </Typography>
          {auth && (
            <div>
              <Tooltip title="Menu">
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                {is_admin ? (
                  <div>
                    <MenuItem onClick={handleProfile}>Profile</MenuItem>
                    <MenuItem onClick={handleSkill}>Skills</MenuItem>
                    <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </div>
                ) : (
                  <div>
                    <MenuItem onClick={handleProfile}>Profile</MenuItem>
                    <MenuItem onClick={handleSkill}>Skills</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </div>
                )}
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default NavBar;
