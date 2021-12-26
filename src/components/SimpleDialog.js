import React from "react";
import { Container, Dialog, DialogTitle } from "@material-ui/core";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  makeStyles,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "inline-block",
  },
}));

const SimpleDialog = (props) => {
  const classes = useStyles();
  console.log("simple dialog");

  const { open, onClose, type, skill, temp } = props;

  function handleClose() {
    onClose(false);
  }
  if (skill) {
    console.log("for name,email :skill");
    console.log("type", type);
    console.log("skill email", skill.email);
    console.log("primary skills", skill.primary_skills);
    console.log("secondary skill", skill.secondary_skills);
  }
  if (temp) {
    console.log("for array : skill");
    console.log("type", type);
    console.log("skill email", temp.email);
    console.log("primary skills", temp.primary_skills);
    console.log("secondary skill", temp.secondary_skills);
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">
        <b>Skills</b>
      </DialogTitle>

      <Container className={classes.wrapper}>
        <Grid container className={classes.root} spacing={1}>
          <Grid item xs={12} sm={6}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">
                    <b>Primary </b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Rating</b>
                  </TableCell>
                </TableRow>
              </TableHead>

              {type ? (
                <TableBody>
                  {temp &&
                    temp.primary_skills.map((row, temp) => (
                      <TableRow key={temp.email}>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.rating}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              ) : (
                <TableBody>
                  {skill &&
                    skill.primary_skills.map((row, skill) => (
                      <TableRow key={skill.email}>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.rating}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              )}
            </Table>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Table aria-label="simple table" align="left">
              <TableHead>
                <TableRow>
                  <TableCell align="right">
                    <b>Secondary </b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Rating</b>
                  </TableCell>
                </TableRow>
              </TableHead>

              {type ? (
                <TableBody>
                  {temp &&
                    temp.secondary_skills.map((row, temp) => (
                      <TableRow key={temp.email}>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.rating}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              ) : (
                <TableBody>
                  {skill &&
                    skill.secondary_skills.map((row, skill) => (
                      <TableRow key={skill.email}>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.rating}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              )}
            </Table>
          </Grid>
        </Grid>
      </Container>
    </Dialog>
  );
};

export default SimpleDialog;
