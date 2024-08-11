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

    settransurl("https://www.oklink.com/amoy/tx/" + blockdetails.transhash) ;
    setfromurl("https://www.oklink.com/amoy/address/" + blockdetails.from)  ;
settourl ( "https://www.oklink.com/amoy/address/" + blockdetails.to) ;
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
        "https://rpc.ankr.com/polygon_amoy/937419ceb1788de9512dd589b947d40de3a732b4bd2a22dce9a12eb744e08c20"
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
    width: "80%",
    height: "500px",
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
  <div className="row">
  <div className="col py-2">
    <img style={customstyle} src={imgsrc} alt="Certificate" />
  </div>
  <div className="col py-2"   style={{
          fontSize: "30px",
          maxWidth:"40%",
          maxHeight: "250px",
          marginTop: "150px",

        }}>
    <div
      className="text-center card text-black bg-white h-100"
      style={{ padding: "10px" }}
    >
      <h2
        style={{
          fontSize: "30px",
          marginBottom: "30px",
        }}
      >
        Credential Verification
      </h2>
      <p style={{ fontSize: "20px" }}>
        This Certificate now Legitimately belongs to this person
      </p>
      <p style={{ fontSize: "20px" }}>
        Now, Verify the credentials with Blockchain Transaction
      </p>
      <button
        type="button"
        className="btn btn-primary btn-lg"
        onClick={() => setButtonPopup(true)}
      >
        Verify & Validate
      </button>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup} style={{ marginLeft: "10px" }}>
        <div className="verification-container">
          {response ? (
            <div>
              <h1 className="verification-header" style={{ color: "green" }}>
                Verification Successful
              </h1>
              <img src={success} alt="Success Icon" className="verification-icon" />
              <p className="verification-message">Your account has been successfully verified!</p>
            </div>
          ) : (
            <h1 className="verification-header" style={{ color: "red" }}>
              Verification Failed
            </h1>
          )}
          {blockdetails.map((blockdetail, index) => (
            <div key={index} id="transaction-box">
              <h2>Transaction Details</h2>
              <table id="transaction-table">
                <tbody>
                  <tr>
                    <th>Chain Id</th>
                    <td id="date">{blockdetail.chainId}</td>
                  </tr>
                  <tr>
                    <th>Transaction Hash</th>
                    <td id="date">
                      <a href={transurl} target="_blank" rel="noopener noreferrer">
                        {blockdetail.transhash}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th>From</th>
                    <td id="amount">
                      <a href={fromurl} target="_blank" rel="noopener noreferrer">
                        {blockdetail.from}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th>To</th>
                    <td id="type">
                      <a href={tourl} target="_blank" rel="noopener noreferrer">
                        {blockdetail.to}
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
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
