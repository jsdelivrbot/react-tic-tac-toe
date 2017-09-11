import React, { Component } from 'react';
import { SquareType } from './board';

const Square = (props) => {
  return (
    <button
      className="square"
      onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default Square;
