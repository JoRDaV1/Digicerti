import React from "react";
import Navbar from "./DashboardComponents/Navbar";
import Footer from "./DashboardComponents/footer";

function ContactUs() {
  return (<>
    <Navbar />

    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" , marginTop : "60px",marginBottom : "60px"}}>
      <h1>Contact Us</h1>
      <p>If you have any questions, concerns, or feedback, feel free to reach out to us. We're here to help!</p>
      
      <div style={{ marginBottom: "20px" }}>
        <h3>Email</h3>
        <p>You can email us at: <a href="mailto:vswaroop04@gmail.com">vswaroop04@gmail.com</a></p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Phone</h3>
        <p>Call us at: +91 8247490377</p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Address</h3>
        <p>DigiCerti Inc.<br />123 Certification Lane<br />Tech City, TC 12345<br />USA</p>
      </div>
    </div>
            <Footer />
  </>

  );
}

export default ContactUs;
