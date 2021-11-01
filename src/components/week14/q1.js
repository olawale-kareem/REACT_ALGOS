import React, { useEffect, useState, useRef } from "react";

export default props => {
  const [boxes, setBoxes] = useState([]);
  const [focusedIdx, setFocusedIdx] = useState(0);
  const focusedEl = useRef(null);
  const [input, setInput] = useState("")
  const addBox = () => {
    setBoxes(boxes.concat(""));
    setFocusedIdx(boxes.length);
  };
  
  const deleteBox = i => {
    setBoxes(boxes.slice(0, i).concat(boxes.slice(i + 1)));
    setFocusedIdx(Math.min(i, boxes.length - 2));
  };
  
  const moveBoxDown = i => {
    if (i < boxes.length - 1) {
      [boxes[i+1], boxes[i]] = [boxes[i], boxes[i+1]];
    }
    
    setFocusedIdx(i < boxes.length - 1 ? i + 1 : i);
    setBoxes(boxes);
  };
  
  const moveBoxUp = i => {
    if (i) {
      [boxes[i-1], boxes[i]] = [boxes[i], boxes[i-1]];
    }
    
    setFocusedIdx(i ? i - 1 : i);
    setBoxes(boxes);
  };
  
  const handleKeyPress = (event, i) => {
    setInput(event.target.value)
    boxes[i] = event.target.value;
    setBoxes(boxes);
    setFocusedIdx(i);
  };
  
  useEffect(() => {
    focusedEl.current !== null && focusedEl.current.focus();
  });
  
  return (
    <>
      <button className="add-row" onClick={addBox}>＋</button>
      {boxes.map((e, i) => (
        <div key={`row-${i}`} tabIndex={i}>
          <input 
            key={`input-${i}`} 
            className="row-input"
            value={e} 
            onChange={event => handleKeyPress(event, i)}
            ref={i === focusedIdx ? focusedEl : undefined}
          />
          <button
            key={`up-${i}`} 
            className="row-up" 
            onClick={() => moveBoxUp(i)}
          >↑</button>
          <button 
            key={`down-${i}`} 
            className="row-down" 
            onClick={() => moveBoxDown(i)}
          >↓</button>
          <button 
            key={`delete-${i}`} 
            className="row-delete" 
            onClick={() => deleteBox(i)}
          >×</button>
        </div>
      ))}
    </>
  );
};