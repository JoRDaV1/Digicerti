import React from "react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#343a40", color: "#ffffff", padding: "20px 0" }}>
      <div className="container text-center">
        <p style={{ margin: "0 0 10px" }}>DigiCerti</p>
        <p style={{ margin: "0 0 10px" }}>
          <a href="/about" style={{ color: "#ffffff", textDecoration: "none" }}>About Us</a> | 
          <a href="/contact" style={{ color: "#ffffff", textDecoration: "none", marginLeft: "10px" }}>Contact</a> | 
          <a href="/privacy-policy" style={{ color: "#ffffff", textDecoration: "none", marginLeft: "10px" }}>Privacy Policy</a>
        </p>
        <p style={{ marginTop: "20px", marginBottom: "0" }}>
          &copy; {year} DigiCerti. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
