import React, { useState } from 'react';
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
           <h5> Plz hold tight while we adding your certificate to blockchain and creating image of the certificate</h5>

          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
