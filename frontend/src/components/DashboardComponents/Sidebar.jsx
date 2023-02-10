import React from "react";
import{ useEffect,useState } from "react";
import Data from "../Data";

const Sidebar = () => {
  const token = localStorage.getItem("token")
  const host = Data.URL;

  const [name, setname] = useState("");
  const [courses, setcourses] = useState("");
  const [students, setstudents] = useState("");



  useEffect(() => {

    const getissuer = async() => {
      const response = await fetch(
        `${host}/api/auth/getissuer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          "auth-token":  token
          },
        }
      );
      const ISSUER = await response.json();
      setname(ISSUER.name);
    }
    getissuer();
    })


    useEffect(() => {

      const noofcourses = async() => {
        const response = await fetch(
          `${host}/api/auth/noofcourses`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            "auth-token":  token            },
          }
        );
        const courses = await response.json();
        setcourses(courses.courses);
        setstudents(courses.students);


      }
      noofcourses();

      },[])

  return (
    <div
      className="col-md-3 col-lg-2 sidebar-offcanvas pl-0"
      id="sidebar"
      role="navigation"
      style={{ backgroundColor: "#e9ecef", fontSize: "125%", }}
   
    >
      <ul className="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
        <li className="nav-item mb-2 mt-3">
          <a className="nav-link text-secondary" href="#">
          <h6 className="text-center"      
>Hi!</h6>
            <h6 className="text-center"      style={{  fontSize: "125%", }}
>{name}</h6>
          </a>
        </li>
        <li>
          <div className="card bg-secondary text-white h-100">
            <div
              className="card-body bg-secondary"
              style={{ backgroundColor: "#E7E7E7" }}
            >
              <h5 style={{fontWeight:"100"}}> {courses} - Courses</h5>
              <h5 style={{fontWeight:"100"}}>{students} - Students</h5>
            </div>
          </div>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;
