

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { ethers } from "ethers";
import { contractAddress, abi } from "./constants.js";
import Data from "./Data";


import C1 from '../photos/1.png';
import C2 from '../photos/2.png';
import C3 from '../photos/3.png';
import C4 from '../photos/4.png';
import C5 from '../photos/5.png';
import C6 from '../photos/6.png';

const qr = require('qr-image');
let ind = 0;

var ImageKit = require("imagekit");

function loadImage(url) {
    return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = url; });
}
const host = Data.URL;


// //  using imagekit sdk ref- https://imagekit.io/dashboard/developer/api-keys
var imagekit = new ImageKit({
    publicKey: "public_ka1/kAxhk07Ei8C1sCVfKZyly8s=",
    privateKey: "private_uL/R+P7HQpH28Bcp+FY/Na6/ZgE=",
    urlEndpoint: "https://ik.imagekit.io/c8sopbrm9"
});

const postblock = async (blockdetails, studentarr) => {

    const response = await fetch(
        `${host}/api/auth/blockinfo`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ blockdetails, studentarr }),

        }
    );
    const responseofpostblock = await response.json();
    console.log(responseofpostblock)
};

async function addToBlock(setButtonPopup,savedcourse) {
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
        console.log(transactionResponse);
        await listenForTransactionMine(transactionResponse, provider, savedcourse, setButtonPopup );
    } catch (error) {
        console.log(error);
    }
}

async function addToBlockmulti(setButtonPopup, studentnamearr ,savedcourse, issuernamearr , coursearr , datearr , mongoid , type) {
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
        const transactionResponse = await contract.addCertificateForAll(
            mongoid,  studentnamearr , issuernamearr , coursearr , datearr , {gasLimit: 10000000}
        );
        console.log(transactionResponse);
        await listenForTransactionMine(transactionResponse, provider, savedcourse, setButtonPopup   );
    } catch (error) {
        console.log(error);
    }
}


function listenForTransactionMine(transactionResponse, provider, savedcourse, setButtonPopup) {
    console.log(transactionResponse);
    postblock(transactionResponse, savedcourse)
    console.log(`Mining ${transactionResponse.hash}`);

    return new Promise((resolve, revert) => {
        try {
            provider.once(transactionResponse.hash, (transactionReciept) => {
                ind += 1;
                
                console.log(ind,`Added to Blockchain`);
                if(ind===2){
                    setButtonPopup(false);
                    ind=0;
                }

            });
            resolve();
        } catch (error) {
            console.log(error);
        }
    });
}

export const createCertificate = async (setButtonPopup, savedcourse,  studentnamearr , issuernamearr , coursearr , datearr , mongoid, type ) => {
    setButtonPopup(true);
    console.log(type);
    if(type==="csv"){
        await addToBlockmulti(setButtonPopup, studentnamearr ,savedcourse, issuernamearr , coursearr , datearr , mongoid );

    }
    else{

    await addToBlock(setButtonPopup,savedcourse);
    }
// if(1=1){
    const s = savedcourse._id;
    const string = `${host}/certificate/${s}`;
    const qr_code = qr.imageSync(string, { type: 'png' });
    const qrsrc = `data:image/png;base64,${qr_code.toString('base64')}`;
    console.log(qrsrc);




    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    var img = await loadImage(C1);

    var pngImage = new Image();
    pngImage.src = img.src;
    // load the PNG image


    pngImage.onload = function () {
        // draw the PNG image on the canvas
        canvas.width = pngImage.naturalWidth;
        canvas.height = pngImage.naturalHeight;
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
        ctx.font = '40px serif';
        ctx.fillStyle = 'black';
        const onlydate = savedcourse.Date;
        ctx.fillText(savedcourse.StudentName, 900, 790);
        ctx.fillText(savedcourse.coursename, 900, 1000);
        ctx.fillText(savedcourse.issuername, 900, 1180);
        ctx.fillText(onlydate.slice(0,10), 900, 1320);


        qrimage.onload = function () {
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

                async function (error, result) {
                    console.log(error, result);
                    ind += 1;
                    console.log(ind, "image uploaded");
                    if (ind == 2) {
                        setButtonPopup(false);
                        ind=0;
                    }

                }
          );
            
        
    
        };
    }; 

    console.log(ind, "last line");
    if (ind == 2) {
        setButtonPopup(false);
        ind=0;
    }
    

// }

  
  }

export default createCertificate;