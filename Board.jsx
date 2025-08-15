import React, { useState } from "react";

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  function calculateWinner(sq) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let [a, b, c] of lines) {
      if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
        return sq[a];
      }
    }
    return null;
  }

  function handleClick(i) {
    if (squares[i] || winner) return;

    const newSquares = squares.slice();
    newSquares[i] = isXNext ? "X" : "O";
    setSquares(newSquares);

    const win = calculateWinner(newSquares);
    if (win) {
      setWinner(win);
    } else {
      setIsXNext(!isXNext);
    }
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  }

  return (
    <div>
      <div className="status">
        {winner
          ? `Winner: ${winner}`
          : squares.every(Boolean)
          ? "It's a draw!"
          : `Next Player: ${isXNext ? "X" : "O"}`}
      </div>
      <div className="board">
        {squares.map((val, i) => (
          <button
            key={i}
            className="square"
            onClick={() => handleClick(i)}
          >
            {val}
          </button>
        ))}
      </div>
      <button id="reset" onClick={resetGame}>Reset</button>
    </div>
  );
}
