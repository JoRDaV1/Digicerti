import React, { useState,useEffect} from "react";
import {useNavigate,Link  } from 'react-router-dom';
// import "./AddUser.css";

import Popup from "./Popup";
import C1 from '../photos/1.png';
import C2 from '../photos/2.png';
import C3 from '../photos/3.png';
import C4 from '../photos/4.png';
import C5 from '../photos/5.png';
import C6 from '../photos/6.png';


function AddCourse(props) {
  //popup
  const [buttonPopup, setButtonPopup] = useState(false);
  const [value, SetValue] = useState("");
  const coursename = props.name
  console.log(coursename)
  let navigate = useNavigate();


  //Course Array
  const [studentarr, setstudentarr] = useState([]);

  const host = "http://localhost:5000";

  // for fetching the courses for a particular issuer
  const token = localStorage.getItem("token")

  useEffect(() => {

    const loadCourse = async (coursename) => {

    const response = await fetch(
      `${host}/api/auth/fetchcourse`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":  token
        },  
        body: JSON.stringify({coursename}),
      
      }
    );
    const completeCourseDetails = await response.json();
    setstudentarr(completeCourseDetails);
  };
   loadCourse(coursename);
}, [studentarr])


  // for fetching the students for a particular course


  // for adding the course data to db

  const addstudents = async ( StudentName, StudentEmail ,Grade, coursename) => {
    const response = await fetch(`${host}/api/auth/addstudents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
          "auth-token":  token
      },
      body: JSON.stringify({ StudentName, StudentEmail ,Grade, coursename }),
    });

    const course = response.json();
    setstudentarr(studentarr.concat(course));
  };
  const [note, setNote] = useState({StudentName:"", StudentEmail:"" ,Grade:""})

    const handleClick = (e)=>{
        e.preventDefault();
        addstudents(note.StudentName, note.StudentEmail, note.Grade, coursename);
        setNote({StudentName:"", StudentEmail:"" ,Grade:"",})
        
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  


  return (
    <div className="wrapper">
      <div className="row justify-content-center">
        <div className="col-lg-7 col-md-6 col-sm-12">
          <h5 className="mt-3 mb-3 text-center">Students details</h5>

          <div className="table-responsive">
        
            <table className="css-serial table table-striped"   >
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
                    <td onClick={() => { navigate(`/certificate/${output._id}/`); }}>
<button> 
  View Certificate
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
       <h4 className="text-center" id="Addcourse">Add Student</h4>

         <div className="form-container">
             <form
            autoComplete="off"
            className="form-group"
   
          >
            <label>StudentName</label>
            <input
              type="text"
              className="form-control"
              name="StudentName" aria-describedby="emailHelp" value={note.StudentName} onChange={onChange} minLength={5} required
            ></input>
            <label>StudentEmail</label>
            <input
              type="text"
              className="form-control"
              name="StudentEmail" aria-describedby="emailHelp" value={note.StudentEmail} onChange={onChange} minLength={5} required
            ></input>
                                  <label>Grade</label>

                       <input
              type="text"
              className="form-control"
              name="Grade" aria-describedby="emailHelp" value={note.Grade} onChange={onChange} minLength={1} required
            ></input>
            <br />
         
            <div className="row">
         
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


// import React, { useState,useEffect, useRef } from "react";
// // import "./AddUser.css";
// import Popup from "./Popup";
// import C1 from '../photos/1.png';
// import C2 from '../photos/2.png';
// import C3 from '../photos/3.png';
// import C4 from '../photos/4.png';
// import C5 from '../photos/5.png';
// import C6 from '../photos/6.png';
// import {useParams} from "react-router-dom";


// function AddStudents() {
//   //popup
//   const {courseID} = useParams();
// console.log(courseID);
//   // for fetching the students for a particular course
//   const [students, setStudents] = useState([]);

//   const [coursename, setCoursename] = useState("")
  
//   const host = "http://localhost:5000";
//   const token = localStorage.getItem("token")

//   useEffect(() => {

// const Studentslist = async () => {
//   // API Call
//   const response = await fetch(`${host}/api/auth/fetchcourse`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       "auth-token":  token
//     },
//           body: JSON.stringify({courseID}),

//   });
//   const newStudents = await response.json(); 
//   setStudents(newStudents)
//   console.log(students)
// }
// Studentslist();
// }, [students])
 
// setCoursename(students.courseName)

//   // for adding the student data to db

//   const addstudents = async (StudentName,StudentEmail,Grade) => {
//     const response = await fetch(`${host}/api/auth/addstudents`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//           "auth-token":  token
//       },
//       body: JSON.stringify({ coursename,StudentName,StudentEmail,Grade}),
//     });

//     const course = response.json();
//     setStudents(students.concat(course));
//   };


//   return (
//     <div className="wrapper">
//       <div className="row justify-content-center">
//         <div className="col-lg-7 col-md-6 col-sm-12">
//           <h5 className="mt-3 mb-3 text-center">Student Details</h5>

//           <div className="table-responsive">
        
//             <table className="css-serial table table-striped"   >
//               <thead className="thead-light">
//                 <tr>
//                 <th>S no</th>
//                   <th>Course name</th>
//                   <th>Instructorname</th>
//                   <th>Certificate type</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {students.map((output) => (
//                   <tr>
//                     <td></td>
//                     <td>{output.coursename}</td>
//                     <td>{output.issuername}</td>
//                     <td>{output.certificatetype}</td>
//                     <td>
//                       <button>View Certificate</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//         </div>
//       </div>
// <br />
// <hr />

//       <div className="main" style={{textalign:"center"}} >
//       <h4 className="text-center" id="Addcourse">Add Student</h4>

//         <div className="form-container">
//           <form
//             autoComplete="off"
//             className="form-group"
   
//           >
//             <label>StudentName</label>
//             <input
//               type="text"
//               className="form-control"
//               name="StudentName" aria-describedby="emailHelp" value={note.StudentName} onChange={onChange} minLength={5} required
//             ></input>
//             <label>StudentEmail</label>
//             <input
//               type="text"
//               className="form-control"
//               name="StudentEmail" aria-describedby="emailHelp" value={note.StudentEmail} onChange={onChange} minLength={5} required
//             ></input>
//                                   <label>Grade</label>

//                        <input
//               type="text"
//               className="form-control"
//               name="Grade" aria-describedby="emailHelp" value={note.Grade} onChange={onChange} minLength={5} required
//             ></input>
//             <br />
         
//             <div className="row">
         
//               <div className="column">
//                 <button type="submit" className="btn btn-secondary"  onClick={handleClick}>
//                   Submit

//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>

//         {/* rendering form  */}
//       </div>
//     </div>
//   );
// }
// export default AddStudents;
          