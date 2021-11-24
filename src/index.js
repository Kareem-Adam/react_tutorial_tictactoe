import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


/* 
- class square refactored to function as its 
state is now controlled by board class.
- this keyword is also no longer required.
*/
function Square(props) {
  return (
    <button
      className="square"
      /* setState auto updates child components */
      onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  /* init local state */
  constructor(props) {
    /* super assigns constructor props to 'this' keyword */
    super(props); //superclass inheritance
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {

    /* slice creates a copy of state squares */
    /* changes through immutable object
      - less complexity
      - easy to detect changes 
      - allows react to determine when to re-render
    */
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        /* click event listener */
        onClick={() => this.handleClick(i)}
      />);
  }

  render() {

    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    };


    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {

  /* win outcomes */
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  /* cycle through array */
  for (let i = 0; i < lines.length; i++) {
    /* store array value */
    const [a, b, c] = lines[i];
    /* if combo all contain same charachter */
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      /* return winning combo charachter */
      return squares[a];
    }
  }
  return null;
}