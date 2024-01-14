import React, { useState } from "react";
import { QrReader } from "react-qr-reader"; // Update import statement
import css from "./Scanner.module.css";
import Html5QrcodePlugin from "../Html5Qrcode/Html5QrcodePlugin";

const Scanner = ({ onScan }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleScanButtonClick = () => {
    if (!isOpen) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // Permission granted, open the scanner
            setIsOpen(true);
          },
          (error) => {
            console.log("Error occurred while getting location:", error);
          }
        );
      } else {
        console.log("Geolocation is not supported");
      }
    }
  };

  const handleCloseButtonClick = () => {
    setIsOpen(false);
  };

  const handleScan = (data) => {
    if (data) {
      // Close the scanner and pass the scanned data to the parent component
      setIsOpen(false);
      onScan(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className={`${css.container} theme-container`}>
      <span className={css.title}>Scanner</span>

      <div className={`${css.cards} grey-container`}>
        {isOpen ? (
          <button onClick={handleCloseButtonClick}>Close QR Scanner</button>
        ) : (
          <button onClick={handleScanButtonClick}>Open QR Scanner</button>
        )}
        {isOpen && (
          <div className={css.qrstyle}>
            <Html5QrcodePlugin
              fps={10}
              qrbox={250}
              disableFlip={false}
              qrCodeSuccessCallback={handleScan}
            />
          </div>
        )}
      </div>

      {/* <StatisticsChart /> */}
    </div>
  );
};

export default Scanner;
