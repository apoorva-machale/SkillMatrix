import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useHistory } from "react-router";
import axios from "../Axios";
import { toast } from "react-toastify";
import Divider from "@material-ui/core/Divider";
import { Alert } from "@material-ui/lab";
import "../Styles.css";

const useStyles = makeStyles((theme) => ({
  buton: {
    marginLeft: "12px",
    marginBottom: "5px",
  },
  root: {
    justifyContent: "center",
    paddingTop: theme.spacing(2),
  },
  alert: {
    justifyContent: "center",
    margin: "10px",
  },
  title: {
    fontSize: 14,
  },
  divider: {
    backgroundColor: "black",
    width: "100%",
    marginTop: "15px",
  },
  pos: {
    marginBottom: 12,
    fontSize: 12,
  },
  button: {
    marginLeft: "80%",
  },
  paper: {
    padding: "12px",
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
  },
}));

const SkillForm = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const options = [
    "ReactNative",
    "React",
    "Node",
    "Mongodb",
    "Python",
    "Django",
    "Angular",
    "Java",
    ".Net",
    "Aws",
    "Hadoop",
    "SQL",
    "Vue",
  ];

  const [primaryinput, setprimaryInput] = useState("");
  const [secondaryinput, setsecondaryInput] = useState("");
  const [primaryskill, setPrimarySkill] = useState({});
  const [secondaryskill, setSecondarySkill] = useState({});

  const {
    skill,
    setSkill,
    setPrimary,
    setSecondary,
    primary_skills,
    secondary_skills,
    activeskill,
    setactiveSkill,
    load,
    setLoad,
  } = props;

  const option = [activeskill.name];

  const [repeat, setRepeat] = useState(false);
  const [valid, setValid] = useState(false);

  function editPrimarySubmit(event) {
    event.preventDefault();
    var object = primary_skills.filter((user) => {
      return user.name !== activeskill.name;
    });
    console.log("object skill edit", object);
    object.push(primaryskill);
    console.log("object skill edit added", object);
    if (primaryskill.name === undefined && primaryskill.rating === undefined) {
      console.log("not valid");
      setValid(true);
    } else {
      setPrimary(object);
      setSkill({
        ...skill,
        primary_skills: object,
        secondary_skills,
      });

      const obj = JSON.parse(sessionStorage.getItem("login"));
      const accessToken = obj.token;
      console.log(accessToken);

      var temp = {
        primary_skills: object,
        secondary_skills,
      };
      console.log("temp", temp);

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
          if (activeskill.primarystatus)
            setactiveSkill({ primarystatus: false });
          else setactiveSkill({ secondarystatus: false });
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
  }
  function editSecondarySubmit(event) {
    event.preventDefault();
    var object = secondary_skills.filter((user) => {
      return user.name !== activeskill.name;
    });
    console.log("object skill edit", object);
    object.push(secondaryskill);
    console.log("object skill edit added", object);
    if (
      secondaryskill.name === undefined &&
      secondaryskill.rating === undefined
    ) {
      console.log("not valid");
      setValid(true);
    } else {
      setSecondary(object);
      setSkill({
        ...skill,
        primary_skills,
        secondary_skills: object,
      });

      const obj = JSON.parse(sessionStorage.getItem("login"));
      const accessToken = obj.token;
      console.log(accessToken);

      var temp = {
        primary_skills,
        secondary_skills: object,
      };
      console.log("temp", temp);

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
          if (activeskill.secondarystatus)
            setactiveSkill({ secondarystatus: false });
          else setactiveSkill({ primarystatus: false });
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
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(primaryskill.name);
    console.log(primaryskill.rating);
    // setSkill(skill);
    // console.log("after setskill");
    // console.log(skill.name);
    // console.log(skill.rating);
    var object1 = primary_skills.filter((user) => {
      return user.name === primaryskill.name;
    });
    var object = secondary_skills.filter((user) => {
      return user.name === primaryskill.name;
    });

    if (primaryskill.name === undefined && primaryskill.rating === undefined) {
      console.log("not valid");
      setValid(true);
    } else if (object.length !== 0 || object1.length !== 0) {
      setRepeat(true);
    } else {
      setRepeat(false);
      setValid(false);
      setPrimary((primary_skills) => [...primary_skills, primaryskill]);
      setSkill({
        ...skill,
        primary_skills: [...primary_skills, primaryskill],
        secondary_skills,
      });

      const obj = JSON.parse(sessionStorage.getItem("login"));
      const accessToken = obj.token;
      console.log(accessToken);

      var temp = {
        primary_skills: [...primary_skills, primaryskill],
        secondary_skills,
      };
      console.log("temp", temp);

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
          if (activeskill.primarystatus)
            setactiveSkill({ primarystatus: false });
          else setactiveSkill({ secondarystatus: false });
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
  }

  function handleeSubmit(event) {
    event.preventDefault();
    console.log("secondary name", secondaryskill.name);
    console.log("secondary rating", secondaryskill.rating);
    // setSkill(skill);
    // console.log("after setskill");
    // console.log(skill.name);
    // console.log(skill.rating);
    var object1 = secondary_skills.filter((user) => {
      return user.name === secondaryskill.name;
    });
    var object = primary_skills.filter((user) => {
      return user.name === secondaryskill.name;
    });
    if (
      secondaryskill.name === undefined &&
      secondaryskill.rating === undefined
    ) {
      console.log("not valid");
      setValid(true);
    } else if (object.length !== 0 || object1.length !== 0) {
      setRepeat(true);
    } else {
      setValid(false);
      setRepeat(false);
      console.log("secondary_skill", secondary_skills, secondaryskill);
      setSecondary((secondary_skills) => [...secondary_skills, secondaryskill]);
      setSkill({
        ...skill,
        primary_skills,
        secondary_skills: [...secondary_skills, secondaryskill],
      });

      const obj = JSON.parse(sessionStorage.getItem("login"));
      const accessToken = obj.token;
      console.log(accessToken);

      var temp = {
        primary_skills,
        secondary_skills: [...secondary_skills, secondaryskill],
      };
      console.log("temp", temp);

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
          if (activeskill.primarystatus)
            setactiveSkill({ primarystatus: false });
          else setactiveSkill({ secondarystatus: false });
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
  }
  useEffect(() => {
    const obj = JSON.parse(sessionStorage.getItem("login"));
    const accessToken = obj ? obj.token : null;
    console.log(accessToken);
    setLoad(true);
    axios({
      method: "get",
      url: "https://kibo-skill-matrix.herokuapp.com/api/getskills/",
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    })
      .then((skill) => {
        console.log("email", skill.data.email);
        console.log("primary skills ", skill.data.primary_skills);
        console.log("secondary skills ", skill.data.secondary_skills);
        setPrimary((primary_skills) => [
          ...primary_skills,
          ...skill.data.primary_skills,
        ]);
        setSecondary((secondary_skills) => [
          ...secondary_skills,
          ...skill.data.secondary_skills,
        ]);
        setLoad(false);
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
  }, []);

  // function Submit(event) {
  //   event.preventDefault();

  //   const obj = JSON.parse(sessionStorage.getItem("login"));
  //   const accessToken = obj.token;
  //   console.log(accessToken);

  //   // setPrimary((primary_skills) => [...primary_skills]);
  //   // setSecondary((secondary_skills) => [...secondary_skills]);
  //   setSkillObject({ ...skillobject, primary_skills, secondary_skills });

  //   var temp = { primary_skills, secondary_skills };
  //   console.log("temp", temp);

  //   axios({
  //     method: "post",
  //     url: "https://kibo-skill-matrix.herokuapp.com/api/updateskills/",
  //     headers: {
  //       Authorization: `Token ${accessToken}`,
  //     },
  //     data: temp,
  //   })
  //     .then((res) => {
  //       console.log("user skills updated");
  //       console.log("response", res.data);
  //       toast.success("Your skills are updated");
  //       if (skiledit.primarystatus) editSkil({ primarystatus: false });
  //       else editSkil({ secondarystatus: false });
  //     })
  //     .catch((error) => {
  //       // console.log({
  //       //   error,
  //       //   "error status": error.response.status,
  //       //   "error response": error.response.data,
  //       // });
  //       console.log("error", error);
  //     });
  // }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container direction="column">
          <form>
            {activeskill.primarystatus || activeskill.secondarystatus ? (
              <Typography color="textPrimary" gutterBottom variant="h5">
                Edit Skills
              </Typography>
            ) : (
              <Typography color="textPrimary" gutterBottom variant="h5">
                Add Skills
              </Typography>
            )}
            <Box component="fieldset" borderColor="transparent" pt={1}>
              {activeskill.primarystatus ? (
                <Autocomplete
                  value={activeskill.name}
                  onChange={(event, newValue) => {
                    setPrimarySkill({ ...primaryskill, name: newValue });
                  }}
                  inputValue={primaryinput}
                  onInputChange={(event, newInputValue) => {
                    setprimaryInput(newInputValue);
                  }}
                  id="controllable-states-primary"
                  options={option}
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="Primary Skills"
                      variant="outlined"
                    />
                  )}
                />
              ) : (
                <Autocomplete
                  value={primaryskill.name}
                  onChange={(event, newValue) => {
                    setPrimarySkill({ ...primaryskill, name: newValue });
                  }}
                  inputValue={primaryinput}
                  onInputChange={(event, newInputValue) => {
                    setprimaryInput(newInputValue);
                  }}
                  id="controllable-states-primary"
                  options={options}
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="Primary Skills"
                      variant="outlined"
                    />
                  )}
                />
              )}
            </Box>
            <Box component="fieldset" borderColor="transparent">
              <Typography component="legend">Primary Skill Rating </Typography>
              <Rating
                required
                name="primary_rating"
                value={primaryskill.rating}
                onChange={(event, newValue) => {
                  setPrimarySkill({ ...primaryskill, rating: newValue });
                }}
              />
            </Box>
            {activeskill.primarystatus ? (
              <Button
                className={classes.buton}
                variant="contained"
                color="primary"
                type="submit"
                onClick={editPrimarySubmit}
              >
                Edit Primary Skill
              </Button>
            ) : (
              <Button
                className={classes.buton}
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSubmit}
              >
                Add Primary Skill
              </Button>
            )}
          </form>
          <Divider className={classes.divider} />
          <form>
            <Box component="fieldset" borderColor="transparent" pt={3}>
              {activeskill.secondarystatus ? (
                <Autocomplete
                  value={activeskill.name}
                  onChange={(event, newValue) => {
                    setSecondarySkill({ ...secondaryskill, name: newValue });
                  }}
                  inputValue={secondaryinput}
                  onInputChange={(event, newInputValue) => {
                    setsecondaryInput(newInputValue);
                  }}
                  id="controllable-states-secondary"
                  options={option}
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="Secondary Skills"
                      variant="outlined"
                    />
                  )}
                />
              ) : (
                <Autocomplete
                  value={secondaryskill.name}
                  onChange={(event, newValue) => {
                    setSecondarySkill({ ...secondaryskill, name: newValue });
                  }}
                  inputValue={secondaryinput}
                  onInputChange={(event, newInputValue) => {
                    setsecondaryInput(newInputValue);
                  }}
                  id="controllable-states-secondary"
                  options={options}
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="Secondary Skills"
                      variant="outlined"
                    />
                  )}
                />
              )}
            </Box>
            <Box component="fieldset" borderColor="transparent">
              <Typography component="legend">Secondary Skill Rating</Typography>
              <Rating
                name="secondary_rating"
                value={secondaryskill.rating}
                onChange={(event, newValue) => {
                  setSecondarySkill({ ...secondaryskill, rating: newValue });
                }}
              />
            </Box>
            {activeskill.secondarystatus ? (
              <Button
                className={classes.buton}
                variant="contained"
                color="primary"
                type="submit"
                onClick={editSecondarySubmit}
              >
                Edit Secondary Skill
              </Button>
            ) : (
              <Button
                className={classes.buton}
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleeSubmit}
              >
                Add Secondary Skill
              </Button>
            )}
          </form>
          {/* <Typography variant="subtitle2">
            Press Update Skills to save changes
          </Typography> */}
          {repeat && (
            <Alert className={classes.alert} severity="warning">
              Skill already added
            </Alert>
          )}
          {valid && (
            <Alert className={classes.alert} severity="warning">
              Skill not properly already
            </Alert>
          )}
          {/* <Box borderColor="transparent">
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              type="submit"
              onClick={Submit}
            >
              Update Skill
            </Button>
          </Box> */}
        </Grid>
      </Paper>
    </div>
  );
};

export default SkillForm;
