import React from "react";
import css from "./Loading.module.css"; // Import CSS for the loading spinner

const LoadingSpinner = () => {
  return (
    <div className={css.spinnerContainer}>
      <div className={css.circleSpinner}></div>
    </div>
  );
};

export default LoadingSpinner;
