import React from 'react';

import "./style.css";
import { sandwichLogoTopEdited, sandwichLogoBottomEdited } from './images';

const Header = () => {
  return (
    <header className="image-wrapper">
      <div className="sandwich-wrapper">
        <img className="top-image" src={sandwichLogoTopEdited} alt="Tasty-looking sandwich top."></img>
        <a href="/" className="title-link">
          <h1 className="title-name">TASK SANDWICH</h1>
          <h6 className="title-slogan">"Accept No Subs!!"</h6>
        </a>
        <img className="bottom-image" src={sandwichLogoBottomEdited} alt="Tasy-looking sandwich bottom."></img>
      </div>
    </header>
  )
}

export default Header;