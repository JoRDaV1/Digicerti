import { useEffect, useState } from "react";
import React from "react";
import Formcourse from "../fomCourse"
import "./dashcomp.css"

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
      <div className="row mb-3">
        <div className="col-xl-8 col-sm-6 py-2">
          <div className="text-right card text-white bg-light h-100">
            <div className="card-body">
              <h3 className=" text-center ">Welcome</h3>
              <h5 className=" text-center ">to </h5>
              <h4 className=" text-center ">DigiCerti </h4>
                          </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 py-2" >
        <a href="#Addcourse">

          <div className="text-right card text-white bg-info h-100">
            <div className="card-body">
              <div className="rotate">
                <h6 className="text-center text-uppercase">
                  <i
                    className="text-center fa fa-plus fa-5x"
                    aria-hidden="true"
                  ></i>
                </h6>
              </div > 
              <h6 className="text-center text-uppercase"></h6>
              <h6 className="text-center text-uppercase">Add</h6>
              <h6 className="text-center text-uppercase">Certifications</h6>
            </div>
          </div>
          </a>

        </div>
    
      </div>
      <hr />
    

       <Formcourse/>
      
    </div>
  );
};

export default Dashboard;
