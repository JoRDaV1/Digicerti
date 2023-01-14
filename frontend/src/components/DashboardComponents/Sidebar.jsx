import React from "react";
import{ useEffect,useState } from "react";
import Data from "../Data";

const Sidebar = () => {
  const token = localStorage.getItem("token")
  const host = Data.URL;

  const [name, setname] = useState("");

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
              <h5> 10-Courses</h5>
              <h5>55-Students</h5>
            </div>
          </div>
        </li>
        <li className="nav-item mb-2 ">
          <a className="nav-link text-secondary" href="#">
            <i className="fas fa-user font-weight-bold"></i>{" "}
            <span className="ml-3">Students</span>
          </a>
        </li>
        <li className="nav-item mb-2">
          <a
            className="nav-link text-secondary"
            href="#submenu1"
            data-toggle="collapse"
            data-target="#submenu1"
          >
            <i className="far fa-file-word font-weight-bold"></i>{" "}
            <span className="ml-3"> Certifications</span>
          </a>
        </li>

        <li className="nav-item mb-2">
          <a className="nav-link text-secondary" href="#">
            <i className="fas fa-atom font-weight-bold"></i>{" "}
            <span className="ml-3">Settings</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
