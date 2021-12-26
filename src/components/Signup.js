import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { PropTypes } from "prop-types";
import Alert from "@material-ui/lab/Alert";
import "../Styles.css";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    paddingTop: theme.spacing(7),
  },
  button: {
    paddingBlockStart: theme.spacing(2),
  },

  paper: {
    padding: theme.spacing(4),
    margin: "auto",
    maxWidth: 500,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    borderRadius: "2px",
  },
}));

const Signup = (props) => {
  const classes = useStyles();
  const { error } = props;
  var errordisplay;
  if (error.first_name) {
    errordisplay = (
      <div>
        <Alert severity="error">Incorrect First Name</Alert>
      </div>
    );
  }
  if (error.last_name) {
    errordisplay = (
      <div>
        <Alert severity="error">Incorrect Last Name</Alert>
      </div>
    );
  }
  if (error.email) {
    errordisplay = (
      <div>
        <Alert severity="error">Incorrect EmailId</Alert>
      </div>
    );
  }
  if (error.password) {
    errordisplay = (
      <div>
        <Alert severity="error">Incorrect Password</Alert>
      </div>
    );
  }
  if (error.cpassword) {
    errordisplay = (
      <div>
        <Alert severity="error"> Password does not match</Alert>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <form onSubmit={props.onSubmit}>
        <Paper className={classes.paper}>
          <Grid container direction="column">
            <TextField
              color="secondary"
              required
              id="first_name"
              name="first_name"
              label="FirstName"
              onChange={props.onChange}
              value={props.user.fname}
              {...props.error}
              helperText="First name required with more than 3 characters"
            />

            <TextField
              margin="dense"
              color="secondary"
              required
              id="last_name"
              name="last_name"
              label="LastName"
              onChange={props.onChange}
              value={props.user.lname}
              {...props.error}
              helperText="Last name required with more than 3 characters"
            />
            <TextField
              margin="dense"
              color="secondary"
              required
              id="email"
              name="email"
              label="EmailID"
              onChange={props.onChange}
              value={props.user.email}
              {...props.error}
              helperText="EmailID should be as abc@xpanxion.com /@blueconchtech.com /@kibocommerce.com"
            />
            <TextField
              margin="dense"
              color="secondary"
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={props.onChange}
              value={props.user.password}
              {...props.error}
              helperText="Password should contain digit,capital character,special character and should be more than 8 length"
            />
            <TextField
              margin="dense"
              color="secondary"
              required
              visibility="hidden"
              id="cpassword"
              name="cpassword"
              label="Confirm Password"
              type="password"
              autoComplete="current-password"
              onChange={props.onChange}
              value={props.user.cpassword}
              {...props.error}
              helperText="Insert correct password"
            />
            {/* <FormControlLabel
              control={
                <Checkbox
                  id="is_admin"
                  name="is_admin"
                  type="checkbox"
                  checked={props.checked}
                  onChange={props.onChange}
                  color="secondary"
                />
              }
              label="Admin "
            /> */}
            <Box variant="contained" color="primary" mx="auto" pt={3}>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                type="submit"
              >
                Create Account
              </Button>
            </Box>
            <Box color="primary" mx="auto" pt={2}>
              {errordisplay}
            </Box>
          </Grid>
        </Paper>
      </form>
    </div>
  );
};

Signup.propTypes = {
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};
export default Signup;
