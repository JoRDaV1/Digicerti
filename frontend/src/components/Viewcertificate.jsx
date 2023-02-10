import React, { useState, useEffect } from "react";
import Certificatedash from "./DashboardComponents/certificatedash";
import Navbar from "./DashboardComponents/Navbar";
import Sidebar from "./DashboardComponents/Sidebaruser";
import Footer from "./DashboardComponents/footer";
import Data from "./Data";
import { useParams } from "react-router-dom";

import jsPDF from "jspdf";

function Viewcertificate() {
  const host = Data.URL;

  const [courseArr, setCourseArr] = useState([]);
  var { certificateid } = useParams();
  var imgsrc = "https://ik.imagekit.io/c8sopbrm9/" + certificateid + ".png";

  const href = "whatsapp://send?text=" + host + "/" + certificateid;
  useEffect(() => {
    const loadCertificate = async () => {
      const response = await fetch(`${host}/api/auth/fetchcertificate`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          certificateid: certificateid,
        },
      });
      const completeCourseDetails = await response.json();
      setCourseArr(completeCourseDetails);
    };
    loadCertificate(certificateid);
  }, [courseArr]);

  const generatePDF = () => {
    const imgData = imgsrc; // replace with your base64 encoded image data

    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.internal.pageSize.height = pdf.internal.pageSize.height / 2;

    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);

    pdf.save("certificate.pdf");
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid" id="main">
        <Certificatedash />
        {courseArr.map((output) => (
          <div>
            <div class="jumbotron">
              <div class="container">
                <h1 class="display-3">
                  {output.issuername}{" "}
                  <i class="fa fa-check-circle-o" aria-hidden="true"></i>
                </h1>
                <p>
                  {output.issuername} is the company which is registered under
                  our policy statements
                </p>

                <hr />
                <h2 style={{fontWeight:100, padding:"20px"}}>Course Name : {output.coursename}</h2>
                <button style={{marginLeft:"20px",padding:"20px"}} onClick={generatePDF}>
                  Download PDF{" "}
                  <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                </button>

                <a
                  href={href}
                  style={{ marginTop: "10px" , display:"inline-block", marginLeft:"20px",padding:"20px"}}
                  data-action="share/whatsapp/share"
                >
                  <p>
                    {" "}
                    <i class="fa fa-share-square-o" aria-hidden="true"></i>{" "}
                    SHARE
                  </p>
                </a>

           <div style={{padding:"20px"}}>
           <p style={{fontWeight:200, marginTop:"20px"}}>
                  The course {output.coursename} is succesfully completed by the{" "}
                </p>
                <h1 style={{fontWeight:200}} >
                  {output.StudentName}{" "}
                  <i class="fa fa-external-link" aria-hidden="true"></i>
                </h1>
                <p>
                  <a href="/" class="btn btn-primary btn-lg" role="button">
                    See more &raquo;
                  </a>
                  </p>

           </div>
              </div>
            </div>
          </div>
        ))}
        <Footer />
      </div>
    </div>
  );
}

export default Viewcertificate;
