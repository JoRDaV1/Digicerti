import React from "react";
import Dashboard from "./DashboardComponents/Dashboard";
import Navbar from "./DashboardComponents/Navbar";
import Sidebar from "./DashboardComponents/Sidebaruser";
import Footer from "./DashboardComponents/footer";

function UserDash() {
  return (
    <div>
      <Navbar />
      <div className="container-fluid" id="main">
        <div className="row row-offcanvas row-offcanvas-left">
          <Sidebar />
          <Dashboard />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default UserDash;
