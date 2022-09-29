import React from 'react'
import './style.css';

const BoxItem = ({ onClick, content, boxWidth, boxHeight }) => {
  return (
    <div className={`box--item ${content === 'X' ? 'font-red' : 'font-blue'}`} style={{width: boxWidth, height: boxHeight}}onClick={onClick}>
      {content}
    </div>
  )
}

export default BoxItem;