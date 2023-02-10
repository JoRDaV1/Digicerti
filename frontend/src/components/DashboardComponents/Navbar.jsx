import React from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  async function postUserDetails(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("person");

    navigate("/");
  }
  return (
    
    <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark mb-3">
      <div className="flex-row d-flex">
        <button
          type="button"
          className="navbar-toggler mr-2 "
          data-toggle="offcanvas"
          title="Toggle responsive left sidebar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <a
          className="navbar-brand"
          href="/"
          title="Free Bootstrap 4 Admin Template"
          style={{
            fontSize: "1.5rem",
          }}
        >
          DigiCerti
        </a>
      </div>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsingNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse collapse" id="collapsingNavbar">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a
              className="nav-link"
              href="/about"
              data-target="#myModal"
              data-toggle="modal"
            >
              About
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" onClick={postUserDetails} href="">
              {" "}
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
