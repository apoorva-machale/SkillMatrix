import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Grid, Paper } from "@material-ui/core";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
    paddingTop: theme.spacing(7),
  },
  button: {
    alignContent: "center",
    alignItems: "center",
  },
  section1: {
    margin: theme.spacing(3, 27),
  },
  title: {
    flexGrow: 1,
  },
  textfield: {
    paddingBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(7),
    margin: "auto",
    maxWidth: 500,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
  },
}));

const ResetPage = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <form onSubmit={props.onSubmit}>
        <Paper className={classes.paper} elevation={6}>
          <Grid container spacing={6} direction="column">
            <TextField
              required
              id="email"
              name="email"
              label="Email ID"
              type="email"
              onChange={props.onChange}
              value={props.user.email}
              {...(props.error && {
                error: true,
              })}
              helperText="Enter registered email "
            />

            <TextField
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              className={classes.textfield}
              onChange={props.onChange}
              value={props.user.password}
              {...(props.error && {
                error: true,
              })}
              helperText="Enter new password .Password should contain digit,capital character,specialcharacter and should be more than 8 length"
            />
            <TextField
              required
              id="cpassword"
              name="cpassword"
              label="Confirm Password"
              type="password"
              autoComplete="current-password"
              className={classes.textfield}
              onChange={props.onChange}
              value={props.user.cpassword}
              {...(props.error && {
                error: true,
              })}
              helperText="Confirm password"
            />
            <Box variant="contained" color="primary" mx="auto" pb={1}>
              <Button
                pb={2}
                className={classes.button}
                variant="contained"
                color="primary"
                type="submit"
                href="/profile"
              >
                Reset Password
              </Button>
            </Box>
          </Grid>
        </Paper>
      </form>
    </div>
  );
};
export default ResetPage;
