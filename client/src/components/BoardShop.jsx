import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/auth';
import Layout from './Layout/Layout';
import { Link , Outlet, useLocation } from 'react-router-dom';
import "./BoardUser.css"
import { Navigate, useNavigate  } from 'react-router-dom';

const BoardShop = () => {
  return (
    <div id="dashboard">
      <Layout/>
    </div>
  )
}

export default BoardShop;