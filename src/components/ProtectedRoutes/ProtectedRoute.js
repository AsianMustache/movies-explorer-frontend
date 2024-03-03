import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ component: Component, loggedIn, ...props }) {
  return loggedIn ? <Component {...props} /> : <Navigate to="/signin" />;
}

export default ProtectedRoute;