import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/MenuList";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logincontext from "../context/logincontext";
import Data from "./Data";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({});


function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    const person = localStorage.getItem("person");
    if(person == "issuer"){
      navigate("/issuerdash");
    
    }
    if(person == "user"){
      navigate("/userdash");
  
    }  

  });

   

  const [credentials, setCredentials] = useState({ email: "", password: "", person:""});

  const PostloginDetails = async (e) => {
    const host = Data.URL;

    e.preventDefault();
    const response = await fetch(
      host + "/api/auth/loginuser",
      {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        person: credentials.person,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      if(credentials.person == "user"){
        localStorage.setItem("person", "user")
        navigate("/userdash");

      }
      if(credentials.person == "issuer"){
        localStorage.setItem("person", "issuer")

        navigate("/issuerdash");

      }

      
    } else {
      alert("Invalid credentials");
    }

  };


  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
  
    <ThemeProvider theme={theme}>
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://i.ibb.co/5KK2wF3/digi.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography variant="h9" sx={{ color: "red" }}></Typography>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={PostloginDetails}
            sx={{ mt: 1 }}
          >

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={onChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChange}
            />
      
                         <label for="dog-names">Choose Either you are User or Issuer : &nbsp;&nbsp;</label>

            <select name="person" onChange={onChange}>
            <option value="user" >------</option>
  <option value="user" >user</option>
<option  value="issuer">issuer</option>

</select>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            Don't have an account?
            <br />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              component={Link}
              to="/Signupasuser"
            >
              Sign Up as a User
            </Button>
            <a href="/Signupasissuer" sx={{ textdecoration: "none" }}>
              <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign Up as a Issuer
              </Button>
            </a>
          </Box>
        </Box>
      </Grid>
    </Grid>
  </ThemeProvider>
  
   
  );
}

export default Login;
