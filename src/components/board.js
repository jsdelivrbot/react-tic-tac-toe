import React from 'react';
import { Component } from 'react';
import Square from './square';

const SQUARE_COUNT = 9;
const SquareType = Object.freeze({
  CROSS: 'X',
  CIRCLE: 'O',
  EMPTY: ' '
});

const DEFAULT_STATE = {
  squares: new Array(SQUARE_COUNT).fill(SquareType.EMPTY),
  xIsNext: true,
  winner: SquareType.EMPTY
};

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = DEFAULT_STATE;
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (this.state.winner !== SquareType.EMPTY || squares[i] !== SquareType.EMPTY) {
      return;
    }

    squares[i] = this.state.xIsNext
      ? SquareType.CROSS
      : SquareType.CIRCLE;

    this.setState({
      squares,
      xIsNext: !this.state.xIsNext,
      winner: this.getWinner(squares)
    });
  }

  getWinner(squares) {
    var conditions = new Array();
    var i, j;
    const len = 3;

    // horizontal
    for (i = 0; i < len; ++i)
      for (j = 0; j < len; ++j)
        conditions.push(squares[i * 3 + j]);
    // vertical
    for (i = 0; i < len; ++i)
      for (j = 0; j < len; ++j)
        conditions.push(squares[j * 3 + i]);
    // diagonal (up-left to down-right)
    for (i = 0; i < SQUARE_COUNT; i += 4)
       conditions.push(squares[i]);
    // diagonal (up-right to down-left)
    for (i = 2; i < 7; i += 2)
      conditions.push(squares[i]);

    for (i = 0; i < conditions.length; i += len) {
      if (conditions[i] === conditions[i + 1] && conditions[i + 1] === conditions[i + 2]) {
        return conditions[i];
      }
    }

    return SquareType.EMPTY;
  }

  reset() {
    this.setState(DEFAULT_STATE);
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    )
  }

  render() {
    return (
      <div>
        <div>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div>
          <button
            className='button-reset'
            onClick={() => this.reset()}>
            Reset
          </button>
        </div>
        <div>
          {this.state.winner !== SquareType.EMPTY
            ? `Player ${this.state.winner} has won!`
            : ''}
        </div>
      </div>
    );
  }
}

export { SquareType };
export default Board;
