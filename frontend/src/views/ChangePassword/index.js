import { Grid, TextField, Typography, Box } from "@mui/material";
import Button from "@mui/material/Button";
import { useState, useRef, useEffect } from "react";

import MainCard from "ui-component/cards/MainCard";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import axios from "axios";
import { useParams } from "react-router";
import Alert from "ui-component/Alert_SnackBar/Alert_SnackBar";
import Swal from "sweetalert2";

export default function ChangePassword() {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleClick = () => {
    setOpenSnackBar(true);
  };
  const handleSnackClose = () => {
    setOpenSnackBar(false);
  };

  const [useId, setUserId] = useState("");
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }));
  };

  useEffect(async () => {
    let a = await JSON.parse(localStorage.getItem("user"));
    setUserId(a._id);
  }, []);

  const formSubmit = () => {
    if (passwords.newPassword === passwords.confirmPassword) {
      axios
        .post(process.env.REACT_APP_BACKEND_URL + "users/changePassword", {
          id: useId,
          old_password: passwords.oldPassword,
          new_password: passwords.newPassword,
        })
        .then((response) => {
          if (!response.data.error) {
            setMsg(response.data.message);
            setMsgType("success");
            handleClick();
          } else {
            setMsg(response.data.message);
            setMsgType("error");
            handleClick();
          }
        });
    } else {
      setMsg("New Password and Old Password Must be Same");
      setMsgType("error");
      handleClick();
    }
  };

  return (
    <Grid container>
      <Alert
        openSnackBar={openSnackBar}
        handleClose={handleSnackClose}
        msgType={msgType}
        msg={msg}
      />
      <Grid item xs={12} md={4}>
        <MainCard title="Change Password">
          <Grid container sx={{ marginTop: "10px" }}>
            <Grid
              item
              xs={12}
              md={12}
              sx={{
                paddingLeft: "10px",
                paddingRight: "10px",
                marginTop: "20px",
              }}
            >
              <TextField
                fullWidth
                id="outlined-basic"
                label="Old Passwrod"
                variant="outlined"
                name="oldPassword"
                onChange={handleChange}
                value={passwords.oldPassword}
              />
            </Grid>
          </Grid>
          <Grid container sx={{ marginTop: "10px" }}>
            <Grid
              item
              xs={12}
              md={12}
              sx={{
                paddingLeft: "10px",
                paddingRight: "10px",
                marginTop: "20px",
              }}
            >
              <TextField
                fullWidth
                id="outlined-basic"
                label="New Passwrod"
                variant="outlined"
                name="newPassword"
                onChange={handleChange}
                value={passwords.newPassword}
              />
            </Grid>
          </Grid>
          <Grid container sx={{ marginTop: "10px" }}>
            <Grid
              item
              xs={12}
              md={12}
              sx={{
                paddingLeft: "10px",
                paddingRight: "10px",
                marginTop: "20px",
              }}
            >
              <TextField
                fullWidth
                id="outlined-basic"
                label="Confirm Password"
                variant="outlined"
                name="confirmPassword"
                onChange={handleChange}
                value={passwords.confirmPassword}
              />
            </Grid>
          </Grid>

          <Box
            //margin
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="contained"
              color="primary"
              sx={{ height: 40, marginTop: "30px" }}
              onClick={formSubmit}
            >
              ChangePassword
            </Button>
          </Box>
        </MainCard>
      </Grid>
    </Grid>
  );
}
