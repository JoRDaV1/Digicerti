import React, { useState,useEffect} from "react";
import {useNavigate,Link  } from 'react-router-dom';
import {ethers} from "ethers";
import { contractAddress, abi } from "./constants.js";
import Data from "./Data";
 

// import "./AddUser.css";
import Popup from "./Popup";
import C1 from '../photos/1.png';
import C2 from '../photos/2.png';
import C3 from '../photos/3.png';
import C4 from '../photos/4.png';
import C5 from '../photos/5.png';
import C6 from '../photos/6.png';
// const ObjectId = require('mongodb').ObjectID;
// const qrcode = require('qrcode-generator');
// const cloudinary = require('cloudinary').v2;
// cloudinary.config({
//   cloud_name: "dkfjb8xsm",
//   api_key: "687961213743838",
//   api_secret: "iTxPxJdfWwCVRZs_6nmo3F4bEG4"
// });
// SDK initialization
const qr = require('qr-image');


var ImageKit = require("imagekit");



// //  using imagekit sdk ref- https://imagekit.io/dashboard/developer/api-keys
var imagekit = new ImageKit({
    publicKey : "public_ka1/kAxhk07Ei8C1sCVfKZyly8s=",
    privateKey : "private_uL/R+P7HQpH28Bcp+FY/Na6/ZgE=",
    urlEndpoint : "https://ik.imagekit.io/c8sopbrm9"
});



function AddCourse(props) {

  const postblock = async (blockdetails,studentarr) => {

    const response = await fetch(
      `${host}/api/auth/blockinfo`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },  
        body: JSON.stringify({blockdetails,studentarr}),
      
      }
    );
    const responseofpostblock = await response.json();
    console.log(responseofpostblock)
  };
  //popup
  const [buttonPopup, setButtonPopup] = useState(false);
  const [value, SetValue] = useState("");
  const coursename = props.name
  // console.log(coursename)
  let navigate = useNavigate();


  async function addToBlock(savedcourse) {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://polygon-mumbai.g.alchemy.com/v2/PU-00iMyzujjZKf0k72eIFJ4a7zCHYUW"
    );
    console.log(Data.pvtkey)
    const signer = new ethers.Wallet(
      Data.pvtkey,
      provider
    );

    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
      const transactionResponse = await contract.addCertificate(
        savedcourse._id,
        savedcourse.StudentName,
        savedcourse.issuername,
        savedcourse.coursename,
        savedcourse.Date
      );
      await listenForTransactionMine(transactionResponse, provider, savedcourse);
    } catch (error) {
      console.log(error);
    }
  }

  function listenForTransactionMine(transactionResponse, provider, savedcourse) {
    console.log(transactionResponse);
    postblock(transactionResponse,savedcourse)
    console.log(`Mining ${transactionResponse.hash}`);

    return new Promise((resolve, revert) => {
      try {
        provider.once(transactionResponse.hash, (transactionReciept) => {
          console.log(`Added to Blockchain`);
        });
        resolve();
      } catch (error) {
        console.log(error);
      }
    });
  }


  const  createCertificate =  async (savedcourse) =>{
    const host = "http://20.219.32.25:3000";

    const s = savedcourse._id;
    const string = `${host}/certificate/${s}`;
    const qr_code = qr.imageSync(string, { type: 'png' });
    const qrsrc = `data:image/png;base64,${qr_code.toString('base64')}`;
    console.log(qrsrc);
    
    
      
    
    var canvas = document.createElement('canvas'); 
    var ctx = canvas.getContext('2d');
    
    var img  = await loadImage(C1);
    
    var pngImage = new Image();
    pngImage.src = img.src;
    // load the PNG image
    
    
    pngImage.onload = function() {
        // draw the PNG image on the canvas
        canvas.width = pngImage.naturalWidth;
        canvas.height = pngImage.naturalHeight ;
        console.log(canvas.width);
        console.log(canvas.height);
        console.log(pngImage.width);
        console.log(pngImage.height);
        ctx.drawImage(pngImage, 0, 0);
        // load the GIF image
        // var dataURL = canvas.toDataURL('image/png');
            
        // console.log(dataURL);
    
        var qrimage = new Image();
        qrimage.src = qrsrc; 
    
        // console.log(qrimage.width);
        // console.log(qrimage.height);
        ctx.font = '48px serif';
        ctx.fillStyle = 'red';
        ctx.fillText(savedcourse.StudentName, 900, 790);
        ctx.fillText(savedcourse.coursename, 900, 1000);
        ctx.fillText(savedcourse.issuername, 900, 1180);
        ctx.fillText(savedcourse.Date, 900, 1320);
    
    
        qrimage.onload =   function() {
            // draw the GIF image on the canvas, on top of the PNG image
            ctx.drawImage(qrimage, 90, 900);
    
            // save the resulting image as a PNG
            var dataURL = canvas.toDataURL('image/png');
            

             imagekit.upload({
              file: dataURL,
              fileName: `${savedcourse._id}.png`,
              useUniqueFileName: false,
              isBase64: true,
              fileType: "image/png"
            },
            
            function(error, result) {
              console.log(error, result);
            }
          );
            
    
        };
    }; 
    
    addToBlock(savedcourse);
  
  }




  //Course Array
  const [studentarr, setstudentarr] = useState([]);

  const host = Data.URL;


  // for fetching the courses for a particular issuer
  const token = localStorage.getItem("token");

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
  // const objid = new ObjectId(); 
// create a canvas element


// var needsrc = "";




function loadImage(url) {
  return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = url; });
}

  // let s ="";
  const addstudents = async ( StudentName, StudentEmail ,Grade, coursename) => {
    const response = await fetch(`${host}/api/auth/addstudents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
          "auth-token":  token
      },
      body: JSON.stringify({ StudentName, StudentEmail ,Grade, coursename }),
    });

    const course =  await response.json();
   
      // s = course._id;
      // console.log(s);


    setstudentarr(studentarr.concat(course));
    createCertificate(course);

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
{/* <img src="https://ik.imagekit.io/c8sopbrm9/63c269ec0ec084e8d2291794.png" alt="logo" className="logo" /> */}

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
              {/* <img src={needsrc}/> */}
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
