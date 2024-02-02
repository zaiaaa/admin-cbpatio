// PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';

const PrivateRoute = ({children}) => {
  const { isAuth } = useContext(AuthContext);

  return isAuth ? children : <Navigate to={"/"} />

};

export {PrivateRoute};