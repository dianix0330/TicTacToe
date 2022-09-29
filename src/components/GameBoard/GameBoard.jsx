/**
 * @param {number} count
 * @return {JSX} body component
 * This is game board component
 */

import React, { useEffect, useState } from "react";
import { BoxItem } from "../index";
import "./style.css";

const GameBoard = ({ count }) => {
  const [boxes, setBoxes] = useState(Array(count * count).fill("")); // The boxes state contains array of values .
  const [gameStatus, setGameStatus] = useState("X"); // The gameStatus state shows value of Game Status ('X' or 'O').
  const [stepCount, setStepCount] = useState(0); // The stepCount state shows count of valid item in boxes.
  const [gameWinner, setWinner] = useState("NOTOVER"); // The gameWinner state shows result of game.
  const [windowSize, setWindowSize] = useState(getWindowSize()); // The windowSize state shows the current WindowSize and updates it even if it has been changed.
  const [boxSize, setBoxSize] = useState({ width: 100, height: 100 }); // The boxSize state shows the size of BoxItem.

  useEffect(() => {
    handleWindowResize();

    //Get the current size of Component
    function handleWindowResize() {
      const size = getWindowSize();
      const min =
        size.innerHeight < size.innerWidth ? size.innerHeight : size.innerWidth; // The min value shows min value between height and width of component.
      const boxHeight = (min * 0.7) / count;
      setBoxSize({ width: boxHeight, height: boxHeight });
      setWindowSize(windowSize);
    }

    window.addEventListener("resize", handleWindowResize); //Add Resize Event to the component

    return () => {
      window.removeEventListener("resize", handleWindowResize); // When the component is dismounted, remove the event of handleWindowResize.
    };
  }, []);

  // Check if the game is over whenever the boxes states has changed.
  useEffect(() => {
    isGameFinished();
  }, [boxes]);

  // Set the initial value of all states
  function initial() {
    setBoxes(Array(count * count).fill("")); // Set the initial state of the boxes to ""
    setGameStatus("X"); // Set the initial state of the status to "X"
    setStepCount(0); // Set the initial count to 0
    setWinner("NOTOVER"); // Set the initail game result to "NOTOVER"
  }

  // Returns the full status text from gameStatus state.
  const getTextFromStatus = () => `${gameStatus === "X" ? "A" : "B"}'s Turn!`;

  // Returns correct index of boxes from columnIndex and rowIndex.
  const getBoxIndex = (columnIndex, rowIndex) => columnIndex * count + rowIndex;

  function handleBoxClick(columnIndex, rowIndex) {
    const result = [...boxes];
    const index = getBoxIndex(columnIndex, rowIndex);
    if (result[index]) return;
    result[index] = gameStatus;

    setBoxes(result); // Set boxes state to modified result.
    setStepCount((prev) => prev + 1); // Increase the count of Step.
    setGameStatus(gameStatus === "X" ? "O" : "X"); // Set the game status value
  }

  // Get boxes value by using getBoxIndex function with columnIndex and rowIndex params.
  const getBoxValueBy = (columnIndex, rowIndex) =>
    boxes[getBoxIndex(columnIndex, rowIndex)];

  // Return the result of game
  function showGameResult() {
    if (gameWinner === "NOTOVER")
      return false; // If the result of game is "NOTOVER", do nothing.
    else if (gameWinner === "draw") return "Draw Game!"; // If the result of game is "draw", then draw game.
    return gameWinner === "X" ? "B win this game" : "A win this game";
  }

  //Check if the game is over.
  function isGameFinished() {
    let result = "";
    if (stepCount === 0) return;
    if (horizontal_vertical_Check() === true || crossCheck() === true) {
      //Check horizontal and vertical check, diagonal check
      result = gameStatus;
    } else result = "NOTOVER";
    if (stepCount === count * count && result === "NOTOVER") result = "draw"; // If the stepCount reaches count ^ 2 and the result is "NOTOVER", then return "draw"
    setWinner(result);
  }

  // Check if the str is the same as "XXX..." or "OOO..." and the length must be count.
  function isAllValuesAreSame(str) {
    if (
      str === Array(count).fill("X").join("") ||
      str === Array(count).fill("O").join("")
    ) {
      return true;
    }
    return false;
  }

  // Check every row and return true if all values are the same, else return false
  function horizontalCheck() {
    for (let i = 0; i < count; i++) {
      let mergeValues = "";
      for (let j = 0; j < count; j++) {
        mergeValues += getBoxValueBy(i, j);
      }
      if (isAllValuesAreSame(mergeValues)) return true;
    }
    return false;
  }

  // Check every column  and return true if all values are the same, else return false
  function verticalCheck() {
    for (let i = 0; i < count; i++) {
      let mergeValues = "";
      for (let j = 0; j < count; j++) {
        mergeValues += getBoxValueBy(j, i);
      }
      if (isAllValuesAreSame(mergeValues)) return true;
    }
    return false;
  }

  //Check horizontally and vertically.
  function horizontal_vertical_Check() {
    if (horizontalCheck() === true || verticalCheck === true) return true;
    return false;
  }

  //Check the diagonal of board and return true if all values are the same, else return false
  function diagonalCheck() {
    let mergeValues = "";
    for (let i = 0; i < count; i++) {
      mergeValues += getBoxValueBy(i, i);
    }
    if (isAllValuesAreSame(mergeValues)) return true;
    return false;
  }

  //Check the reverse diagonal of board and return true if all values are the same, else return false
  function reverseDiagonalCheck() {
    let mergeValues = "";
    for (let i = 0; i < count; i++) {
      mergeValues += getBoxValueBy(i, count - i - 1);
    }
    if (isAllValuesAreSame(mergeValues)) return true;
    return false;
  }

  //Check the diagonal and reverse diagonal of game board
  function crossCheck() {
    if (diagonalCheck() === true || reverseDiagonalCheck() === true)
      return true;
    return false;
  }

  const handleGameStart = () => {
    initial();
  };

  return (
    <div className="container">
      <StatusShow content={getTextFromStatus()} />
      {gameWinner !== "NOTOVER" && (
        <div className="game--modal-over">
          {showGameResult()}
          <button className="button--restart" onClick={handleGameStart}>
            Restart
          </button>
        </div>
      )}
      {/* Display boxes as (size * size) game board */}
      <div className="game__board">
        {Array(count)
          .fill(null)
          .map((_, columnIndex) => (
            <div
              className="board__row"
              key={columnIndex}
              style={{ width: (boxSize.width + 5) * count }}
            >
              {Array(count)
                .fill(null)
                .map((_, rowIndex) => (
                  <BoxItem
                    key={columnIndex + ":" + rowIndex}
                    onClick={() => handleBoxClick(columnIndex, rowIndex)}
                    content={getBoxValueBy(columnIndex, rowIndex)}
                    boxWidth={boxSize.width}
                    boxHeight={boxSize.height}
                  />
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};

function StatusShow({ content }) {
  return <h1 className="text--status-red">{content}</h1>;
}

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

export default GameBoard;
