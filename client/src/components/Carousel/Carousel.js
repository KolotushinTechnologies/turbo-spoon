import React, { useState, useEffect, Children, cloneElement } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import "./Carousel.css";

const PAGE_WIDTH = 400;

const Carousel = ({ children }) => {
  const [pages, setPages] = useState([]);
  const [offset, setOffset] = useState(0);

  const handleLeftArrowClick = () => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset + PAGE_WIDTH;

      console.log(newOffset);

      return Math.min(newOffset, 0);
    });
  };

  const handleRightArrowClick = () => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset - PAGE_WIDTH;

      const maxOffset = -(PAGE_WIDTH * (pages.length - 1));

      console.log(newOffset, maxOffset);

      return Math.max(newOffset, maxOffset);
    });
  };

  useEffect(() => {
    setPages(
      Children.map(children, (child) => {
        return cloneElement(child, {
          style: {
            heigth: "100%",
            minWidth: `${PAGE_WIDTH}px`,
            maxWidth: `${PAGE_WIDTH}px`
          }
        });
      })
    );
  }, []);

  return (
    <div className="main-container">
      <FaChevronLeft className="arrow" onClick={handleLeftArrowClick} />
      <div className="slider-window">
        <div
          className="all-pages-container"
          style={{
            transform: `translateX(${offset}px)`
          }}
        >
          {children}
        </div>
      </div>
      <FaChevronRight className="arrow" onClick={handleRightArrowClick} />
    </div>
  );
};

export default Carousel;
