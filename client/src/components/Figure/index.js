import React from 'react';

import { homeSandwich } from './images';

import './style.css';

function Figure() {
  return (
    <figure className="figure">
      <img src={homeSandwich} className="home-sandwich" alt="A decent-looking sandwich."/>
    </figure>
  );
}

export default Figure;