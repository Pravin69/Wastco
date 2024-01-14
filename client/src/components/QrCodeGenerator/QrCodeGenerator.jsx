import { useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import css from "./QrCode.module.css"

const QRCodeGenerator = ({ data }) => {
  const qrRef = useRef(null);

  useEffect(() => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      // Manipulate the canvas element if needed
  }}, []);

  const downloadQRCode = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      const context = canvas.getContext("2d");
      const imageSize = canvas.width;
      const borderWidth = 10;
      const borderColor = "#fff";
  
      // Create a new canvas with increased size to accommodate the border
      const borderedCanvas = document.createElement("canvas");
      const borderedContext = borderedCanvas.getContext("2d");
      borderedCanvas.width = imageSize + borderWidth * 2;
      borderedCanvas.height = imageSize + borderWidth * 2;
  
      // Draw the border
      borderedContext.fillStyle = borderColor;
      borderedContext.fillRect(0, 0, borderedCanvas.width, borderedCanvas.height);
  
      // Draw the QR code image onto the bordered canvas
      borderedContext.drawImage(
        canvas,
        borderWidth,
        borderWidth,
        imageSize,
        imageSize
      );
  
      // Convert the bordered canvas to data URL and download it
      const image = borderedCanvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="qrcode__container">
      <div className={css.qrcode__wrapper} ref={qrRef}>
        <QRCodeCanvas
          id="qrCode"
          value={data}
          size={105}
          bgColor={"#fff"}
          level={"H"}
        />
      </div>
      {/* <div className={css.durationButton}>
        <button onClick={downloadQRCode}>Download QR</button>
      </div> */}
    </div>
  );
};

export default QRCodeGenerator;
