import React from "react";
import { useEffect, useState } from "react";
import Data from "../Data";

const Dashboard = () => {

  const host = Data.URL;
  const [courseArr, setCourseArr] = useState([]);

  // for fetching the courses for a particular issuer
  const token = localStorage.getItem("token")
  useEffect(() => {
    const loadCourse = async () => {
    const response = await fetch(
      `${host}/api/auth/fetchallusercertificates`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":  token
        },
      }
    );
    const completeCourseDetails = await response.json();
    setCourseArr(completeCourseDetails);
  };
   loadCourse();
}, [courseArr])



  return (
    <div className="col main pt-5 mt-3">
      <p className="lead d-none d-sm-block">Dashboard</p>
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
      <div className="row mb-2">
      <div className="col-xl-4 ">
   
        </div>
        <div className="col-xl-3 col-sm-6 py-2">
          <div className="card text-white bg-warning h-100">
            <div className="card-body">
              <div className="rotate">
                <h6 className="text-center text-uppercase">
                
                </h6>
              </div>
              <h6 className="text-center text-uppercase"></h6>
              <h6 className="text-center text-uppercase">Welcome!!!     </h6>
              <h6 className="text-center text-uppercase">to    </h6>
              <h6 className="text-center text-uppercase">Digilocker    </h6>

            </div>
          </div>
        </div>
      </div>
      <hr />
     
      <hr />
      <h3 className="sub-header mt-5">Certifications</h3>
      <h3 className="sub-header mt-5"></h3>
      <div className="mb-3">
        
        <div className="card-deck">
        {courseArr.map((output) => (
               <div className="card card-inverse card-success text-center">
               <div className="1card-body">
                 <blockquote className="card-blockquote">
                  <a href={`certificate/${output._id}`}>
                  <img src={`https://ik.imagekit.io/c8sopbrm9/tr:n-ik_ml_thumbnail/${output._id}.png`} alt="1" border="0" style={{width:'450px'}} />

                  </a>
        
                <footer>
                  <cite>
                  <p>Course :  {output.coursename}</p>
          <p>Grade : {output.Grade}</p>
          <p>Instructor: {output.issuername}</p>
                  </cite>

                </footer>
                 </blockquote>
               </div>
             </div>
                ))}
      

        </div>
      </div>
   
      <hr />
    </div>
  );
};

export default Dashboard;
