import { useEffect, useState } from "react";
import React from "react";
import Formcourse from "../fomCourse";
import Popup from "../Popup";
import { ethers } from "ethers";
import { contractAddress, abi } from "../constants";
import Data from "../Data";
import LoadingSpinner from "./LoadingSpinner"
import { useParams } from "react-router-dom";
import "./verification.css";
import success from "../images/success.jpg";

const Dashboard = () => {
  const [blockdetails, setblockdetails] = useState([]);
  const [transurl, settransurl] = useState("");
  const [fromurl, setfromurl] = useState("");
  const [tourl, settourl] = useState("");

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
      const response = await fetch(`${host}/api/auth/blockinfo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          certificateId: certificateid,
        },
      });
      const course = await response.json();
setblockdetails(course)


    };
    loadCertificate(certificateid);
  }, []);
useEffect(() => {

  blockdetails.map((blockdetails) => {

    settransurl("https://mumbai.polygonscan.com/tx/" + blockdetails.transhash) ;
    setfromurl("https://mumbai.polygonscan.com/address/" + blockdetails.from)  ;
settourl ( "https://mumbai.polygonscan.com/address/" + blockdetails.to) ;
  })

}, [blockdetails])
 



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

  const [response, setResponse] = useState(false);

    async function verifyCertificate(savedcourse) {

      const provider = new ethers.providers.JsonRpcProvider(
        "https://polygon-mumbai.g.alchemy.com/v2/PU-00iMyzujjZKf0k72eIFJ4a7zCHYUW"
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
          setResponse(true);
          setClass(customclass1)
          
        }
        else{
          setResponse(false);
          setClass(false)
        }
      } catch (error) {
        console.log(error);
      }
    }

  const customstyle = {
    width: "90%",
    height: "700px",
    marginLeft: "80px",
  };
  const [buttonPopup, setButtonPopup] = useState(false);

  var imgsrc = "https://ik.imagekit.io/c8sopbrm9/" + certificateid + ".png";

  return (  <div className="col main pt-5 mt-3">
      <p className="footerh1">
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
    <div className="col-xl-3 col-sm-6 py-2" style={{ marginTop: "20%" , height: "50%", width:"  "}}>
      <div
        className="text-right card text-black bg-white h-100"
        style={{ padding: "10px" }}
      >
        {/* add a line break */}
        {/* <br /> */}
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
        <div class="verification-container">
    {response ? <div><h1 class="verification-header" style={{color:"green"}}>Verification Successful</h1> <img src={success} alt="Success Icon" class="verification-icon"/>   <p class="verification-message">Your account has been successfully verified!</p>
</div> : <h1 style={{color:"red"}} class="verification-header">Verification Failed</h1>}
    
</div>
{blockdetails.map((blockdetail) => (
  <div id="transaction-box">
  <h2>Transaction Details</h2>
  <table id="transaction-table">
  <tr>
      <th>Chain Id</th>
      <td id="date">{blockdetail.chainId}</td>
    </tr>
    <tr>
    <th>Transaction Hash</th>

      <a href={transurl} target="_blank">
      <td id="date">{blockdetail.transhash}</td>
      </a>
      
    </tr>
    <tr>
      <th>from</th>
      <a href={fromurl} target="_blank">
      <td id="amount">{blockdetail.from}</td>

      </a>
    </tr>
    <tr>
      <th>to</th>
      <a href={tourl} target="_blank">
      <td id="type">{blockdetail.to}</td>

      </a>
    </tr>
  </table>
</div>

  ))}

        </Popup>
      </div>
    </div>
  </div>
  <hr />
</div>
 
  );
};

export default Dashboard;
