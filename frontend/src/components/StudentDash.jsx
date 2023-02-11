import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ethers } from "ethers";
import { contractAddress, abi } from "./constants.js";
import Data from "./Data";
import Papa from "papaparse";
import "./Dash.css";
// import "./AddUser.css";
import Popup2 from "./Popup2";
import C1 from "../photos/1.png";
import C2 from "../photos/2.png";
import C3 from "../photos/3.png";
import C4 from "../photos/4.png";
import C5 from "../photos/5.png";
import C6 from "../photos/6.png";
import { createCertificate,addToBlock } from "./img-block";
const qr = require("qr-image");

var ImageKit = require("imagekit");

// //  using imagekit sdk ref- https://imagekit.io/dashboard/developer/api-keys
var imagekit = new ImageKit({
  publicKey: "public_ka1/kAxhk07Ei8C1sCVfKZyly8s=",
  privateKey: "private_uL/R+P7HQpH28Bcp+FY/Na6/ZgE=",
  urlEndpoint: "https://ik.imagekit.io/c8sopbrm9",
});

function AddCourse(props) {
  //popup
  const [buttonPopup, setButtonPopup] = useState(false);
  const [upload, setUpload] = useState(false);
  const [data, setdata] = useState(0);

  const [value, SetValue] = useState("");
  const coursename = props.name;
  // console.log(coursename)
  let navigate = useNavigate();

  //Course Array
  const [studentarr, setstudentarr] = useState([]);
  const [studentnamearr, setstudentnamearr] = useState([]);

  const [issuernamearr, setissuernamearr] = useState([]);

  const [coursearr, setcoursearr] = useState([]);

  const [datearr, setdatearr] = useState([]);

  const [mongoid, setmongoidarr] = useState([]);


  const host = Data.URL;

  // for fetching the courses for a particular issuer
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadCourse = async (coursename) => {
      const response = await fetch(`${host}/api/auth/fetchcourse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ coursename }),
      });
      const completeCourseDetails = await response.json();
      setstudentarr(completeCourseDetails);
    };
    loadCourse(coursename);
  }, [studentarr]);

  const divideArrays = (arrays) => {
    let subArrays = [];
    for (let i = 0; i < arrays[0].length; i++) {
      let subArray = [];
      for (let j = 0; j < arrays.length; j++) {
        subArray.push(arrays[j][i]);
      }
      subArrays.push(subArray);
    }
  };

  // for fetching the students for a particular course

  // for adding the course data to db
  // const objid = new ObjectId();
  // create a canvas element

  // var needsrc = "";

  // let s ="";
  const addstudents = async (StudentName, StudentEmail, Grade, coursename, type) => {
    const response = await fetch(`${host}/api/auth/addstudents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({ StudentName, StudentEmail, Grade, coursename }),
    });

    const course = await response.json();
    studentnamearr.push(course.StudentName);
    issuernamearr.push(course.issuername);
    coursearr.push(course.coursename);
    datearr.push(course.Date);
    mongoid.push(course._id);
    
    // s = course._id;
    // console.log(s);

    await createCertificate(setButtonPopup, course, studentnamearr , issuernamearr , coursearr , datearr , mongoid, "csv");

    setstudentarr(studentarr.concat(course));
    console.log(buttonPopup);
  };

  const [note, setNote] = useState({
    StudentName: "",
    StudentEmail: "",
    Grade: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addstudents(note.StudentName, note.StudentEmail, note.Grade, coursename);
    setNote({ StudentName: "", StudentEmail: "", Grade: "" });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleFile = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      complete: function(results) {
        setdata(results.data);
        setdata(results.data.length);
    for(let i=1;i<results.data.length;i++){
      if(results.data[i][0] == "" || results.data[i][1] == "" || results.data[i][2] == ""){
        break;
      }
      else{
     addstudents(results.data[i][1],results.data[i][2],results.data[i][3],coursename, "csv");

      }
    }
        console.log(results);
      },
    });
  };

  const handleForm = (event) => {
    event.preventDefault();

    setUpload(false);
  };
  const handleManualForm = (event) => {
    event.preventDefault();

    setUpload(true);
  };
  // setButtonPopup(true);

  return (
    <>
      {!buttonPopup && (
        <div className="wrapper">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-6 col-sm-12">
              <h5 className="mt-3 mb-3 text-center">Students details</h5>

              <div className="table-responsive">
                <table className="css-serial table table-striped">
                  <thead className="thead-light">
                    <tr>
                      <th>S no</th>
                      <th>Student name</th>
                      <th>StudentEmail</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentarr.map((output) => (
                      <tr>
                        {/* here we have render the number of courses  */}
                        <td></td>

                        <td>{output.StudentName}</td>
                        <td>{output.StudentEmail}</td>
                        <td>{output.Grade}</td>
                        <td
                          onClick={() => {
                            navigate(`/certificate/${output._id}/`);
                          }}
                        >
                          <button>View Certificate</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <br />
          <hr />
          <div className="main" style={{ textalign: "center" }}>
            <h4 className="text-center" id="Addcourse">
              Add Student
            </h4>
            <div className="upload" style={{marginLeft:"35%"}}>
              <button className="active" onClick={handleForm}>
                <p> Manual Upload </p>
              </button>

              <button onClick={handleManualForm}>
                <p> Upload by Excel Sheet</p>
              </button>
            </div>

            {/* <img src={needsrc}/> */}
            <div className="form-container">
              {upload ? (
                <form autoComplete="off" className="form-group" style={{textAlign:"center"}}>
                  <label> Please Upload the Excel File </label>
                  <br />
                  <input
                    onChange={handleFile}
                    className="input_perin"
                    name="proof"
                    required={true}
                    type="file"
                  />

                
                </form>
              ) : (
                <form autoComplete="off" className="form-group">
                  <label>StudentName</label>
                  <input
                    type="text"
                    className="form-control"
                    name="StudentName"
                    aria-describedby="emailHelp"
                    value={note.StudentName}
                    onChange={onChange}
                    minLength={5}
                    required
                  ></input>
                  <label>StudentEmail</label>
                  <input
                    type="text"
                    className="form-control"
                    name="StudentEmail"
                    aria-describedby="emailHelp"
                    value={note.StudentEmail}
                    onChange={onChange}
                    minLength={5}
                    required
                  ></input>
                  <label>Grade</label>

                  <input
                    type="text"
                    className="form-control"
                    name="Grade"
                    aria-describedby="emailHelp"
                    value={note.Grade}
                    onChange={onChange}
                    minLength={1}
                    required
                  ></input>
                  <br />

                  <div className="row">
                    <div className="column">
                      <button
                        type="submit"
                        className="btn btn-secondary"
                        onClick={handleClick}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* rendering form  */}
          </div>
        </div>
      )}

      {buttonPopup && <Popup2 />}
    </>
  );
}

export default AddCourse;
