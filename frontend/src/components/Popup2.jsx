import React, { useState } from 'react';
import "./Popup2.css";

// {toggle, isOpen }
const Modal = () => {
  const [modalOpen, setModalOpen] = useState(true);

  const handleClose = () => {
    setModalOpen(false);
    // toggle(false);
    // ind = 0;  
  };

  return (
    <>
      {modalOpen && (
        <div style={{ height: "800px" }} className="modal-overlay">
          <div className="modal-content">
            <div className="spinner-border text-primary" role="status">
              <div className="loading-spinner">
                <div className="loading-spinner-bar"></div>
                <div className="loading-spinner-bar"></div>
                <div className="loading-spinner-bar"></div>
              </div>
            </div>
            <p style={{ textAlign: "center", marginTop: "20px", fontSize: "18px" }}>
              Please wait, this may take some time as we are creating a new block and processing the transaction on the blockchain.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
