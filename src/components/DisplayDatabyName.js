import React, { useState, useEffect } from "react";
import TablePagination from "@material-ui/core/TablePagination";
import { toast } from "react-toastify";
import {
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  makeStyles,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import axios from "axios";
import SupervisorAccountRoundedIcon from "@material-ui/icons/SupervisorAccountRounded";
import SimpleDialog from "./SimpleDialog";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({}));

const DisplayDatabyName = (props) => {
  const classes = useStyles();
  const { user } = props;
  const { data } = user;
  const history = useHistory();
  const [type, setType] = useState(false);
  const [open, setOpen] = useState(false);
  const [newadmin, setNew] = useState(false);
  const [accdelete, setDel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  console.log("display data", data);

  const [skil, setSkil] = useState({
    email: "",
    primary_skills: [],
    secondary_skills: [],
    type: false,
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function handleClickOpen(mail) {
    setOpen(true);
    setLoading(true);
    const obj = JSON.parse(sessionStorage.getItem("login"));
    const accessToken = obj ? obj.token : null;
    console.log(accessToken);
    axios({
      method: "get",
      url: "https://kibo-skill-matrix.herokuapp.com/api/dashboard/showuser/",
      headers: {
        Authorization: `Token ${accessToken}`,
      },
      params: { email: mail },
    })
      .then((user) => {
        console.log(user.data);
        setSkil({
          ...skil,
          primary_skills: user.data.skills.primary_skills,
          secondary_skills: user.data.skills.secondary_skills,
          email: user.data.email,
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
  }
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (newadmin === true) {
      toast.success("You created a new  admin");
    }
    //else if (accdelete === true) {
    //   toast.success("You deleted an account");
    // }
  }, [newadmin]);

  const makeAdmin = (mail, e) => {
    e.stopPropagation();
    console.log("mail", mail);
    const obj = JSON.parse(sessionStorage.getItem("login"));
    const accessToken = obj ? obj.token : null;
    console.log(accessToken);
    setLoad(true);
    axios({
      method: "post",
      url: "https://kibo-skill-matrix.herokuapp.com/api/dashboard/addadmin/",
      headers: {
        Authorization: `Token ${accessToken}`,
      },
      data: { email: mail },
    })
      .then((user) => {
        console.log(user.data);
        setNew(true);
        setLoad(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoad(false);
        if (error.request.status === 403) {
          toast.warn("User is already an admin");
        }
        if (
          error.response.data.detail === "Token has expired" ||
          error.response.data.detail === "Invalid token"
        ) {
          history.push("/");
          toast.error("Session expired");
        }
      });
  };

  // const deleteAccount = (mail, e) => {
  //   e.stopPropagation();
  //   console.log("mail", mail);
  //   const obj = JSON.parse(sessionStorage.getItem("login"));
  //   const accessToken = obj ? obj.token : null;
  //   console.log(accessToken);
  //   axios({
  //     method: "post",
  //     url: "https://kibo-skill-matrix.herokuapp.com/api/dashboard/deleteuser/",
  //     headers: {
  //       Authorization: `Token ${accessToken}`,
  //     },
  //     data: { email: mail },
  //   })
  //     .then((user) => {
  //       console.log(user.data);
  //       setNew(true);
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //     });
  // };

  var search;
  if (open) {
    search = (
      <SimpleDialog
        skill={skil}
        type={type}
        open={open}
        onClose={handleClose}
      />
    );
  }
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell align="left">First Name</TableCell>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">Kibo Team</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data &&
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.email}
                    onClick={() => handleClickOpen(row.email)}
                  >
                    <TableCell component="th" scope="row">
                      {row.email}
                    </TableCell>
                    <TableCell align="left">{row.first_name}</TableCell>
                    <TableCell align="left">{row.last_name}</TableCell>
                    <TableCell align="left">{row.kibo_team}</TableCell>
                    <TableCell align="left">
                      <Tooltip title="Make Admin">
                        <IconButton
                          onClick={(e) => makeAdmin(row.email, e)}
                          style={{ paddingBottom: "0px", paddingTop: "0px" }}
                        >
                          <SupervisorAccountRoundedIcon />
                        </IconButton>
                      </Tooltip>
                      {/* <Tooltip title="Delete Account">
                        <IconButton
                          onClick={(e) => deleteAccount(row.email, e)}
                          style={{ paddingBottom: "0px", paddingTop: "0px" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip> */}
                    </TableCell>
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
        </Table>
      </TableContainer>
      {search}
    </div>
  );
};

export default DisplayDatabyName;
