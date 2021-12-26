import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
    paddingTop: theme.spacing(7),
    display: "flex",
    flexWrap: "wrap",
    justifySelf: "center",
  },

  button: {
    justifyContent: "center",
    paddingTop: "5",
    color: "#536dfe",
  },
  title: {
    fontSize: 14,
  },

  paper: {
    justifyContent: "center",
    padding: theme.spacing(7),
    margin: "auto",
    backgroundColor: "#FFFFFF",
    height: theme.spacing(40),
    width: theme.spacing(50),
  },
}));

const UserProfile = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={8}>
        <Grid>
          <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            variant="h4"
          >
            Your Profile
          </Typography>
          <Typography variant="h5" align="center" component="h2" lineheight="2">
            {props.user.first_name} {props.user.last_name}
          </Typography>
          <Typography
            className={classes.pos}
            align="center"
            color="textSecondary"
          >
            {props.user.email}
          </Typography>
          <br />

          <Typography
            variant="body1"
            component="div"
            align="justify"
            spacing="2"
          >
            <Box lineheight={2} m={1}>
              <span style={{ fontWeight: 600 }}>Phone Number :</span>{" "}
              {props.user.phone_number}
            </Box>
          </Typography>
          <Typography
            variant="body1"
            component="div"
            align="justify"
            spacing="2"
          >
            <Box lineheight={2} m={1}>
              <span style={{ fontWeight: 600 }}>Personal Email :</span>{" "}
              {props.user.personal_email}
            </Box>
          </Typography>

          <Typography variant="body1" component="div" align="justify">
            <Box lineheight={2} m={1}>
              <span style={{ fontWeight: 600 }}>Role :</span> {props.user.role}
            </Box>
          </Typography>

          <Typography variant="body1" component="div" align="justify">
            <Box lineheight={2} m={1}>
              <span style={{ fontWeight: 600 }}>Kibo Team :</span>{" "}
              {props.user.kibo_team}
            </Box>
          </Typography>

          <Box
            variant="contained"
            align="center"
            color="primary"
            mx="auto"
            pt={2}
          >
            <Button
              size="medium"
              variant="contained"
              align="center"
              color="primary"
              href="/update"
            >
              Update
            </Button>
          </Box>
        </Grid>
      </Paper>
    </div>
  );
};
export default UserProfile;
