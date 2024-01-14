import React, { useState } from "react";
import css from "./PopupBottle.module.css";
import moment from "moment";
import StatisticsChart from "../StatisticsChart/StatisticsChart";
import { IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import ShopStatistics from "../ShopStatistics/ShopStatistics";
import userService from "../../services/user.service"; 

const PopupBottle = ({ onClose }) => {
  const [bottleContent, setBottleContent] = useState("250 ml");
  const [bottlevolume, setbottleVolume] = useState("");
  const [responseMessage, setResponseMessage] = useState(""); 

  const handleVolumeChange = (event) => {
    setbottleVolume(event.target.value);
  };

  const handlebottleContentChange = (event) => {
    setBottleContent(event.target.value);
  };

  const handleSubmit = () => {
    const formData = {
      bottlevolume,
      bottleContent,
    };

    userService
    .submitBottleData(formData)
    .then(() => {
      console.log("Form data submitted successfully!");
      // You can perform any necessary actions after the form data is submitted
   // After successful submission, set the response message received from the backend
      const response = { message: "Stocks of Bottle added" }; // Replace with actual response from backend
      setResponseMessage(response.message);
    }).catch((error) => {
      console.error("Failed to submit form data:", error);
      // Handle the error appropriately (e.g., show an error message)
    });


  }

  return (
    <div className={`${css.overlay}`}>
      {/* {console.log(user)} */}
      <div className={css.modal}>
        <h2 className={css.title}>Bottle Details</h2>

        <div className={css.closeIcon}>
          <IconButton color="inherit" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>

        <div >
          <form onSubmit={handleSubmit} className={css.content}>
            <div className={css.inputBox}>
              <input
                type="text"
                placeholder="Enter bottle content"
                value={bottlevolume}
                onChange={handleVolumeChange}
                required
              />
            </div>
            <div className={css.durationButton}>
              <select value={bottleContent} onChange={handlebottleContentChange}>
                <option value="250">250 ml</option>
                <option value="500">500 ml</option>
                <option value="1000">1000 ml</option>
              </select>
            </div>
            <div >
              <button
                type="button"
                onClick={handleSubmit}
                className={css.dButton}
              >
                Submit
              </button>
            </div>
          </form>
          <div className={css.msgBox}>
            {responseMessage && (
            <div className={css.responseMessage}>{responseMessage}</div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupBottle;
