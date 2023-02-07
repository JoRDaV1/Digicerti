import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from "./Login"
import SignUpIssuer from "./signupIssuer";
import SignUpuser from "./signupuser";
import Issuerdash from "./IssuerDash";
import Userdash from "./UserDash";
import Coursedash from "./CourseDash";
import PrivateRoutes from './Privateroutes'
import Viewcertificate from "./Viewcertificate";
import About from "./About";
function Routerapp() {
  
  
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route element={<PrivateRoutes/>}>
                <Route element={<Issuerdash/>} path="/issuerdash" exact/>
                <Route element={<Userdash/>} path="/userdash" exact/>
                <Route element={<Coursedash/>} path="/course/:coursename" exact/> 

            </Route>
            <Route element={<About />} path="/about" exact/> 

        <Route  path="/" element = {<Login />}>  </Route>
        <Route  path="/Signupasissuer" element={<SignUpIssuer />} />
        <Route  path="/Signupasuser" element={<SignUpuser />} />
        <Route element={<Viewcertificate/>} path="/certificate/:certificateid" exact/>

          </Routes>
      </Router>
    </div>
  );
}


export default Routerapp;
