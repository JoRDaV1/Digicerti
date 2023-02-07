import React, {  useState } from "react";
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
import { useNavigate } from "react-router-dom";
import Data from "./Data";

const theme = createTheme();


function SignUpIssuer() {
  const navigate = useNavigate();

  const [ CN, SetCN ] = useState("")
  const [ ML, SetML ] = useState("")
  const [ MN, SetMN ] = useState("")
  const [ PD, SetPD ] = useState("")

  async function postissuerdetails(e) {
    const host = Data.URL;

    let Userdetails = {
      Companyname: CN,
      Mail : ML,
      Mobilenumber : MN,
      Password : PD,

    }
    console.log(Userdetails)
		e.preventDefault()
 
      const response = await fetch(host + "/api/auth/createissuer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name:CN,
          mobile:MN,
          email: ML,
        password: PD   
        }),
      });
      const json = await response.json();
    console.log(json);
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
          <Typography component="h1" variant="h5">
            Sign up as Issuer
          </Typography>
          <Box component="form" noValidate onSubmit={postissuerdetails}  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Company Name"
                  autoFocus
                  value={CN} onChange={(e) => SetCN(e.target.value)} 
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
                  value={MN} onChange={(e) => SetMN(e.target.value)} 
                //   type="number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  type={showPassword ? "text" : "password"}

                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                  autoComplete="new-password"
                  value={PD} onChange={(e) => SetPD(e.target.value)} 

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
                required
                  control={<Checkbox value="none" color="primary" />}
                  label="Hereby I agree to the terms and conditions of the website"
                />
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

   export default SignUpIssuer;