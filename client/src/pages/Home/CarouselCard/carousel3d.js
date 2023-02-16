import React, { useState, useEffect } from "react";
import { config } from "react-spring";

import { Carousel } from "react-carousel-card-3d";

export default function Carousel3d({ cards, offset }) {
  const table = cards.map((element, index) => {
    return { ...element, index, onClick: () => setGoToSlide(index) };
  });

  const [offsetRadius, setOffsetRadius] = useState(2);
  const [goToSlide, setGoToSlide] = useState(0);
  const [slides] = useState(table);

  useEffect(() => {
    setOffsetRadius(offset);
  }, [offset]);

  return (
    <Carousel
      slides={slides}
      goToSlide={goToSlide}
      offsetRadius={offsetRadius}
      animationConfig={config.gentle}
    />
  );
}
