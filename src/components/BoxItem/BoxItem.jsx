/**
 * @param {function} onClick
 * @param {string} content
 * @param {int} boxWidth
 * @param {int} boxHeight
 * @return {JSX}
 * This is the box component of board
 */

import React, { memo } from "react";
import { useEffect } from "react";
import "./style.css";

const BoxItem = memo(({ onClick, content, boxWidth, boxHeight }) => {
  return (
    <div
      className={`box--item ${
        content === "X" ? "font--color-red" : "font--color-blue"
      }`}
      style={{
        width: boxWidth,
        height: boxHeight,
        fontSize: boxHeight * 0.7,
      }}
      onClick={onClick}
    >
      {content}
    </div>
  );
});

export default BoxItem;
