import React, { useEffect, useState } from "react";
import css from "./Reward.module.css";
import { cardsData, groupNumber } from "../../data";
import Statistics from "../../components/Statistics/Statistics";
import Orders from "../../components/Orders/Orders";
import Circle from "../../components/Circle/Circle";
import Scanner from "../../components/Scanner/Scanner";
import PopupForm from "../../components/PopUpForm/PopupForm";
import QRCodeGenerator from "../../components/QrCodeGenerator/QrCodeGenerator";
import userService from "../../services/user.service"; // Add this import statement
import Modal from "react-modal"; // Import react-modal
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import CoinFlip from "../../components/CoinFlip/CoinFlip";
import { updateAuth } from "../../actions/auth";

import PopupDisplay from "../../components/PopupDisplayComponent/PopupDisplay";
import { useDispatch } from "react-redux";

const Reward = () => {
  const [circle] = useState(21);
  const [active, setActive] = useState(0);
  const [width, setWidth] = useState(0);
  const [scannedData, setScannedData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupDisplay, setShowPopupDisplay] = useState(false);
  const isClaimDisabled = active < 10;
  const [modalIsOpen, setModalIsOpen] = useState(false); // State for dialog box
  const [earnedCoins, setEarnedCoins] = useState(0);
  const [responseMessage, setResponseMessage] = useState(""); // State to store response message
  const [coinsCount, setCoinsCount] = useState(0); // State to store the coinsCount
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const dispatch = useDispatch();

  const handleScan = (data) => {
    setScannedData(data);
    setShowPopup(true);
  };

  useEffect(() => {
    setWidth(30 * active + 40 * active);
  }, [circle, active]);

  useEffect(() => {
    // Fetch the user data and set the coinsCount
    userService
      .getUserData()
      .then((response) => {
        const userData = response.data.user;
        dispatch(updateAuth(userData));
        const coinsCount = userData.coinsCount;
        setCoinsCount(coinsCount);
        setActive(coinsCount);
        setIsLoading(false); // Set isLoading to false when data is fetched
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
        setIsLoading(false); // Set isLoading to false on error as well
        // Handle the error appropriately (e.g., show an error message)
      });
  }, []);

  const arr = [];
  for (let i = 0; i < circle; i++) {
    arr.push(
      <Circle
        className={
          i <= active ? `${css.circle} ${css.active}` : `${css.circle} `
        }
        key={i}
      >
        {i}
      </Circle>
    );
  }

  const closePopup = () => {
    setShowPopup(false); // Close the popup form
  };

  const closePopupDisplay = () => {
    setShowPopupDisplay(false); // Close the Bottle Claim Popup Form
  };

  const handleSubmit = (formData) => {
    userService
      .submitFormData(formData)
      .then(() => {
        console.log("Form data submitted successfully!");
        // You can perform any necessary actions after the form data is submitted
        closePopup(); // Close the popup form or perform any other action
        // After successful submission, set the response message received from the backend
        const response = { message: "Reward data successfully saved" }; // Replace with actual response from backend
        setResponseMessage(response.message);
        // active >= circle ? setActive(circle) : setActive(active + 1);

        // Increment the active state
        setActive((prevActive) => {
          const newActive =
            prevActive >= circle ? circle : prevActive + formData.coins;
          setWidth(30 * (active - 1) + 40 * active); // Update the width of the progress bar
          return newActive;
        });

        userService
          .getUserData()
          .then((response) => {
            const userData = response.data.user;
            dispatch(updateAuth(userData));
          })
          .catch((error) => {
            console.error("Failed to fetch user data:", error);
            
            // Handle the error appropriately (e.g., show an error message)
          });

        // Open the dialog box
        console.log(formData.coins);
        setEarnedCoins(formData.coins);
        setModalIsOpen(true);
      })
      .catch((error) => {
        console.error("Failed to submit form data:", error);
        // Handle the error appropriately (e.g., show an error message)
      });
  };

  const closeModal = () => {
    // Close the dialog box
    setModalIsOpen(false);
  };

  const handleClaim = () => {
    if (active >= 10) {
      userService
        .updateCoinsCount() // Decrease coinsCount by 10
        .then((response) => {
          // console.log(response.data);
          // dispatch(updateAuth(response.data.user));
          setCoinsCount((prevCoinsCount) => prevCoinsCount - 10); // Update the coinsCount state
          setActive((prevActive) => prevActive - 10); // Decrease the active state by 10
          setWidth(30 * active + 40 * active); // Update the width of the progress bar
        })
        .catch((error) => {
          console.error("Failed to update coins count:", error);
          // Handle the error appropriately (e.g., show an error message)
        });
      setShowPopupDisplay(true);
    }
  };

  if (isLoading) {
    // Show a loading indicator while data is being fetched
    return <LoadingSpinner />;
  }

  return (
    <div className={css.container}>
      {/* Left Side */}
      <div className={css.dashboard}>
        <div className={`${css.dashboardHead} theme-container`}>
          <div className={css.head}>
            <span>Reward Points</span>
            {/* <span>{coinsCount}</span>  */}
          </div>

          {/* <Slider
            dots={false}
            arrows={false}
            infinite={false}
            slidesToShow={10}
            slidesToScroll={1}
            initialSlide={active}
            beforeChange={(current, next) => setActive(next)}
          > */}

          {/* {setShowPopupDisplay(true)} */}
          <div className={`${css.progressbar}`}>
            <div className={css.progress} style={{ width: width + "px" }}></div>
            {arr}
          </div>

          <div className={css.button}>
            <button
              className={css.btn}
              onClick={handleClaim}
              disabled={isClaimDisabled}
            >
              Claim
            </button>
            {showPopupDisplay && (
              <PopupDisplay onClose={closePopupDisplay}>
                {/* Render the StatisticsChart component with the selected user */}
                {/* <StatisticsChart user={selectedUser} /> */}
              </PopupDisplay>
            )}
          </div>

          {/* <div className={css.button}>
            <button
              className={`${css.prev} ${css.btn} `}
              disabled={active > 0 ? false : true}
              onClick={() => {
                active <= 0 ? setActive(0) : setActive(active - 1);
              }}
            >
              Prev
            </button>
            <button
              className={`${css.next} ${css.btn}`}
              disabled={active >= circle - 1 ? true : false}
              onClick={() => {
                active >= circle ? setActive(circle) : setActive(active + 1);
              }}
            >
              Next
            </button>
          </div> */}
        </div>

        {/* <Statistics /> */}

        <div>
          {showPopup ? (
            <PopupForm
              data={scannedData}
              onClose={closePopup}
              onSubmit={handleSubmit}
            />
          ) : (
            <Scanner onScan={handleScan} />
          )}

          {/* <QRCodeGenerator data={combinedData}/> */}
        </div>
      </div>

      {/* <Orders /> */}

      {/* Dialog box */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={css.customModal}
      >
        <div className={css.modal}>
          <p>Coins Earned</p>
          <CoinFlip earnedCoins={earnedCoins} />
          <button
            type="button"
            className={css.closeButton}
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Reward;
