import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

const ProtectedRoutes = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

export default ProtectedRoutes;