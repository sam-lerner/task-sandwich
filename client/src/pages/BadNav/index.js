import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from "react-bootstrap";

import { badnav } from "./images";

import "./style.css";
 
function BadNav() {
  let location = useLocation();
  return (
    // <Container>
      <div className="badnav-top-card">
        <div className="badnav-card card-header bg-dark text-center">
        <img src={badnav} className="badnav" alt="An empty plate 404."></img>
          <h1 className="badnav-text">
            No sandwiches to be had at this address: <code>{location.pathname}</code>
          </h1>
        </div>
      </div>
      // {/* <div className="badnav-top-card card bg-white card-rounded w-50">
      //   <div className="badnav-card card-header bg-dark text-center">
      //   <img src={badnav} className="badnav" alt="An empty plate 404."></img>
      //     <h1 className="badnav-text">
      //       No sandwiches to be had at this address: <code>{location.pathname}</code>
      //     </h1>
      //   </div>
      // </div> */}
    // </Container>
  );
}

export default BadNav;