import React from "react";
import Navbar from "./DashboardComponents/Navbar";
import Sidebar from "./DashboardComponents/Sidebar";
import Footer from "./DashboardComponents/footer";
import Studentdash from "./StudentDash"
import {useParams} from "react-router-dom";
function UserDash() {

  const {coursename} = useParams();
  return (
    <div>


      <Navbar />

      <div className="container-fluid" id="main">
        <div className="row row-offcanvas row-offcanvas-left">

          <Sidebar />
          <Studentdash  name = {coursename}/>

        </div>

        <Footer />
      </div>
    </div>
  );
}

export default UserDash;
