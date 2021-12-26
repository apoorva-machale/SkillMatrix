import React, { useState } from "react";
import axios from "axios";
import {
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  makeStyles,
  TablePagination,
} from "@material-ui/core";
import SimpleDialog from "./SimpleDialog";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

const DisplayData = (props) => {
  const classes = useStyles();
  const { user } = props;
  const { data } = user;
  const [loading, setLoading] = useState([]);

  const [temp, setTemp] = useState({
    primary_skills: [],
    secondary_skills: [],
    email: "",
    type: false,
  });
  const [type, setType] = useState(false);
  const [open, setOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const history = useHistory();
  const [skill, setSkill] = useState({
    primary_skills: [],
    secondary_skills: [],
    email: "",
    type: false,
  });
  console.log("display data", user.data);
  const isArray = Array.isArray(user.data);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function handleClickOpen(email) {
    setOpen(true);
    console.log("dialog");
    console.log("email outer", email);
    if (isArray) {
      console.log("skill search");
      if (data) {
        console.log("data", data);
        var object = data.filter((user) => {
          return user.email === email;
        });
        console.log("object", object);
        var obj = object.pop();
        console.log("object", object);
        console.log("obj", obj);
        console.log("open in if array ", open);
        setType(true);
        setTemp({
          ...temp,
          email: obj.email,
          type: false,
          primary_skills: obj.primary_skills,
          secondary_skills: obj.secondary_skills,
        });
      }
    } else {
      console.log("email search");
      const { skills } = data;

      setLoading(true);
      const obj = JSON.parse(sessionStorage.getItem("login"));
      const accessToken = obj ? obj.token : null;
      console.log(accessToken);
      if (skills) {
        axios({
          method: "get",
          url:
            "https://kibo-skill-matrix.herokuapp.com/api/dashboard/showuser/",
          headers: {
            Authorization: `Token ${accessToken}`,
          },
          params: { email: email },
        })
          .then((user) => {
            console.log(user.data);
            setSkill({
              ...skill,
              primary_skills: skills.primary_skills,
              secondary_skills: skills.secondary_skills,
              email: user.email,
              type: false,
            });
            setLoading(false);
          })
          .catch((error) => {
            console.log("error", error);
            if (
              error.response.data.detail === "Token has expired" ||
              error.response.data.detail === "Invalid token"
            ) {
              history.push("/");
              toast.error("Session expired");
            }
          });
      } else {
        setSkill({
          ...skill,
          primary_skills: skills.primary_skills,
          secondary_skills: skills.secondary_skills,
          email: user.email,
          type: false,
        });
      }
      if (skills) {
        skills.primary_skills.map((skill) => {
          console.log("name", skill.name);
          console.log("rating", skill.rating);
        });
        skills.secondary_skills.map((skill) => {
          console.log("name", skill.name);
          console.log("rating", skill.rating);
        });
      }
    }
  }

  const handleClose = () => {
    setOpen(false);
  };
  var search;
  if (open) {
    search = (
      <SimpleDialog
        skill={skill}
        temp={temp}
        type={type}
        open={open}
        onClose={handleClose}
      />
    );
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell align="left">First Name</TableCell>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">Kibo Team</TableCell>
            </TableRow>
          </TableHead>
          {isArray ? (
            <TableBody>
              {data &&
                data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row.email}
                      onClick={() => handleClickOpen(row.email)}
                    >
                      <TableCell scope="row">{row.email}</TableCell>
                      <TableCell align="left">{row.first_name}</TableCell>
                      <TableCell align="left">{row.last_name}</TableCell>
                      <TableCell align="left">{row.kibo_team}</TableCell>
                    </TableRow>
                  ))}
              <TablePagination
                count={data.length}
                page={page}
                onChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableBody>
          ) : (
            <TableBody>
              {data ? (
                <TableRow
                  key={data.email}
                  onClick={() => handleClickOpen(data.email)}
                >
                  <TableCell>{data.email}</TableCell>

                  <TableCell align="left">{data.first_name}</TableCell>
                  <TableCell align="left">{data.last_name}</TableCell>
                  <TableCell align="left">{data.kibo_team}</TableCell>
                </TableRow>
              ) : (
                <TableRow></TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {search}
    </div>
  );
};

export default DisplayData;
