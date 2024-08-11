import React from "react";
import Formcourse from "../fomCourse";
import "./dashcomp.css";

const Dashboard = () => {
  return (
    <div className="col main pt-5 mt-3">
      <p className="footerh1">Course Dashboard</p>
      <div className="alert alert-warning fade collapse" role="alert" id="myAlert">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
          <span className="sr-only">Close</span>
        </button>
        <strong>Data and Records</strong> Learn more about employee
      </div>

      <div className="welcome-card">
        <h3 className="welcome-message">Welcome to DigiCerti</h3>
        <p className="welcome-info">You can manage your certifications and add new courses below.</p>
      </div>

      <hr />

      <Formcourse />
    </div>
  );
};

export default Dashboard;
