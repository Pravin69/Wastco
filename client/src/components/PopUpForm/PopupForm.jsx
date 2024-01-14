import React, { useState } from "react";
import css from "./PopupForm.module.css";
import moment from "moment";

const PopupForm = ({ data, onClose, onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target); // Get form data using FormData

    // Convert form data to an object
    const formObject = Object.fromEntries(formData.entries());

    // Get the selected bottle content
    const bottleContent = parseInt(formObject.bottleContent);

    // Assign the appropriate value to the 'coins' field based on bottle content
    let coins = 0;
    console.log(bottleContent)

    if (bottleContent === 250) {
      coins = 1;
    } else if (bottleContent === 500) {
      coins = 2;
    } else if (bottleContent === 1000) {
      coins = 3;
    }

    // Add the 'coins' field to the formObject
    formObject.coins = coins;
    const formattedDateTime = moment().format("DD/MM/YYYY hh:mm:ss A");

  // Store the formatted date and time in the timestamp field
    formObject.timestamp = formattedDateTime;

    console.log(formObject);

    onSubmit(formObject);
  };

  // Extract values from the data string
  const [
    dustbinId,
    dustbinLocation,
  ] = data.split("|");

  const [coins, setCoins] = useState(0);

  return (
    <div className={`${css.overlay}`}>
      <div className={css.modal}>
        <h2 className={css.title}>Scan Result</h2>

        <form onSubmit={handleSubmit}>
          <div className={`${css.formGroup} ${css.inputContainer}`}>
            <label htmlFor="dustbinId">Dustbin ID:</label>
            <input
              type="text"
              id="dustbinId"
              name="dustbinId"
              defaultValue={dustbinId || ""}
              required
            />
          </div>

          <div className={`${css.formGroup} ${css.inputContainer}`}>
            <label htmlFor="dustbinLocation">Dustbin Location:</label>
            <input
              type="text"
              id="dustbinLocation"
              name="dustbinLocation"
              defaultValue={dustbinLocation || ""}
              required
            />
          </div>

          <div className={`${css.formGroup} ${css.inputContainer}`}>
            <label htmlFor="bottleId">Bottle ID:</label>
            <input
              type="text"
              id="bottleId"
              name="bottleId"
              defaultValue={""}
              required
            />
          </div>

          <div className={`${css.formGroup} ${css.inputContainer}`}>
            <label htmlFor="bottleContent">Bottle Content:</label>
            <select
              id="bottleContent"
              className={`${css.selectField}`}
              name="bottleContent"
              defaultValue={""}
              required
              onChange={(e) => setCoins(parseInt(e.target.value))}
              
            >
              <option value="">Select bottle content</option>
              <option value="250 ml">250 ml</option>
              <option value="500 ml">500 ml</option>
              <option value="1000 ml">1 litre</option>
            </select>
          </div>

          <div className={`${css.formGroup} ${css.inputContainer}`}>
            <label htmlFor="bottleExpiryDate">Bottle Expiry Date:</label>
            <input
              type="text"
              id="bottleExpiryDate"
              name="bottleExpiryDate"
              defaultValue={""}
              required
            />
          </div>

          <div className={`${css.formGroup} ${css.inputContainer}`}>
            <label htmlFor="userLocation">User Location:</label>
            <input
              type="text"
              id="userLocation"
              name="userLocation"
              defaultValue={""}
              required
            />
          </div>

          <div className={css.buttons}>
            <button type="submit" className={css.submitButton}>
              Submit
            </button>
            <button type="button" className={css.closeButton} onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
