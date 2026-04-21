import { React, useState } from "react";
import { FaStar } from "react-icons/fa";
import "./index.css";

export default function StarRating({ noOfStars = 5 }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  function handleClick(getCurrentIndex) {
    setRating(getCurrentIndex);
  }

  function handleMouseEnter(getCurrentIndex) {
    setHover(getCurrentIndex);
  }

  function handleMouse() {
    setHover(rating);
  }

  return (
    <div className="star-rating">
      <h1>Star Rating Component</h1>
      {[...Array(noOfStars)].map((_, index) => {
        index += 1;
        return (
          <FaStar
            key={index}
            className={index <= (hover || rating) ? "active" : "inactive"}
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
