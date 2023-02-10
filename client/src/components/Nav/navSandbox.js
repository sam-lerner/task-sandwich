import React from 'react';

import "./style.css";

function Navbar({ currentPage, handlePageChange }) {
  return (
    <div className="navCard">
      <ul className="nav nav-tabs">
        <li className="nav-item navHeader">
          <a
            href="#about"
            onClick={() => handlePageChange('About')}

            className={currentPage === 'About' ? 'nav-link active' : 'nav-link'}
          >
            Profile
          </a>
        </li>
        <li className="nav-item navHeader">
          <a
            href="#portfolio"
            onClick={() => handlePageChange('Portfolio')}

            className={currentPage === 'Portfolio' ? 'nav-link active' : 'nav-link'}
          >
            Projects
          </a>
        </li>
        <li className="nav-item navHeader">
          <a
            href="#resume"
            onClick={() => handlePageChange('Resume')}

            className={currentPage === 'Resume' ? 'nav-link active' : 'nav-link'}
          >
            Resume
          </a>
        </li>
        <li className="nav-item navHeader">
          <a
            href="#LoFi"

            onClick={() => handlePageChange('LoFi')}
            className={currentPage === 'LoFi' ? 'nav-link active' : 'nav-link'}
          >
            LoFi
          </a>
        </li>
        <li className="nav-item navHeader">
          <a
            href="#Contact"

            onClick={() => handlePageChange('Contact')}
            className={currentPage === 'Contact' ? 'nav-link active' : 'nav-link'}
          >
            Contact
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
