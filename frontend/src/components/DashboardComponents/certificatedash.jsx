import { useEffect, useState } from "react";
import React from "react";
import Formcourse from "../fomCourse";
import Popup from "../Popup";
import { ethers } from "ethers";
import { contractAddress, abi } from "../constants";
import Data from "../Data";

import { useParams } from "react-router-dom";

const Dashboard = () => {
  const popupstyle = {
    margin: "0", fontsize: "32px", fontweight: "700", letterspacing: -"1px",  lineheight: "48px"
  }

  const [clas, setClass] = useState("");

  const customclass1 = "alert alert-success"
  const customclass2 = "alert alert-dangers"


  const host = Data.URL;
  var { certificateid } = useParams();

  useEffect(() => {
    const loadCertificate = async () => {
      const response = await fetch(`${host}/api/auth/fetchthecertificate`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          certificateid: certificateid,
        },
      });
      const course = await response.json();
      console.log(course);
      verifyCertificate(course);

    };
    loadCertificate(certificateid);
  }, []);

  const [response, setResponse] = useState("");

    async function verifyCertificate(savedcourse) {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://eth-goerli.g.alchemy.com/v2/VEw1hpMEy-H73clO7nSPgqNRtQNiiJmQ"
      );
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const id = savedcourse._id;
      const issuedTo = savedcourse.StudentName;
      const issuedBy = savedcourse.issuername;
      const course = savedcourse.coursename;
      const issuedOn = savedcourse.Date;
      console.log(id, issuedTo, issuedBy, course, issuedOn);

      try {
        const transactionResponse = await contract.verifyCertificate(
          id,
          issuedTo,
          issuedBy,
          course,
          issuedOn
        );
        if (transactionResponse) {
          setResponse("Certificate Verified");
          setClass(customclass1)
        }
        else{
          setResponse("Certificate Not Verified");
          setClass(customclass2)
        }
      } catch (error) {
        console.log(error);
      }
    }

  const customstyle = {
    width: "1200px",
    height: "700px",
    marginLeft: "80px",
  };
  const [buttonPopup, setButtonPopup] = useState(false);

  var imgsrc = "https://ik.imagekit.io/c8sopbrm9/" + certificateid + ".png";

  return (
    <div className="col main pt-5 mt-3">
      <p className="lead d-none d-sm-block">
        View & Verify your certificate here{" "}
      </p>
      <div
        className="alert alert-warning fade collapse"
        role="alert"
        id="myAlert"
      >
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
        <div className="col-xl-3 col-sm-6 py-2" style={{ marginTop: "20%" }}>
          <div
            className="text-right card text-black bg-white h-100"
            style={{ padding: "10px" }}
          >
            <h2
              style={{
                textAlign: "center",
                fontSize: "30px",
                marginBottom: "30px",
              }}
            >
              Credential Verification
            </h2>
            <p style={{ textAlign: "center", fontSize: "20px" }}>
              This Certificate now Legitimately belongs to this person{" "}
            </p>
            <p style={{ textAlign: "center", fontSize: "20px" }}>
              {" "}
              Now, Verify the credentials with Blockchain Transaction
            </p>
            <button
              type="button"
              class="btn btn-primary btn-lg"
              onClick={() => setButtonPopup(true)}
            >
              {" "}
              Verify & Validate{" "}
            </button>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup} style={{marginLeft:"10px"}} >
              <div style={{marginRight:"500px"}}>
              <h1 style={popupstyle} >Verifying your Credentials <div style={{marginBottom:"7px"}} className="spinner-grow" role="status">
  <span className="sr-only">Loading...</span>
</div></h1>
<br />
<div class={clas} style={{marginLeft:"350px"}} role="alert">
<h2 style={{marginRight:"150px"}} > {response}</h2></div>
              
              </div>
           
            </Popup>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Dashboard;
