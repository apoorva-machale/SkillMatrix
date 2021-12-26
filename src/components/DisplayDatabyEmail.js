import React, { useState } from "react";
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

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

const DisplayDatabyEmail = (props) => {
  const classes = useStyles();
  const { user } = props;
  const { data } = user;
  const [loading, setLoading] = useState([]);
  const history = useHistory();
  const [temp, setTemp] = useState({
    primary_skills: [],
    secondary_skills: [],
    email: "",
    type: false,
  });
  const [type, setType] = useState(false);
  const [open, setOpen] = useState(false);
  const [skill, setSkill] = useState({
    primary_skills: [],
    secondary_skills: [],
    email: "",
    type: false,
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  console.log("display data", user.data);
  const isArray = Array.isArray(user.data);

  function handleClickOpen(email) {
    setOpen(true);
    console.log("dialog");
    console.log("email outer", email);
    if (isArray) {
      console.log("blank email search");
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

        setTemp({
          ...temp,
          email: obj.email,
          type: false,
          primary_skills: obj.skills.primary_skills,
          secondary_skills: obj.skills.secondary_skills,
        });
      }
    } else {
      console.log("email search");
      const { skills } = data;
      setSkill({
        ...skill,
        primary_skills: skills.primary_skills,
        secondary_skills: skills.secondary_skills,
        email: user.email,
        type: false,
      });
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

export default DisplayDatabyEmail;
