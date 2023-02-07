import React from "react";
import "./spinner.css";

export default function LoadingSpinner() {
  return (
    <div class="loader">
<div className="spinner-border text-primary" role="status">
<div className="loading-spinner">
      <div className="loading-spinner-bar"></div>
      <div className="loading-spinner-bar"></div>
      <div className="loading-spinner-bar"></div>
    </div>    </div>
    </div>
  );
}
