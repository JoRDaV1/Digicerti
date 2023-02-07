import React, { useState } from 'react';
import "./Popup2.css";

// {toggle, isOpen }
const Modal = () => {
//   const [modalOpen, setModalOpen] = useState(isOpen);
   const [modalOpen, setModalOpen] = useState(true);


  const handleClose = () => {
    setModalOpen(false);
    // toggle(false);
    // ind = 0;  
  };

  return (
    <>
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            {/* {ind===2 && 
            <h5> <button onClick={handleClose}>Close</button>
            <h3>Added Successfully</h3>
            </h5>
          } */}
<div className="spinner-border text-primary" role="status">
<div className="loading-spinner">
      <div className="loading-spinner-bar"></div>
      <div className="loading-spinner-bar"></div>
      <div className="loading-spinner-bar"></div>
    </div>    </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
