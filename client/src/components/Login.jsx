import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { login } from "../actions/auth";
import { Navbar } from "./Home/index";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  let navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);

  const form = useRef();
  const checkBtn = useRef();

  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const onChangeUserId = (e) => {
    const userid = e.target.value;
    setUserId(userid);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(userid, password))
        .then(() => {

          const userRole = JSON.parse(localStorage.getItem("user")).roles[0];
          console.log(userRole);
          if (userRole === "User") {
            navigate("/user/dashboard");
          }
          else if (userRole === "Shopowner") {
            navigate("/shop/shopdashboard");
          } else {
            navigate("/admin/dashboard");
          }
          // window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };



  return (
    <section className="gradient-bg-services" id="home">
      {currentUser ? null : <Navbar />}
      <div className="card card-container shadow-[0_0.5rem_1rem_rgba(0,0,0,0.5)] rounded-[2rem] bg-[rgba(39,51,89,0.4)]">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="userid">Userid</label>
            <Input
              type="text"
              className="form-control text-black"
              name="userid"
              value={userid}
              onChange={onChangeUserId}
              validations={[required]}
              style={{ textTransform: "none" }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control text-black"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
              style={{ textTransform: "none" }}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </section>
  );
};

export default Login;
