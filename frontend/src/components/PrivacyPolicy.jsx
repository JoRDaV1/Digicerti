import React from "react";
import Navbar from "./DashboardComponents/Navbar";
import Footer from "./DashboardComponents/footer";

function PrivacyPolicy() {
  return (
    <>
    <Navbar />
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", marginTop : "60px" }}>
      <h1>Privacy Policy</h1>
      <p>Effective Date: August 11, 2024</p>
      
      <p>Your privacy is important to us. This privacy policy explains how DigiCerti collects, uses, and protects your personal information.</p>
      
      <h2>Information We Collect</h2>
      <p>We may collect the following types of information:</p>
      <ul>
        <li><strong>Personal Information:</strong> Name, email address, phone number, etc., when you register or contact us.</li>
        <li><strong>Usage Data:</strong> Information about how you interact with our site, including pages visited, links clicked, etc.</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Provide and improve our services.</li>
        <li>Communicate with you regarding updates, offers, and other relevant information.</li>
        <li>Analyze usage to improve user experience.</li>
      </ul>

      <h2>Sharing Your Information</h2>
      <p>We do not sell or rent your personal information to third parties. We may share your information with trusted partners who assist us in operating our website and conducting our business, as long as those parties agree to keep this information confidential.</p>

      <h2>Your Choices</h2>
      <p>You can choose not to provide personal information, though it may limit your ability to use certain features of our website. You can also opt-out of receiving promotional communications from us by following the unsubscribe instructions in the emails we send.</p>

      <h2>Security</h2>
      <p>We take reasonable precautions to protect your information. However, no method of transmission over the Internet or electronic storage is 100% secure. Therefore, we cannot guarantee absolute security.</p>

      <h2>Changes to This Privacy Policy</h2>
      <p>We may update this privacy policy from time to time. We will notify you of any significant changes by posting the new privacy policy on our website.</p>

      <h2>Contact Us</h2>
      <p>If you have any questions or concerns about this privacy policy, please contact us at: <a href="mailto:privacy@digicerti.com">vswaroop04@gmail.com</a></p>
    </div>
    <Footer />

    </>
  );
}

export default PrivacyPolicy;
