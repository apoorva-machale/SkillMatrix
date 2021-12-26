import React, { useState } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  makeStyles,
  Box,
  Paper,
  Chip,
  Typography,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocumentSkill from "./PdfDocumentSkill";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DisplayData from "./DisplayData";
import { Alert } from "@material-ui/lab";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-flex",
    paddingLeft: "1px",
    marginLeft: "15px",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  progress: {
    display: "flex",
    justifyContent: "center",
    margin: "17px",
  },
  alert: {
    justifyContent: "center",
    margin: "17px",
  },
  buton: {
    width: "49px",
    height: "49px",
  },
}));

const SearchBySkill = (props) => {
  const classes = useStyles();
  const options_type = ["primary", "secondary"];
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
  const options_rate = [
    "1 and above",
    "2 and above",
    "3 and above",
    "4 and above",
    "5",
  ];
  const [loading, setLoading] = useState(false);
  const [show, setHide] = useState(false);
  const history = useHistory();
  const [chipData, setChipData] = useState([]);
  const [skill, setSkill] = useState({
    name: "",
    rating: "",
    type: "",
    data: [],
    skill_data: [],
    isempty: false,
    error: false,
    eror: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("in submit");

    if (chipData.length !== 0) {
      setSkill({ ...skill, error: false, eror: false });
      setLoading(true);
      setHide(false);
      const obj = JSON.parse(sessionStorage.getItem("login"));
      const accessToken = obj ? obj.token : null;
      const array = chipData.map((chip) => {
        console.log("key", chip.key, "chip ", chip.label.split(","));
        return chip.label.split(",");
      });
      console.log("array", array);
      const namearray = array.map((data) => {
        return data[0];
      });
      console.log("name", namearray);
      const name = namearray.join();
      console.log("name", name);

      const ratearray = array.map((data) => {
        return data[1];
      });
      console.log("rate", ratearray);
      const rate = ratearray.join();
      console.log("rate", rate);

      const typearray = array.map((data) => {
        return data[2];
      });
      console.log("type", typearray);
      const type = typearray.join();
      console.log("type", type);

      axios({
        method: "get",
        url:
          "https://kibo-skill-matrix.herokuapp.com/api/dashboard/showskills/",
        headers: {
          Authorization: `Token ${accessToken}`,
        },
        params: {
          name: name,
          rating: rate,
          type: type,
        },
      })
        .then((user) => {
          console.log("multiple skill ", user.data);
          setSkill({
            ...skill,
            data: user.data,
            isempty: false,
            error: false,
          });
          if (user.data.length === 0) setSkill({ isempty: true });

          setLoading(false);
          setHide(true);
        })
        .catch((error) => {
          console.log("error", error);
          // console.log({
          //   error,
          //   "error status": error.response.status,
          //   "error response": error.response.data,
          // });
          setSkill({ ...skill, isempty: true });
          setLoading(false);
          if (
            error.response.data.detail === "Token has expired" ||
            error.response.data.detail === "Invalid token"
          ) {
            history.push("/");
            toast.error("Session expired");
          }
        });
    } else {
      console.log("required");
      setSkill({ ...skill, eror: true });
    }
  };

  const handleAdd = () => {
    console.log("add skill");
    if (skill.name && skill.rating && skill.type) {
      setSkill({ ...skill, error: false, eror: false });
      const key = chipData.length;
      const labelarray = [skill.name, skill.rating[0], skill.type];
      //const labelarray = ["skill.name", "skill.rating", "skill.type"];
      console.log("labelarray", labelarray);
      console.log("key", key);
      const label = labelarray.join();
      console.log("label", label);
      const object = {
        key: key,
        label: label,
      };
      console.log("object", object);

      setChipData((chips) => [...chips, object]);
    } else {
      console.log("required");
      setSkill({ ...skill, error: true });
    }
  };

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };
  return (
    <div>
      <div>
        <div style={{ display: "flex" }}>
          <Autocomplete
            style={{ width: 200, marginLeft: "15px" }}
            onChange={(event, newValue) => {
              setSkill({ ...skill, name: newValue });
            }}
            id="name"
            options={options}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField {...params} label="Skill name" variant="outlined" />
            )}
          />
          {skill.name && skill.rating ? (
            <div style={{ display: "flex" }}>
              <Autocomplete
                value={skill.rating}
                onChange={(event, newValue) => {
                  // const rating = newValue[0];
                  setSkill({ ...skill, rating: newValue });
                }}
                id="rating"
                options={options_rate}
                style={{ width: 200, marginLeft: "15px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Skill rating"
                    variant="outlined"
                  />
                )}
              />
              <Autocomplete
                value={skill.type}
                onChange={(event, newValue) => {
                  setSkill({ ...skill, type: newValue });
                }}
                id="type"
                options={options_type}
                style={{ width: 200, marginLeft: "15px", marginRight: "15px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Skill type"
                    variant="outlined"
                  />
                )}
              />
            </div>
          ) : skill.name ? (
            <div style={{ display: "flex" }}>
              <Autocomplete
                value={skill.rating}
                onChange={(event, newValue) => {
                  // const rating = newValue[0];
                  setSkill({ ...skill, rating: newValue });
                }}
                id="rating"
                options={options_rate}
                style={{ width: 200, marginLeft: "15px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Skill rating"
                    variant="outlined"
                  />
                )}
              />
              <Autocomplete
                disabled
                value={skill.type}
                onChange={(event, newValue) => {
                  setSkill({ ...skill, type: newValue });
                }}
                id="type"
                options={options_type}
                style={{ width: 200, marginLeft: "15px", marginRight: "15px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Skill type"
                    variant="outlined"
                  />
                )}
              />
            </div>
          ) : (
            <div style={{ display: "flex" }}>
              <Autocomplete
                disabled
                value={skill.rating}
                onChange={(event, newValue) => {
                  // const rating = newValue[0];
                  setSkill({ ...skill, rating: newValue });
                }}
                id="rating"
                options={options_rate}
                style={{ width: 200, marginLeft: "15px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Skill rating"
                    variant="outlined"
                  />
                )}
              />
              <Autocomplete
                disabled
                value={skill.type}
                onChange={(event, newValue) => {
                  setSkill({ ...skill, type: newValue });
                }}
                id="type"
                options={options_type}
                style={{ width: 200, marginLeft: "15px", marginRight: "15px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Skill type"
                    variant="outlined"
                  />
                )}
              />
            </div>
          )}
          <Tooltip title="Add Skill" aria-label="add" className={classes.buton}>
            <Fab
              color="primary"
              className={classes.fab}
              type="submit"
              onClick={handleAdd}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </div>
        <Typography
          variant="body2"
          style={{
            marginLeft: "15px",
            marginTop: "10px",
          }}
        >
          *All Fields required
        </Typography>
        <Paper component="ul" className={classes.root}>
          {chipData.map((data) => {
            return (
              <span key={data.key}>
                <Chip
                  label={data.label}
                  onDelete={handleDelete(data)}
                  className={classes.chip}
                />
              </span>
            );
          })}
        </Paper>
        <Box color="primary" mx="auto" mb={1}>
          {skill.error && (
            <Alert severity="error" style={{ padding: "0px " }}>
              All Fields required
            </Alert>
          )}
        </Box>
        <Box color="primary" mx="auto" mb={1}>
          {!chipData.length && skill.eror && (
            <Alert severity="error" style={{ padding: "0px " }}>
              Press Add to add skill
            </Alert>
          )}
        </Box>
        <Box>
          {!loading && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              style={{ marginLeft: "15px" }}
            >
              Search
            </Button>
          )}

          {show && !skill.isempty && !loading && (
            <PDFDownloadLink
              document={<PdfDocumentSkill data={skill.data} />}
              fileName="skilldata.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? (
                  "Loading document..."
                ) : (
                  <Tooltip title="Download pdf">
                    <IconButton>
                      <PictureAsPdfIcon />
                    </IconButton>
                  </Tooltip>
                )
              }
            </PDFDownloadLink>
          )}
        </Box>
      </div>
      <Box pt={2} />
      <DisplayData user={skill} />
      <div className={classes.progress}>
        {loading && <CircularProgress color="primary" />}
      </div>
      {skill.isempty && (
        <Alert className={classes.alert} severity="warning">
          No Result Found
        </Alert>
      )}
    </div>
  );
};

export default SearchBySkill;
