import { useEffect, useState } from "react";
import React from "react";
import Formcourse from "../fomCourse"
import Popup from "../Popup";

import {useParams} from "react-router-dom";

const Dashboard = () => {

  const customstyle = {
    width: "1200px",
    height:"700px",
    marginLeft: "80px",
  };
  const [buttonPopup, setButtonPopup] = useState(false);

  const {certificateid} = useParams();
  var imgsrc = "https://ik.imagekit.io/c8sopbrm9/"+ certificateid +".png";
 
  return (
    <div className="col main pt-5 mt-3">
      <p className="lead d-none d-sm-block">View & Verify your certificate here </p>
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
             <img style={customstyle} src={imgsrc}></img>
        </div>
        <div className="col-xl-3 col-sm-6 py-2"  style={{ marginTop:"20%"}}>

          <div className="text-right card text-black bg-white h-100" style={{"padding":"10px"}}>

            <h2 style={{"textAlign":"center", "fontSize":"30px", "marginBottom":"30px"}}>Credential Verification</h2>
         <p style={{"textAlign":"center", "fontSize":"20px"}}>This Certificate now Legitimately belongs to this person  </p>
         <p style={{"textAlign":"center", "fontSize":"20px"}}> Now, Verify the credentials with Blockchain Transaction</p>
         <button type="button" class="btn btn-primary btn-lg" onClick={() => setButtonPopup(true)}> Verify & Validate </button>
          <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
<h2>Verified Succesfully <i class="fa fa-check-square-o" aria-hidden="true"></i>
</h2> 


            </Popup>
          </div>

        </div>
    
      </div>
      <hr />
    

      
    </div>
  );
};

export default Dashboard;
