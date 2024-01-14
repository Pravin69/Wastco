import React, { useEffect, useState } from "react";
import css from "./Shop.module.css";
import { updateAuth } from "../../actions/auth";

import Circle from "../../components/Circle/Circle";

import userService from "../../services/user.service"; // Add this import statement

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import PopupDisplay from "../../components/PopupDisplayComponent/PopupDisplay";
import { useDispatch, useSelector } from "react-redux";

const ShopPoints = () => {
  const [circle] = useState(21);
  const [active, setActive] = useState(0);
  const [width, setWidth] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupDisplay, setShowPopupDisplay] = useState(false);
  const isClaimDisabled = active < 10;
  const [coinsCount, setCoinsCount] = useState(0); // State to store the coinsCount
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const { user: currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    setWidth(30 * active + 40 * active);
  }, [circle, active]);

  useEffect(() => {
    // Fetch the user data and set the coinsCount
    userService
      .getShopOwnerData()
      .then((response) => {
        const shopOwnerData = response.data.shopOwner;
        dispatch(updateAuth(shopOwnerData));
        const coinsCount = shopOwnerData.shopCoins;
        setCoinsCount(coinsCount);
        setActive(coinsCount);
        setIsLoading(false); // Set isLoading to false when data is fetched
      })
      .catch((error) => {
        console.error("Failed to fetch shop owner data:", error);
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

  const handleClaim = () => {
    if (active >= 10) {
      userService
        .updateShopCoinsCount() // Decrease shopCoins count by 10
        .then((response) => {
          // console.log(response.data);
          // dispatch(updateAuth(response.data.shopOwner));
          setCoinsCount((prevShopCoinsCount) => prevShopCoinsCount - 10); // Update the shopCoinsCount state
          setActive((prevActive) => prevActive - 10); // Decrease the active state by 10
          setWidth(30 * active + 40 * active); // Update the width of the progress bar
        })
        .catch((error) => {
          console.error("Failed to update shopCoins count:", error);
          // Handle the error appropriately (e.g., show an error message)
        });
      setShowPopupDisplay(true);
      userService
        .getShopOwnerData()
        .then((response) => {
          const shopOwnerData = response.data.shopOwner;
          dispatch(updateAuth(shopOwnerData));
          setIsLoading(false); // Set isLoading to false when data is fetched
        })
        .catch((error) => {
          console.error("Failed to fetch shop owner data:", error);
          setIsLoading(false); // Set isLoading to false on error as well
          // Handle the error appropriately (e.g., show an error message)
        });
    }
  };

  if (isLoading) {
    // Show a loading indicator while data is being fetched
    return <LoadingSpinner />;
  }

  return (
    <div className={css.container}>
      {/* Left Side */}
      {}
      <div className={css.dashboard}>
        <div className={`${css.dashboardHead} theme-container`}>
          <div className={css.head}>
            <span>Shop Points</span>
            {/* <span>{coinsCount}</span>  */}
          </div>
          {console.log(currentUser)}
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
              <PopupDisplay onClose={closePopupDisplay}></PopupDisplay>
            )}
            {/* <PopupDisplay onClose={closePopupDisplay}></PopupDisplay> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPoints;
