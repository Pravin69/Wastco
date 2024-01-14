import React, { useEffect, useRef, useState } from "react";
import css from "./PopUpShop.module.css";
import moment from "moment";
import { IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import convertToBase64 from "../../components/convert";
import QRCodeGenerator from "../QrCodeGenerator/QrCodeGenerator";
import { registerShopOwner } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux"; // Import the useDispatch hook
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail } from "validator";

const required = (value) => {
  if (!value) {
    return (
      <div
        className="alert alert-danger"
        role="alert"
        style={{ fontSize: "1rem" }}
      >
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div
        className="alert alert-danger"
        role="alert"
        style={{ fontSize: "1rem" }}
      >
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div
        className="alert alert-danger"
        role="alert"
        style={{ fontSize: "1rem" }}
      >
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div
        className="alert alert-danger"
        role="alert"
        style={{ fontSize: "1rem" }}
      >
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const PopUpAddShop = ({ onClose }) => {
  const dispatch = useDispatch(); // Get the dispatch function
  const checkBtn = useRef();
  const form = useRef();
  const [shopId, setShopId] = useState("");
  const [shopusername, setShopusername] = useState("");
  const [shopemail, setShopEmail] = useState("");
  const [file, setFile] = useState("");
  const [shoppassword, setShopPassword] = useState("");
  const [shoplocation, setShopLocation] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [dustbinId, setDustbinId] = useState("");
  const [qrImage, setQrImage] = useState("");
  const [qrCode, setQrCode] = useState(null);
  const { message } = useSelector((state) => state.message);
  const qrRef = useRef(null);
  const qrCodeRef = useRef(null);

  const handleShopIdChange = (event) => {
    setShopId(event.target.value);
  };

  const handleShopUsernameChange = (event) => {
    setShopusername(event.target.value);
  };

  const handleShopEmailChange = (event) => {
    setShopEmail(event.target.value);
  };

  const handleShopPasswordChange = (event) => {
    setShopPassword(event.target.value);
  };

  const handleShopLocationChange = (event) => {
    setShopLocation(event.target.value);
  };

  const handleDustbinIdChange = (event) => {
    setDustbinId(event.target.value);
  };

  const onUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await convertToBase64(file);
        setFile(base64);
      } catch (error) {
        console.error("Error converting file to base64:", error);
      }
    }
  };

  const generateUniqueId = () => {
    // Generate a unique ID here
    // You can use a library like uuid or generate a custom ID based on your requirements
    const uniqueId = "your_unique_id";
    setShopId(uniqueId);
  };

  const handleGenerateQRCode = async() => {
    const qrCodeContent = `${dustbinId}|${shoplocation}`;
    // console.log(qrCodeContent);
    setQrCode(qrCodeContent);

    // Generate the QR code image and set qrImage state
     // Generate the QR code image and set qrImage state
  
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccessful(false);

    form.current.validateAll();

    // Create an object with the form data

    const shopid = shopId;
    const shopUsername = shopusername;
    const shopEmail = shopemail;
    const shopPassword = shoppassword;
    const shopLocation = shoplocation;
    const shopProfile = file || ""; // Assuming file is the base64 string
    const dustbinid = dustbinId;
    const qrcode = qrImage || "";

    // Dispatch the registerShopOwner action
    if (checkBtn?.current?.context?._errors?.length === 0) {
      dispatch(
        registerShopOwner(
          shopid,
          shopUsername,
          shopEmail,
          shopPassword,
          shopLocation,
          shopProfile,
          dustbinid,
          qrcode
        )
      )
        .then(() => {
          // Handle success, if needed
          console.log("Registration successful");
          setSuccessful(true);
        })
        .catch(() => {
          // Handle error, if needed
          console.log("Registration failed");
          setSuccessful(false);
        });
    }
  };

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
      borderedContext.fillRect(
        0,
        0,
        borderedCanvas.width,
        borderedCanvas.height
      );

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
    <div className={`${css.overlay}`}>
      <div className={css.modal}>
        <h2 className={css.title}>ShopOwner Details</h2>

        <div className={css.closeIcon}>
          <IconButton color="inherit" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>

        <div className={css.content}>
          <Form onSubmit={handleSubmit} className={css.container} ref={form}>
            {!successful && (
              <>
                <div className="form-group">
                  <label htmlFor="profile">
                    <img
                      src={
                        file || "//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                      }
                      alt="profile-img"
                      className="profile-img-card"
                    />
                  </label>
                  <Input
                    onChange={onUpload}
                    type="file"
                    id="profile"
                    name="profile"
                    className="hidden"
                  />
                </div>
                <div className={css.userDetails}>
                  <div className={css.inputBox}>
                    <span className={css.details}>Shop Id</span>
                    <Input
                      type="text"
                      placeholder="Enter shop id"
                      value={shopId}
                      validations={[required]}
                      onChange={handleShopIdChange}
                      required
                    />
                  </div>
                  <div className={css.inputBox}>
                    <span className={css.details}>Shop Username</span>
                    <Input
                      type="text"
                      placeholder="Enter shop username"
                      value={shopusername}
                      onChange={handleShopUsernameChange}
                      validations={[required, vusername]}
                      required
                    />
                  </div>
                  <div className={css.inputBox}>
                    <span className={css.details}>Shop Email</span>
                    <Input
                      type="text"
                      placeholder="Enter shop email"
                      value={shopemail}
                      onChange={handleShopEmailChange}
                      validations={[required, validEmail]}
                      required
                    />
                  </div>
                  <div className={css.inputBox}>
                    <span className={css.details}>Shop Password</span>
                    <Input
                      type="password"
                      placeholder="Enter shop password"
                      name="password"
                      value={shoppassword}
                      onChange={handleShopPasswordChange}
                      validations={[required, vpassword]}
                      required
                    />
                  </div>
                  <div className={css.inputBox}>
                    <span className={css.details}>Shop Location</span>
                    <Input
                      type="text"
                      placeholder="Enter shop location"
                      value={shoplocation}
                      onChange={handleShopLocationChange}
                      validations={[required]}
                      required
                    />
                  </div>
                  <div className={css.inputBox}>
                    <span className={css.details}>Dustbin ID</span>
                    <Input
                      type="text"
                      placeholder="Enter dustbin ID"
                      value={dustbinId}
                      onChange={handleDustbinIdChange}
                      validations={[required]}
                      required
                    />
                  </div>
                  <div className={css.QrBox}>
                    <button
                      className={css.durationButton}
                      type="button"
                      onClick={
                        qrCode !== "|" && qrCode
                          ? downloadQRCode
                          : handleGenerateQRCode
                      }
                    >
                      {qrCode !== "|" && qrCode ? "Download QR" : "Generate QR"}
                    </button>
                    {qrCode !== "|" && qrCode && (
                      <div className={css.qrContainer} ref={qrRef}>
                        <QRCodeGenerator data={qrCode} ref={qrCodeRef} />
                      </div>
                    )}
                  </div>
                  <div className={css.button}>
                    <input type="submit" value="Submit" />
                  </div>
                </div>
              </>
            )}
            {message && (
              <div className="form-group">
                <div
                  className={
                    successful ? "alert-success" : "alert alert-danger"
                  }
                  role="alert"
                  style={{ fontSize: "1rem" }}
                >
                  {typeof message === "object" ? message._message : message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none", fontSize: "1rem" }}
              ref={checkBtn}
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PopUpAddShop;
