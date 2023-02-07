import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios"
import { useNavigate } from "react-router-dom";
import openeye from "./images/openeye.jpg"
import closeeye from "./images/closeeye.jpg"
import Data from "./Data";
const theme = createTheme();


function SignUpUser() {
  
    const navigate = useNavigate();
  const [ FN, SetFN ] = useState("")
  const [ LN, SetLN ] = useState("")
  const [ ML, SetML ] = useState("")
  const [ MN, SetMN ] = useState("")
  const [ PD, SetPD ] = useState("")

  async function postUserDetails(e) {
    const host = Data.URL;

    let Userdetails = {
      Firstname : FN,
      Lastname: LN,
      Mail : ML,
      Mobilenumber : MN,
      Password : PD,

    }
		console.log(Userdetails)
		e.preventDefault()
 
      const response = await fetch(host +"/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname:FN,
          lname:LN,
          mobile:MN,
          email: ML,
        password: PD   
        }),
      });
      const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      
    } else {
      alert("Invalid credentials");
    }
    //save token of user
    localStorage.setItem('auth-token', json.authtoken)
    navigate('/');
    alert("SuccessFully Created Account Please Login", "success")
  }

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography variant="h9" sx={{color:"red"}}>
          </Typography>
          <Typography component="h1" variant="h5">
            Sign up as User
          </Typography>
          <Box component="form" noValidate onSubmit={postUserDetails} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={FN} onChange={(e) => SetFN(e.target.value)} 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={LN} onChange={(e) => SetLN(e.target.value)} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={ML} onChange={(e) => SetML(e.target.value)} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mobile"
                  label="Mobile Number"
                  name="mobile"
                  autoComplete="mobile"
                  minlength={10}
                //   type="number"
                value={MN} onChange={(e) => SetMN(e.target.value)} 

                />
              </Grid>
              <Grid item xs={12}>
           <TextField
                        type={showPassword ? "text" : "password"}

                  required
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                  autoComplete="new-password"
                  value={PD} onChange={(e) => SetPD(e.target.value)} 
                  minlength={5}

                />
                    <a onClick={togglePasswordVisibility}  style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          outline: "none",
          position: "absolute",
          right: "41%",
          top: "47%",


        }}>
   {showPassword ? "Hide" : "Show"} </a>
             
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="none" color="primary" />}
                  label="Hereby I agree to the terms and conditions of the website."
                  required/>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <link href="/issuerdash">
         
            </link>
         
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );

        }

   export default SignUpUser;
