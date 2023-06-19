import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { TRectangleData } from "../types";
import Rectangle from "./Rectangle";
import Error from "./Error";
import colors from "../data/colors.json";
import { isEven } from "../functions";

const Board = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const stringSizes = searchParams.get("sizes");

  let sizes: Array<number> = [];
  let errorMessage: string = "";

  if (!stringSizes) {
    errorMessage = "Query parameter 'sizes' in the URL is missing";
  } else {
    try {
      sizes = JSON.parse(stringSizes);
    } catch (e) {
      errorMessage =
        "Query parameter 'sizes' in the URL must be an array of numbers";
    }
  }

  if (sizes.length === 0 && !errorMessage) {
    errorMessage = "Query parameter 'sizes' in the URL is empty";
  }

  //  calculating the position, size and colour of rectangles
  const computedSizes: Array<TRectangleData> = useMemo(() => {
    if (sizes.length === 0) {
      return [];
    }

    const sizeOfAll = sizes.reduce((a, b) => a + b, 0);
    const squareSide = Math.sqrt(sizeOfAll);

    //  this is used to scale the square, to be more visible on the screen
    const multiplier = window.innerHeight / squareSide;

    let previousTop = 0;
    let previousLeft = 0;

    return sizes.map((size, i) => {
      const top = previousTop;
      const left = previousLeft;

      const height = isEven(i) ? squareSide - top : size / (squareSide - left);
      const width = isEven(i) ? size / height : squareSide - left;

      if (isEven(i)) {
        previousLeft += width;
      } else {
        previousTop += height;
      }

      return {
        top: top * multiplier,
        left: left * multiplier,
        height: height * multiplier,
        width: width * multiplier,
        size,
        color: colors[i],
      };
    });
  }, [sizes]);

  //  division of a rectangle into two parts
  const split = (index: number): void => {
    const value = sizes[index];
    const firstPart = Math.floor(value / 3);
    const secondPart = value - firstPart;

    const newSizes = [...sizes];
    newSizes.splice(index, 1, firstPart, secondPart);

    searchParams.set("sizes", JSON.stringify(newSizes));
    setSearchParams(searchParams);
  };

  //  merging rectangles
  const merge = (e: React.MouseEvent, firstPartIndex: number): void => {
    e.preventDefault();

    //  if we are on the last item, there is no reason to do anything
    if (firstPartIndex === sizes.length - 1) {
      alert("Can't be done - last item");
      return;
    }

    const firstPart = sizes[firstPartIndex];
    let secondPart = 0;
    let secondPartIndex = firstPartIndex + 1;

    while (secondPart < firstPart * 2 && secondPartIndex < sizes.length) {
      secondPart += sizes[secondPartIndex++];
    }

    //  deciding whether other parts can be merged together or not
    if (
      Math.floor(secondPart / 2) !== firstPart &&
      Math.ceil(secondPart / 2) !== firstPart
    ) {
      alert("Can't be done - can't merge");
      return;
    }

    const newSizes = [...sizes];
    newSizes.splice(
      firstPartIndex,
      secondPartIndex - firstPartIndex,
      firstPart + secondPart
    );

    searchParams.set("sizes", JSON.stringify(newSizes));
    setSearchParams(searchParams);
  };

  if (errorMessage) {
    return <Error message={errorMessage} />;
  }

  return (
    <div className="board">
      {computedSizes.map(({ left, top, height, width, size, color }, index) => (
        <Rectangle
          key={`${top}-${left}`}
          left={left}
          top={top}
          height={height}
          width={width}
          size={size}
          color={color}
          index={index}
          split={split}
          merge={merge}
        />
      ))}
    </div>
  );
};

export default Board;
