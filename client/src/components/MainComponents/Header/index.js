import React from 'react';

import "./style.css";
import { sandwichLogoTopEdited, sandwichLogoBottomEdited } from './images';

const Header = () => {
  return (
    // <header className="image-wrapper">
    //   <img className="top-image" src={sandwichLogoTopEdited} alt="Tasty-looking sandwich top."></img>
    //   <a href="/" className="title-link">
    //     <div className="image-wrapper">
    //       <h1 className="title-name">TASK SANDWICH</h1>
    //       <h2 className="title-name">"Except No Subs!!"</h2>
    //     </div>
    //   </a>
    //   <img className="bottom-image" src={sandwichLogoBottomEdited} alt="Tasy-looking sandwich bottom."></img>
    // </header>
    <header className="image-wrapper">
      {/* <div childrenlassName="sandwich-wrapper"> */}
        <img className="top-image" src={sandwichLogoTopEdited} alt="Tasty-looking sandwich top."></img>
        <a href="/" className="title-link"><h1 className="title-name">TASK SANDWICH</h1></a>
        <a href="/" className="title-link"><p className="title-slogan">"Accept No Subs!!"</p></a>
        <img className="bottom-image" src={sandwichLogoBottomEdited} alt="Tasy-looking sandwich bottom."></img>
      {/* </div> */}
    </header>
  )
}

export default Header;