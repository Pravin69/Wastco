import React from "react";
import "./CoinFlip.css";

const CoinFlip = ({ earnedCoins }) => {
  return (
    <div className="coin">
      <div className="side front">{ earnedCoins }</div>
      <div className="side back">{ earnedCoins }</div>
    </div>
  );
};

export default CoinFlip;
