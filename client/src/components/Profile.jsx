import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import QRCode from "react-qr-code";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  console.log(currentUser);

  return (
    <div className="card card-container">
        <img
          src={ currentUser.profile || "//ssl.gstatic.com/accounts/ui/avatar_2x.png"}
          alt="profile-img"
          className="profile-img-card"
        />

        <h3 className="text-3xl">
          <strong>{currentUser.username}</strong> Profile
        </h3>
        <p>
          <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id:</strong> {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <strong className="text-[1.5rem]">Authorities:</strong>
        <ul className="text-[1.8rem]">
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>


        <div>
          <QRCode  value={`Username:${currentUser.username}, User-email:${currentUser.email}`} className="h-[16rem] w-[10rem]" />
        </div>
    </div>
  );
};

export default Profile;
