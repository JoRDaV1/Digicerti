import React, { useState,useEffect} from "react";
import Navbar from "./DashboardComponents/Navbar";
import Footer from "./DashboardComponents/footer";
import Data from "./Data";
import "./About.css"
import img from "./images/digicerti.png"
import rajat from "./images/rajat.jpeg"
import divanshu from "./images/divanshu.jpeg"
import vishnu from "./images/vishnu.jpeg"
import jay from "./images/jay.jpeg"
function Viewcertificate() {
  const host = Data.URL;

 


  return (
    <div>
      <Navbar />
      
      <div class="about-section">
      <h1 class="titleclass">About Us</h1>
    
  <p class="description">
  Digicerti is a decentralized Academic Cerificate verification platform  
  </p>

  <div class="image-container">
  <img class="imagec" src={img} alt="About us" />

  </div>
  <p class="description">
  A decentralized certificate verification platform is a secure, transparent, and tamper-proof system for verifying and storing credentials and qualifications. It uses blockchain technology to create a decentralized network where all participants can access and verify certificates and qualifications. With this platform, users can store their certificates and qualifications securely and share them with potential employers or academic institutions with confidence. The platform eliminates the need for intermediaries, reduces the risk of fraud, and provides a permanent and verifiable record of an individual's achievements. It offers a transparent, efficient, and accessible system that benefits both certificate holders and organizations seeking to verify credentials. The platform's decentralized nature ensures that certificates and qualifications cannot be altered, tampered with, or lost, providing assurance to employers and academic institutions that the certificates they receive are legitimate and trustworthy.
  </p>


</div>  

<div class="team-section">

  <h1 class="title">Our Team</h1>
  <p class="description" style={{marginLeft:"20%"}}>
  We call ourselves as JORDAV 
  </p>
  <div class="team-members">
    <div class="team-member">
      <img src={jay} alt="Team Member 1" />
      <p class="member-name">Jay Patel</p>
      <p class="member-position">Gujarat</p>
    </div>
    <div class="team-member">
      <img src={rajat}  alt="Team Member 2" />
      <p class="member-name">Rajat Singh</p>
      <p class="member-position">Dehradun</p>
    </div>
    <div class="team-member">
      <img src={divanshu}  alt="Team Member 3" />
      <p class="member-name">Divanshu Prajapat</p>
      <p class="member-position">Rajasthan</p>
    </div>
    <div class="team-member">
      <img src={vishnu} alt="Team Member 4" />
      <p class="member-name">K V Vishnu Swaroop</p>
      <p class="member-position">Andhra Pradesh</p>
    </div>
  </div>
</div>
        
        <Footer />
      </div>
  );
}

export default Viewcertificate;
