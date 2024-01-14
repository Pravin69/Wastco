import bin from '../../assets/bin-1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link , useLocation } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/auth";
import { clearMessage } from "../../actions/message";

const Navbar = () => {
  
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let location = useLocation();

  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  const isUser = location.pathname === '/user';
  

  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch, location]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <header className='gradient-bg-welcome'>
    <FontAwesomeIcon icon={['fas' , 'fa-bars']} id="menu-bar" className="rounded-[0.4rem] cursor-pointer hidden text-[2rem] py-[0.3rem] px-[0.7rem]" />
    <a href="#" className="flex items-center justify-center">
      <img className="mr-2 w-[4.5rem]" src={bin} alt="logo" />
      <p className="text-6xl font-bold text-gradient text-[#814096]">Wastco</p>
    </a>
    <nav className="navbar">
      {
        !isLoginPage && !isRegisterPage && !isUser && (
          <div className="navbar__links child:mr-8 last:mr-0 child:text-3xl">
            {/* <a href="#home">Home</a> */}
            <Link to='/home'>Home</Link>
            <a href="#services">Services</a>
            <a href="#about">About Us</a>
            <a href="#reviews">Reviews</a>
            <a href="#contact">Contact Us</a>
          </div>
        )
      }
    </nav>
        
        {currentUser ? (
          <div className="flex child:text-[1.8rem] child:h-16 child:w-[10rem] child:text-center child:py-2 child:text-[#fff] child:bg-sky-900 child:rounded-full child:cursor-pointer child-hover:bg-sky-700">
              <Link to={"/profile"} className="mr-8">
                {currentUser.username}
              </Link>
              <Link to="/login" onClick={logOut}>
                LogOut
              </Link>
          </div>
        ) : (
          <div className="flex child:text-[1.8rem] child:h-16 child:w-[10rem] child:text-center child:py-2 child:text-[#fff] child:bg-sky-900 child:rounded-full child:cursor-pointer child-hover:bg-sky-700">      
              <Link to={"/login"} className="mr-8">
                Login
              </Link>
              <Link to={"/register"} >
                Join Now
              </Link>
          </div>
        )}
  </header>
  )
}

export default Navbar;