import React from 'react';

import "./style.css";
import { sandwichLogoTop, sandwichLogoBottom } from './images';

const Header = () => {
  return (
    <header className="image-wrapper">
      <img className="top-image" src={sandwichLogoTop} alt="Tasty-looking sandwich top."></img>
      <img className="bottom-image" src={sandwichLogoBottom} alt="Tasy-looking sandwich bottom."></img>
      <a href="/" className="title-link"><h1 className="title-name">TASK SANDWICH</h1></a>
    </header>
  )
}

export default Header;