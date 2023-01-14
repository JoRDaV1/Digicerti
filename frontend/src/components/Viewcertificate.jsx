import React from "react";
import certificatedash from "./DashboardComponents/certificatedash";
import Navbar from "./DashboardComponents/Navbar";
import Sidebar from "./DashboardComponents/Sidebaruser";
import Footer from "./DashboardComponents/footer";

function Viewcertificate() {
  return (
    <div>
      <Navbar />
      <div className="container-fluid" id="main">
        <div className="row row-offcanvas row-offcanvas-left">
          <Sidebar />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Viewcertificate;
