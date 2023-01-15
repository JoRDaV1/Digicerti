import React, { useState, useRef, useEffect } from "react";
import Moment from "moment";
import QRCode from "react-qr-code";

const App = () => {
  const certificateWrapper = useRef(null);
  const host = "http://localhost:3000";

  const Jay=(e)=>{
    e.prevetDeafault();

  };

  const [name, setName] = useState("SSIP");
  const [course, setCourse] = useState("React");
  const date = Moment().format("DD-MM-YYYY");
  const [date1,setDate1] = useState(date);
  const [org, setOrg] = useState("Blockchain Academy");
  const [id, setId] = useState("");



  useEffect(() => {
    const stddetails = async()=>{
      const response = await fetch(`${host}/api//fetchcertificate/:***********(id)`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOnsiaWQiOiI2MzRhOGViMDkwNGNjYmZhMDY4Njc1YTUifSwiaWF0IjoxNjY1ODMwNTk3fQ.fy8ITMv8OUvJk01A8wGn3kbAhG9nhTeLaDQXx9Z0mFY"
        }
      });

      const data  = await response.json();

      setName(data.studentname);
      setCourse(data.coursename);
      setOrg(data.issuername);
      setDate1(data.date);
      setId(data._id);
    }
    
    stddetails();
  }, []);
  

  return (
    <div className="App">

      <div id="downloadWrapper" ref={certificateWrapper}>
        <div id="certificateWrapper">
          <div id="name">
            <p>{name}</p>
          </div>
          <div id="course">
            <p>{course}</p>
          </div>
          <div id="date">
            <p>{date}</p>
          </div>
          <div id="org">
            <p>{org}</p>
          </div>

          <div id="qr">
            <QRCode value={name} size="76" />
          </div>

          <div>
            <img src={`https://ik.imagekit.io/c8sopbrm9/tr:n-ik_ml_thumbnail/${id}.png`} alt="1" border="0"/>
          </div>
        </div>
      </div>
      <br/>
      <hr/>
      <button type="submit" onSubmit={Jay}>Verify Credentials</button>
    </div>
  );
};

export default App;

{
  /* <a href="https://ibb.co/GTWkhYj"><img src="https://i.ibb.co/TL4RCj5/1.png" alt="1" border="0"></a>
<a href="https://ibb.co/n8ymRsH"><img src="https://i.ibb.co/5x342WN/2.png" alt="2" border="0"></a>
<a href="https://ibb.co/xzq7KsF"><img src="https://i.ibb.co/XFxCf4Y/3.png" alt="3" border="0"></a>
<a href="https://ibb.co/02f21gv"><img src="https://i.ibb.co/ZXhXvn7/4.png" alt="4" border="0"></a>
<a href="https://ibb.co/zfpVF1s"><img src="https://i.ibb.co/3h2mvw1/5.png" alt="5" border="0"></a> */
}
