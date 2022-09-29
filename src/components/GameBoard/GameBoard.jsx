import React, { useEffect, useState } from "react";
import { BoxItem } from "../index";
import "./style.css";

const GameBoard = ({ count }) => {
  const [boxes, setBoxes] = useState(Array(count * count).fill(""));
  const [gameStatus, setGameStatus] = useState("X");
  const [stepCount, setStepCount] = useState(0);
  const [gameWinner, setWinner] = useState("NOT_END");
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [boxSize, setBoxSize] = useState({ width: 100, height: 100 });

  useEffect(() => {
    handleWindowResize();
    function handleWindowResize() {
      const size = getWindowSize();
      const min =
        size.innerHeight < size.innerWidth ? size.innerHeight : size.innerWidth;
      const boxHeight = (min * 0.7) / count;
      setBoxSize({ width: boxHeight, height: boxHeight });
      setWindowSize(windowSize);
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    isGameFinished();
  }, [boxes]);

  function initial() {
    setBoxes(Array(count * count).fill(""));
    setGameStatus("X");
    setStepCount(0);
    setWinner("NOT_END");
  }

  const getTextFromStatus = () => `Next is ${gameStatus === "X" ? "A" : "B"}`;

  const getBoxIndex = (columnIndex, rowIndex) => columnIndex * count + rowIndex;

  function handleBoxClick(columnIndex, rowIndex) {
    const result = [...boxes];
    const index = getBoxIndex(columnIndex, rowIndex);
    if (result[index]) return;
    result[index] = gameStatus;

    setBoxes(result);
    setStepCount((prev) => prev + 1);
    setGameStatus(gameStatus === "X" ? "O" : "X");
  }

  const getBoxValueBy = (columnIndex, rowIndex) =>
    boxes[getBoxIndex(columnIndex, rowIndex)];

  function showGameResult() {
    if (gameWinner === "NOT_END") return false;
    else if (gameWinner === "draw") return "Draw Game!";
    return gameWinner === "X" ? "B win this game" : "A win this game";
  }

  function isGameFinished() {
    let result = "";
    if (stepCount === 0) return;
    if (horizontal_vertical_Check() === true || crossCheck() === true) {
      result = gameStatus;
    } else result = "NOT_END";
    if (stepCount === count * count && result === "NOT_END") result = "draw";
    setWinner(result);
  }

  function isAllValuesAreSame(str) {
    if (
      str === Array(count).fill("X").join("") ||
      str === Array(count).fill("O").join("")
    ) {
      return true;
    }
    return false;
  }

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

  function horizontal_vertical_Check() {
    if (horizontalCheck() === true || verticalCheck === true) return true;
    return false;
  }

  function diagonalCheck() {
    let mergeValues = "";
    for (let i = 0; i < count; i++) {
      mergeValues += getBoxValueBy(i, i);
    }
    if (isAllValuesAreSame(mergeValues)) return true;
    return false;
  }

  function reverseDiagonalCheck() {
    let mergeValues = "";
    for (let i = 0; i < count; i++) {
      mergeValues += getBoxValueBy(i, count - i - 1);
    }
    if (isAllValuesAreSame(mergeValues)) return true;
    return false;
  }

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
      {gameWinner !== "NOT_END" && (
        <div className="game--modal-over">
          {showGameResult()}
          <button className="button--restart" onClick={handleGameStart}>
            Restart
          </button>
        </div>
      )}
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
