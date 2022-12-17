import React from "react";
import Dashboard2 from "./DashboardComponents/Dashboard_Issuer";
import Navbar from "./DashboardComponents/Navbar";
import Sidebar from "./DashboardComponents/Sidebar";
import Footer from "./DashboardComponents/footer";


function UserDash() {
  return (
    <div>
      <Navbar />

      <div className="container-fluid" id="main">
        <div className="row row-offcanvas row-offcanvas-left">
          <Sidebar />
          <Dashboard2 />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default UserDash;
