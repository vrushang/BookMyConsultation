import React from "react";
import Home from "../screens/home/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
const Controller = () => {
  const baseUrl = "/api/v1/";

  var accessToken = '';


  return (
    <Router>
      <div className="main-container">
        <Route
          exact
          path="/"
          render={(props) => <Home  {...props} baseUrl={baseUrl}
          //  postLogin={postLogin}
          //  accessToken = {accessToken} 
          />
        }
        />
      </div>
    </Router>
  );
};

export default Controller;
