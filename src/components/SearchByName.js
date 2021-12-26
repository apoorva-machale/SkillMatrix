import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocument from "./PdfDocument";
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import axios from "axios";
import DisplayDatabyName from "./DisplayDatabyName";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  progress: {
    display: "flex",
    justifyContent: "center",
    margin: "17px",
  },
  alert: {
    justifyContent: "center",
    margin: "17px",
  },
}));

const SearchByName = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [show, setHide] = useState(false);
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    data: [],
    isempty: false,
  });

  function handleChange({ target }) {
    setUser({
      ...user,
      [target.name]: target.value,
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setHide(false);
    const obj = JSON.parse(sessionStorage.getItem("login"));
    const accessToken = obj ? obj.token : null;

    console.log(accessToken);

    axios({
      method: "get",
      url: "https://kibo-skill-matrix.herokuapp.com/api/dashboard/findusers/",
      headers: {
        Authorization: `Token ${accessToken}`,
      },
      params: {
        fname: user.fname,
        lname: user.lname,
      },
    })
      .then((result) => {
        console.log(result.data);

        setUser({
          ...user,
          data: result.data,
          isempty: false,
        });

        console.log("result length ", result.data.length);
        if (result.data.length === 0) {
          setUser({ isempty: true });
        }
        setLoading(false);
        setHide(true);
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
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          id="fname"
          name="fname"
          label="First Name"
          variant="outlined"
          onChange={handleChange}
          value={user.fname}
        />
        <Box pt={2} />
        <TextField
          id="lname"
          name="lname"
          label="Last Name"
          variant="outlined"
          onChange={handleChange}
          value={user.lname}
        />
        <Box pt={2} />
        {!loading && (
          <Button variant="contained" color="primary" type="submit">
            Search
          </Button>
        )}
        {show && !user.isempty && !loading && (
          <PDFDownloadLink
            document={<PdfDocument data={user.data} />}
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

        <Box pt={2} />
        <DisplayDatabyName user={user} />
        <div className={classes.progress}>
          {loading && <CircularProgress color="primary" />}
        </div>
        {user.isempty && (
          <Alert className={classes.alert} severity="warning">
            No Result Found
          </Alert>
        )}
      </form>
    </div>
  );
};

export default SearchByName;
