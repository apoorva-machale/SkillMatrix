import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import SearchByName from "./SearchByName";
import SearchBySkill from "./SearchBySkill";
import SearchByEmail from "./SearchByEmail";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
    paddingTop: theme.spacing(3),
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

const Dashboard = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(" ");

  const handleChange = ({ target }) => {
    setValue(target.value);
  };

  var search;
  if (value === "name") {
    search = <SearchByName />;
  } else if (value === "skill") {
    search = <SearchBySkill />;
  } else if (value === "email") {
    search = <SearchByEmail />;
  }

  return (
    <div className={classes.root}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Dashboard</FormLabel>
        <RadioGroup
          row
          aria-label="search"
          name="search1"
          type="radio"
          spacing={2}
        >
          <FormControlLabel
            value="name"
            control={<Radio onChange={handleChange} />}
            label="Search by Name"
          />
          <FormControlLabel
            value="email"
            control={<Radio onChange={handleChange} />}
            label="Search by Email"
          />
          <FormControlLabel
            value="skill"
            control={<Radio onChange={handleChange} />}
            label="Search by Skill"
          />
        </RadioGroup>
      </FormControl>

      {search}
    </div>
  );
};

export default Dashboard;
