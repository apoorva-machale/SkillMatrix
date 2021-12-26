import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SkillForm from "./SkillForm";
import axios from "axios";
import NavBar from "./NavBar";
import { toast } from "react-toastify";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Tooltip,
} from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  progress: {
    display: "flex",
    justifyContent: "center",
    margin: "7px",
  },
  root: {
    justifyContent: "center",
    paddingTop: theme.spacing(2),
    height: "97.5%",
  },
  card: {
    paddingTop: "0px",
    justifyContent: "center",
    height: "100%",
  },
  table: {
    border: "1px solid black",
    borderCollapse: "separate",
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  grid: {
    paddingLeft: "16px",
    paddingRight: "16px",
  },
}));

const Skill = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [skill, setSkill] = useState({});
  const [primary_skills, setPrimary] = useState([]);
  const [secondary_skills, setSecondary] = useState([]);
  const [loading, setLoading] = useState([]);
  const [load, setLoad] = useState([]);
  const [activeskill, setactiveSkill] = useState({
    name: "",
    rating: 0,
    primarystatus: false,
    secondarystatus: false,
  });

  const editSkill = (name, rating) => {
    var object = primary_skills.filter((user) => {
      return user.name === name;
    });
    var object1 = secondary_skills.filter((user) => {
      return user.name === name;
    });
    console.log("object", object);
    console.log("object1", object1);
    if (object.length !== 0) {
      setactiveSkill({ name: name, rating: rating, primarystatus: true });
    } else {
      setactiveSkill({ name: name, rating: rating, secondarystatus: true });
    }
  };

  function deleteSkill(name) {
    var object = primary_skills.filter((user) => {
      return user.name !== name;
    });
    var object1 = secondary_skills.filter((user) => {
      return user.name !== name;
    });
    console.log("object", object);
    console.log("object1", object1);

    const obj = JSON.parse(sessionStorage.getItem("login"));
    const accessToken = obj.token;
    console.log(accessToken);

    setPrimary(object);
    setSecondary(object1);

    var temp = { primary_skills: object, secondary_skills: object1 };
    axios({
      method: "post",
      url: "https://kibo-skill-matrix.herokuapp.com/api/updateskills/",
      headers: {
        Authorization: `Token ${accessToken}`,
      },
      data: temp,
    })
      .then((res) => {
        console.log("user skills updated");
        console.log("response", res.data);
        toast.success("Your skills are updated");
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

  useEffect(() => {
    const obj = JSON.parse(sessionStorage.getItem("login"));
    const accessToken = obj ? obj.token : null;
    console.log(accessToken);
    setLoading(true);

    axios({
      method: "get",
      url: "https://kibo-skill-matrix.herokuapp.com/api/getskills/",
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    })
      .then((skill) => {
        console.log("email", skill.data.email);
        //const email = skill.data.email;
        setSkill(skill.data);
        console.log("primary skills", skill.data.primary_skills);
        console.log("secondary skills", skill.data.secondary_skills);
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

  return (
    <div>
      <NavBar />
      <div className={classes.progress}>
        {loading && <CircularProgress color="primary" />}
      </div>
      {!loading && (
        <Grid container className={classes.root} spacing={1}>
          <Grid item xs={12} sm={6}>
            <div className={classes.root}>
              <Card className={classes.card} elevation={8}>
                <CardContent>
                  <Typography color="textPrimary" gutterBottom variant="h5">
                    Your Skills
                  </Typography>
                  {loading && <CircularProgress color="primary" />}

                  <Typography color="textSecondary" variant="body2">
                    {skill.email}
                  </Typography>

                  <Grid container className={classes.root} spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <Table
                        aria-label="simple table"
                        align="left"
                        className={classes.table}
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">
                              <b>Primary </b>
                            </TableCell>
                            <TableCell align="left">
                              <b>Rating</b>
                            </TableCell>
                            <TableCell align="left"></TableCell>
                          </TableRow>
                        </TableHead>

                        {load && (
                          <Typography variant="body2">Loading...</Typography>
                        )}

                        {!load && (
                          <TableBody>
                            {primary_skills &&
                              primary_skills.map((value, skill) => (
                                <TableRow>
                                  <TableCell align="left">
                                    {value.name}
                                  </TableCell>
                                  <TableCell align="left">
                                    {value.rating}
                                  </TableCell>
                                  <TableCell align="left">
                                    <Tooltip title="Edit">
                                      <IconButton
                                        aria-label="edit"
                                        onClick={() =>
                                          editSkill(value.name, value.rating)
                                        }
                                      >
                                        <EditIcon />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                      <IconButton
                                        aria-label="delete"
                                        onClick={() => deleteSkill(value.name)}
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    </Tooltip>
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        )}
                      </Table>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Table
                        aria-label="simple table"
                        align="left"
                        className={classes.table}
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">
                              <b>Secondary </b>
                            </TableCell>
                            <TableCell align="left">
                              <b>Rating</b>
                            </TableCell>
                            <TableCell align="left"></TableCell>
                          </TableRow>
                        </TableHead>

                        {load && (
                          <Typography variant="body2">Loading...</Typography>
                        )}

                        {!load && (
                          <TableBody>
                            {secondary_skills &&
                              secondary_skills.map((value, skill) => (
                                <TableRow>
                                  <TableCell align="left">
                                    {value.name}
                                  </TableCell>
                                  <TableCell align="left">
                                    {value.rating}
                                  </TableCell>
                                  <TableCell align="left">
                                    <Tooltip title="Edit">
                                      <IconButton
                                        aria-label="edit"
                                        onClick={() => editSkill(value.name)}
                                      >
                                        <EditIcon />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                      <IconButton
                                        aria-label="delete"
                                        onClick={() => deleteSkill(value.name)}
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    </Tooltip>
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        )}
                      </Table>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.grid}>
            <SkillForm
              skill={skill}
              setSkill={setSkill}
              setSecondary={setSecondary}
              load={load}
              setLoad={setLoad}
              setPrimary={setPrimary}
              primary_skills={primary_skills}
              secondary_skills={secondary_skills}
              activeskill={activeskill}
              setactiveSkill={setactiveSkill}
            />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Skill;
