import { Grid, TextField, Typography, Box } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import MainCard from "ui-component/cards/MainCard";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import axios from "axios";
import { useParams } from "react-router";
import { useEffect } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from 'dayjs';
import Alert from "ui-component/Alert_SnackBar/Alert_SnackBar";



export default function EditAdmin() {


  const [adminData, setAdminData] = React.useState({
    name: "",
    email: "",
    phone_number: "",
    city: "",
    state: "",
    adress: "",
    zip: "",
    country: "",
    profile_image: null,

  });

  // -------------------------------------------------------------------------------------------
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [msg, setMsg] = React.useState('');
  const [msgType, setMsgType] =React.useState('');
  const handleClick = () => {
      setOpenSnackBar(true);
  };
  const handleSnackClose = () => {
      setOpenSnackBar(false);
  };
  // -------------------------------------------------------------------------------------------
  const user = JSON.parse(localStorage.getItem('user'));

  const user_id = user._id;





  useEffect(() => {
    // Fetch user data based on user_id and populate adminData
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}users/${user_id}`)
      .then((response) => {
        const userData = response.data;
        // console.log(response.data)
        setAdminData(userData);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [user_id]);

  // With Image
  // const formSubmit = () => {


  //   const apiData={
  //     name: adminData.name,
  //     email: adminData.email,
  //     phone_number: adminData.phone_number,
  //     country: adminData.country,
  //     zip:adminData.zip,
  //     adress:adminData.adress,
  //     state:adminData.state,
  //     city:adminData.city,
  //   };

  //   axios.patch(process.env.REACT_APP_BACKEND_URL+"users/"+user_id, apiData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   })
  //   .then((response) => {
  //       console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
  //       console.log(response.data)
  //       console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
  //       if (!response.data.error) {
  //         // Update the local storage with the updated data
  //         localStorage.setItem('user',JSON.stringify(response.data))
  //         // console.log("Data Stored");
  //         // const user=JSON.parse(localStorage.getItem('user'));
  //         // console.log(user);
  //         // setMsg(response.data.message);
  //         // setMsgType("success");
  //         // setSubmitted(submitted + 1);
  //       } else {
  //         console.log(response.data.message);
  //         // setMsgType("error");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error updating user data:", error);
  //     });
  // };

  // WithoutImage
  const formSubmit = () => {

    const apiData = {
      name: adminData.name,
      email: adminData.email,
      phone_number: adminData.phone_number,
      country: adminData.country,
      zip: adminData.zip,
      adress: adminData.adress,
      state: adminData.state,
      city: adminData.city,
    };

    axios.patch(process.env.REACT_APP_BACKEND_URL + "users/" + user_id, apiData
    )
      .then(async (response) => {

        if (!response.data.error) {
          // Update the local storage with the updated data
          await localStorage.setItem('user', JSON.stringify(response.data))
          setMsg("Profile Updated Successfully");
          setMsgType('success');
          handleClick();

        } else {
          console.log(response.data.message);
          // setMsgType("error");
          setMsg(response.data.message);
          setMsgType('error');
          handleClick();
        }
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
          setMsg(error.response.data.message);
          setMsgType('error');
          handleClick();
      });
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (

    <MainCard title="Edit Profile">
      <Alert openSnackBar={openSnackBar} handleClose={handleSnackClose} msgType={msgType} msg={msg}/>
      <Typography variant="h4">
        Personal Information:
      </Typography>
      <Grid container sx={{ marginTop: "10px" }}>

        <Grid
          item
          xs={12}
          md={4}
          sx={{ paddingLeft: "10px", paddingRight: "10px", marginTop: "20px" }}
        >
          <TextField
            fullWidth
            id="outlined-basic"
            label="Name"
            variant="outlined"
            name="name"
            onChange={handleChange}
            value={adminData.name}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ paddingLeft: "10px", paddingRight: "10px", marginTop: "20px" }}
        >
          <TextField
            fullWidth
            id="outlined-basic"
            label="Email"
            type={'email'}
            variant="outlined"
            name="email"
            onChange={handleChange}
            value={adminData.email}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ paddingLeft: "10px", paddingRight: "10px", marginTop: "20px" }}
        >
          <TextField
            fullWidth
            id="outlined-basic"
            label="Phone"
            variant="outlined"
            name="phone_number"
            onChange={handleChange}
            value={adminData.phone_number}
          />
        </Grid>
      </Grid>


      <Typography variant="h4" sx={{ marginTop: "20px" }}>
        Address:
      </Typography>
      <Grid container sx={{ marginTop: "0px" }}>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ paddingLeft: "10px", paddingRight: "10px", marginTop: "20px" }}
        >
          <TextField
            fullWidth
            id="outlined-basic"
            label="City"
            variant="outlined"
            name="city"
            onChange={handleChange}
            value={adminData.city}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ paddingLeft: "10px", paddingRight: "10px", marginTop: "20px" }}
        >
          <TextField
            fullWidth
            id="outlined-basic"
            label="State"
            variant="outlined"
            name="state"
            onChange={handleChange}
            value={adminData.state}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ paddingLeft: "10px", paddingRight: "10px", marginTop: "20px" }}
        >
          <TextField
            fullWidth
            // rows={5}
            multiline
            id="outlined-basic"
            label="Adress"
            variant="outlined"
            name="adress"
            onChange={handleChange}
            value={adminData.adress}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ paddingLeft: "10px", paddingRight: "10px", marginTop: "20px" }}
        >
          <TextField
            fullWidth
            id="outlined-basic"
            label="Zip"
            variant="outlined"
            name="zip"
            onChange={handleChange}
            value={adminData.zip}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ paddingLeft: "10px", paddingRight: "10px", marginTop: "20px" }}
        >
          <TextField
            fullWidth
            id="outlined-basic"
            label="Country"
            variant="outlined"
            name="country"
            onChange={handleChange}
            value={adminData.country}
          />
        </Grid>

      </Grid>
      <Typography variant="h4" sx={{ marginTop: "20px" }}>
        Profile Image:
      </Typography>
      <Grid container sx={{ marginTop: "0px" }}>


        <Grid
          item
          xs={12}
          md={4}
          sx={{ paddingRight: "10px", marginTop: "20px", }}
        >
          <FormControl fullWidth>
            {/* <Typography >Choose Profile Image</Typography> */}
            <TextField
              fullWidth
              type={"file"}
              id="outlined-basic"
              name="profile_image"
              variant="outlined"

            />
          </FormControl>
        </Grid>






      </Grid>

      <Box

        //margin
        display="flex"
        justifyContent="center"
        alignItems="center"

      >
        <Button variant="contained" color="primary" sx={{ height: 40, marginTop: '20px' }} onClick={formSubmit}>
          Update Admin
        </Button >
      </Box>




    </MainCard>
  );
}