import { React, useState } from "react";
import { FaStar } from "react-icons/fa";

export default function StarRating({ noOfStars = 5 }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  function handleClick(getCurrentIndex) {
    console.log(getCurrentIndex);
  }

  function handleMouseEnter(getCurrentIndex) {
    console.log(getCurrentIndex);
  }

  function handleMouse(getCurrentIndex) {
    console.log(getCurrentIndex);
  }

  return (
    <div>
      <h1>Star Rating Component</h1>
      {[...Array(noOfStars)].map((_, index) => {
        index += 1;
        return (
          <FaStar
            key={index}
            onClick={() => {
              handleClick(index);
            }}
            onMouseMove={() => {
              handleMouseEnter(index);
            }}
            onMouseLeave={() => {
              handleMouse(index);
            }}
          />
        );
      })}
    </div>
  );
}
