import { useState } from "react";
import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard() {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    function handleSelectSquer(rowIndex, colIndex ) {
        setGameBoard((prevGameBoard) => {
          const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
          updatedBoard[rowIndex][colIndex] = "X";
          return updatedBoard;
        });
    }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymble, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => handleSelectSquer(rowIndex, colIndex)}>{playerSymble}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
