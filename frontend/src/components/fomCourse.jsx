import React, { useState,useEffect, useRef } from "react";
import {useNavigate,Link  } from 'react-router-dom';
// import "./AddUser.css";
import Popup from "./Popup";
import { env } from 'process';
import C1 from '../photos/1.png';
import C2 from '../photos/2.png';
import C3 from '../photos/3.png';
import C4 from '../photos/4.png';
import C5 from '../photos/5.png';
import C6 from '../photos/6.png';
import Data from "./Data";
function AddCourse() {
  //popup
  const [buttonPopup, setButtonPopup] = useState(false);
  const [value, SetValue] = useState("");

  let navigate = useNavigate();

  const ref = useRef(null)
  const refClose = useRef(null)

  //Course Array
  const [courseArr, setCourseArr] = useState([]);
  const [students, setStudents] = useState([]);
  const rooturl = process.env.REACT_APP_URL_SERVER; 


  const host = Data.URL;
  

  // for fetching the courses for a particular issuer
  const token = localStorage.getItem("token")
  useEffect(() => {
    const loadCourse = async () => {
    const response = await fetch(
      `${host}/api/auth/fetchallissuercertificates`,
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


  // for fetching the students for a particular course


const Studentslist = async (id) => {
  // API Call
  const response = await fetch(`${host}/api/auth/fetchcourse`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "auth-token":  token
    }
  });
  const newStudents = await response.json(); 
  setStudents(newStudents)
  console.log(students)
}
 

  // for adding the course data to db

  const addData = async ( coursename, issuername ,certificatetype) => {
    const response = await fetch(`${host}/api/auth/addcertificate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
          "auth-token":  token
      },
      body: JSON.stringify({ coursename, issuername ,certificatetype}),
    });

    const course = response.json();
    setCourseArr(courseArr.concat(course));
  };
  const [note, setNote] = useState({coursename:"", issuername:"" ,certificatetype:""})

    const handleClick = (e)=>{
        e.preventDefault();
        addData(note.coursename, note.issuername, value);
        setNote({coursename:"", issuername:"" ,certificatetype:""})
        
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  

  return (
    <div className="col main pt-5 mt-3">
      <div className="row justify-content-center">
        <div className="col-lg-7 col-md-6 col-sm-12">
          <h5 className="mt-3 mb-3 text-center">Courses details</h5>

          <div className="table-responsive">
        
            <table className="css-serial table table-striped"   >
              <thead className="thead-light">
                <tr>
                <th>S no</th>
                  <th>Course name</th>
                  <th>Instructorname</th>
                  <th>Certificate type</th>
                </tr>
              </thead>
              <tbody>
                {courseArr.map((output) => (
                  <tr>
                    {/* here we have render the number of courses  */}
                    <td></td>
                   
                    <td>{output.coursename}</td>
                    <td>{output.issuername}</td>
                    <td>{output.certificatetype}</td>
                    <td onClick={() => { navigate(`/course/${output.coursename}/`); }}>
<button> 
  View Course
  </button>                 
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

      <div className="main" style={{textalign:"center"}} >
      <h4 className="text-center" id="Addcourse">Add Course</h4>

        <div className="form-container">
          <form
            autoComplete="off"
            className="form-group"
   
          >
            <label>Course Name</label>

            <input
              type="text"
              className="form-control"
              name="coursename" aria-describedby="emailHelp" value={note.coursename} onChange={onChange} minLength={5} required
            ></input>
            <label>Issuer name</label>
            <input
              type="text"
              className="form-control"
              name="issuername" aria-describedby="emailHelp" value={note.issuername} onChange={onChange} minLength={5} required
            ></input>
                       
            <br />
      <button type="button" class="btn btn-primary" onClick={() => setButtonPopup(true)}> Select Certificate</button>
         
            <div className="row">
              <div className="column">
                <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                  <div>
                    <div className="row">
                      <div
                        className="column"
                        onClick={(e) => SetValue("C1")}
                      >
                        <button
                          className="btn1"
                          onClick={() => setButtonPopup(false)}
                        >
                          <img
                            src="https://i.ibb.co/9Y3FKf7/C1-5.png"
                            alt="C1-2"
                            style={{ width: "100%" }}
                          />
                        </button>
                      </div>
                      <div
                        className="column"
                        onClick={(e) => SetValue("C2")}
                      >
                        <button
                          className="btn1"
                          onClick={() => setButtonPopup(false)}
                        >
                          <img
                            src="https://i.ibb.co/qnfJyTH/C1-2.png"
                            alt="C1-2"
                            style={{ width: "100%" }}
                          />
                        </button>
                      </div>
                      <div
                        className="column"
                        onClick={(e) => SetValue("C3")}
                      >
                        <button
                          className="btn1"
                          onClick={() => setButtonPopup(false)}
                        >
                          <img
                            src="https://i.ibb.co/m66bWHg/C1-3.png"
                            alt="C1-2"
                            style={{ width: "100%" }}
                          />
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div
                        className="column"
                        onClick={(e) => SetValue("C4")}
                      >
                        <button
                          className="btn1"
                          onClick={() => setButtonPopup(false)}
                        >
                          <img
                            src="https://i.ibb.co/zNBtSpx/C1-4.png"
                            alt="C1-2"
                            style={{ width: "100%" }}
                          />
                        </button>
                      </div>
                      <div
                        className="column"
                        onClick={(e) => SetValue("C5")}
                      >
                        <button
                          className="btn1"
                          onClick={() => setButtonPopup(false)}
                        >
                          <img
                            src="https://i.ibb.co/gZDzgbj/Green-and-Gold-Modern-Certificate-of-Completion-1.png"
                            alt="Green-and-Gold-Modern-Certificate-of-Completion"
                            style={{ width: "100%" }}
                          />
                        </button>
                      </div>

                      <div
                        className="column"
                        onClick={(e) => SetValue("C6")}
                      >
                        <button
                          className="btn1"
                          onClick={() => setButtonPopup(false)}
                        >
                          <img
                            src="https://i.ibb.co/yfBmLCq/C1-1.png"
                            alt="C1-3"
                            style={{ width: "100%" }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </Popup>
              </div>
              <div className="column">
                <button type="submit" className="btn btn-secondary"  onClick={handleClick}>
                  Submit

                </button>
              </div>
            </div>
          </form>
        </div>

        {/* rendering form  */}
      </div>
    </div>
  );
}

export default AddCourse;
