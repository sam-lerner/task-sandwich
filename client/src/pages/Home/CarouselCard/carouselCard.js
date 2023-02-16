import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

import { whiteSquare } from "../images/";

function Card({
  title,
  description,
  image,
  url,
  currentSlide,
  currentIndex,
  factOne,
  factTwo,
  factThree,
  factFour
}) {
  const [show, setShown] = useState(false);

  const styles = useSpring({
    transform: show ? "scale(1.05)" : "scale(1)",
    boxShadow: show
      ? "0 20px 25px rgb(0 0 0 / 25%)"
      : "0 2px 10px rgb(0 0 0 / 8%)",
      borderRadius: "2em",
  });
  
  return (
    <animated.div
      style={{ ...styles, height: "fit-content" }}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      <div className="carouselWhiteSquareOuterDiv">
        <div className="carouselWhiteSquareInnerDiv">
          <img src={whiteSquare} alt="white square" className="carouselWhiteSquare" />
          <p className="carousel-txt"> {description} </p>
          <ul>
            <li>{factOne}</li>
            <li>{factTwo}</li>
            <li>{factThree}</li>
            <li>{factFour}</li>
          </ul>
        </div>

        <div className="carouselImageOuterDiv">
          <div className="carouselImageInnerDiv">
            <img src={image} alt="title" className="projectImgLocation" />
          </div>
          
          {title && (
            <div className="carouselTitleDiv">
              <a href={url} target="_blank" rel="noreferrer">{title}</a>
            </div>
          )}
        </div>
      </div>
    </animated.div>
  );
}

export default Card;