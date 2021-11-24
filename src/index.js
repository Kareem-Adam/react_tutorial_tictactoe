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

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        /* click event listener */
        onClick={() => this.props.onClick(i)}
      />);
  }

  render() {

    return (
      <div>
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
  /* init local state */
  constructor(props) {
    /* super assigns constructor props to 'this' keyword */
    super(props); //superclass inheritance
    this.state = {
      history: [{ squares: Array(9).fill(null), }],
      xIsNext: true,
      stepNumber:0,
    }
  }

  handleClick(i) {

    /* slice creates a copy of state squares */
    /* changes through immutable object
      - less complexity
      - easy to detect changes 
      - allows react to determine when to re-render
    */
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    /* if game has not been won or square empty */
    if (!(calculateWinner(squares) || squares[i])) {
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        /* concats joins current array to history */
        history: history.concat([{ squares: squares, }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    } else {
      return;
    }
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }


  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';

      return (
        <li key={move}>
          <button
            onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      )
    })
    let status;

    if (winner) { status = 'Winner: ' + winner; }
    else { status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O'); }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

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

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
