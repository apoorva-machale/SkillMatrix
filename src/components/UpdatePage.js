import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { PropTypes } from "prop-types";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
    paddingTop: theme.spacing(4),
  },
  button: {
    paddingBlockStart: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(7),
    margin: "auto",
    maxWidth: 500,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
  },
}));

const UpdatePage = (props) => {
  const classes = useStyles();
  const { error, user } = props;
  var errordisplay;

  if (error.personal_email || error.phone_number) {
    errordisplay = (
      <div>
        <Alert severity="error">Incorrect EmailId or Phone Number</Alert>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <form onSubmit={props.onSubmit}>
        <Paper className={classes.paper} elevation={6}>
          <Grid container spacing={6} direction="column">
            <TextField
              color="secondary"
              id="first_name"
              name="first_name"
              label="First Name"
              onChange={props.onChange}
              value={user.first_name}
              helperText="First name required with more than 3 characters"
            />

            <TextField
              margin="dense"
              color="secondary"
              id="last_name"
              name="last_name"
              label="Last Name"
              onChange={props.onChange}
              value={user.last_name}
              helperText="Last name required with more than 3 characters"
            />
            <TextField
              margin="dense"
              color="secondary"
              required
              id="personal_email"
              name="personal_email"
              label="Personal EmailID"
              onChange={props.onChange}
              value={user.personal_email}
              {...props.error}
              helperText="EmailID should be as abcde@gmail.com"
            />
            <TextField
              margin="dense"
              color="secondary"
              required
              id="phone_number"
              name="phone_number"
              label="Phone Number"
              type="tel"
              onChange={props.onChange}
              value={user.phone_number}
              {...props.error}
              helperText="Enter  phone number as +913454567678"
            />
            <TextField
              margin="dense"
              color="secondary"
              id="role"
              name="role"
              label="Role"
              onChange={props.onChange}
              value={user.role}
              helperText="Your role in your team"
            />
            <TextField
              margin="dense"
              color="secondary"
              id="kibo_team"
              name="kibo_team"
              label="Kibo Team"
              onChange={props.onChange}
              value={user.kibo_team}
              helperText="Your team name"
            />

            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              type="submit"
            >
              Update
            </Button>
            <Box color="primary" mx="auto" pt={2}>
              {errordisplay}
            </Box>
          </Grid>
        </Paper>
      </form>
    </div>
  );
};

UpdatePage.propTypes = {
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
export default UpdatePage;
