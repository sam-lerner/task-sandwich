import React from 'react';

import "./style.css";

function Navbar({ currentPage, handlePageChange }) {
  return (
    <div className="navCard">
      <ul className="nav nav-tabs">
        <li className="nav-item navHeader">
          <a
            href="#profile"
            onClick={() => handlePageChange('Profile')}

            className={currentPage === 'Profile' ? 'nav-link active' : 'nav-link'}
          >
            Profile
          </a>
        </li>
        <li className="nav-item navHeader">
          <a
            href="#projects"
            onClick={() => handlePageChange('Projects')}

            className={currentPage === 'Projects' ? 'nav-link active' : 'nav-link'}
          >
            Projects
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;