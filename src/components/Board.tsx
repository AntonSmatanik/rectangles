import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { TRectangleData } from "../types";
import Rectangle from "./Rectangle";
import Error from "./Error";
import colors from "../data/colors.json";
import { isEven, onlyNumbers } from "../functions";

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

  if (!onlyNumbers(sizes)) {
    errorMessage =
      "Query parameter 'sizes' in the URL must be an array of numbers";
  }

  //  calculating the position, size and colour of rectangles
  const computedSizes: Array<TRectangleData> = useMemo(() => {
    if (sizes.length === 0) {
      return [];
    }

    const sizeOfAll = sizes.reduce((a, b) => a + b, 0);
    const squareSide = Math.sqrt(sizeOfAll);

    //  used to scale the square, to be more visible on the screen
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

    if (value < 3) {
      alert("Can't be done - item size is too small");
      return;
    }

    const firstPart = Math.floor(value / 3);
    const secondPart = value - firstPart;

    const newSizes = [...sizes];
    newSizes.splice(index, 1, firstPart, secondPart);

    searchParams.set("sizes", JSON.stringify(newSizes));
    setSearchParams(searchParams);
  };

  //  merging rectangles
  const merge = (e: React.MouseEvent, startIndex: number): void => {
    e.preventDefault();

    //  if we are on the last item, there is no reason to do anything
    if (startIndex === sizes.length - 1) {
      alert("Can't be done - last item");
      return;
    }

    const firstPart = sizes[startIndex];
    let otherParts = 0;
    let endIndex = startIndex + 1;

    while (otherParts < firstPart * 2 && endIndex < sizes.length) {
      otherParts += sizes[endIndex++];
    }

    //  deciding whether other parts can be merged together or not
    if (
      Math.trunc(otherParts / 2) !== firstPart &&
      Math.trunc(otherParts / 2) !== firstPart + 1
    ) {
      alert("Can't be done - can't merge");
      return;
    }

    const newSizes = [...sizes];
    newSizes.splice(startIndex, endIndex - startIndex, firstPart + otherParts);

    searchParams.set("sizes", JSON.stringify(newSizes));
    setSearchParams(searchParams);
  };

  if (errorMessage) {
    return <Error message={errorMessage} />;
  }

  return (
    <div className="board">
      {computedSizes.map((params, index) => (
        <Rectangle
          key={`${params.top}-${params.left}`}
          {...params}
          index={index}
          split={split}
          merge={merge}
        />
      ))}
    </div>
  );
};

export default Board;
