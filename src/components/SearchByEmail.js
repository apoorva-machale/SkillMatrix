import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import DisplayDatabyEmail from "./DisplayDatabyEmail";
import { Alert } from "@material-ui/lab";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocumentEmail from "./PdfDocumentEmail";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  button: {
    paddingBlockStart: theme.spacing(2),
  },
  alert: {
    justifyContent: "center",
    margin: "17px",
  },
  progress: {
    display: "flex",
    justifyContent: "center",
    margin: "17px",
  },
}));

const SearchByEmail = () => {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [show, setHide] = useState(false);
  const [users, setUsers] = useState({
    email: "",
    data: [],
    isempty: false,
  });

  function handleChange({ target }) {
    setUsers({
      ...users,
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
    if (users.email) {
      axios({
        method: "get",
        url: "https://kibo-skill-matrix.herokuapp.com/api/dashboard/showuser/",
        headers: {
          Authorization: `Token ${accessToken}`,
        },
        params: { email: users.email },
      })
        .then((user) => {
          console.log(user.data);
          setUsers({ ...users, data: user.data, isempty: false });
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
          setUsers({ isempty: true });
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
      axios({
        method: "get",
        url: "https://kibo-skill-matrix.herokuapp.com/api/dashboard/showuser/",
        headers: {
          Authorization: `Token ${accessToken}`,
        },
      })
        .then((user) => {
          console.log(user.data);
          const skillpdf = user.data.filter((user) => {
            return Object.keys(user.skills).length !== 0;
          });

          console.log("object", skillpdf);

          setUsers({ ...users, data: skillpdf, isempty: false });
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
          setUsers({ isempty: true });
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

    console.log("loading", loading);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          onChange={handleChange}
          value={users.email}
        />
        <Box pt={2} />
        {!loading && (
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit"
          >
            Search
          </Button>
        )}
        {show && !users.isempty && !loading && (
          <PDFDownloadLink
            document={<PdfDocumentEmail data={users.data} />}
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
        <DisplayDatabyEmail user={users} />
        <div className={classes.progress}>
          {loading && <CircularProgress color="primary" />}
        </div>
        {users.isempty && (
          <Alert className={classes.alert} severity="warning">
            No Result Found
          </Alert>
        )}
      </form>
    </div>
  );
};

export default SearchByEmail;
