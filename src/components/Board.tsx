import React, { useCallback, useMemo, useRef } from "react";
import { TRectangleData } from "../types";
import Rectangle from "./Rectangle";
import Error from "./Error";

import { isEven, pickColor } from "../functions";
import useParseParam from "../hooks/useParseParam";
import { useSearchParams } from "react-router-dom";
import { queryParam } from "../data";

const Board = () => {
  const sizesRef: React.MutableRefObject<number[]> = useRef([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { errorMessage } = useParseParam(searchParams, queryParam, sizesRef);

  //  calculating the position, size and colour of rectangles
  const rectangleData: TRectangleData[] = useMemo(() => {
    if (sizesRef.current.length === 0) {
      return [];
    }

    const sizeOfAll = sizesRef.current.reduce((a, b) => a + b, 0);
    const squareSide = Math.sqrt(sizeOfAll);
    const density = 10;

    let previousTop = 0;
    let previousLeft = 0;

    return sizesRef.current.map((size, i) => {
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
        gridRowStart: Math.round(top * density) + 1,
        gridColumnStart: Math.round(left * density) + 1,
        gridRowEnd: Math.round((top + height) * density) + 1,
        gridColumnEnd: Math.round((left + width) * density) + 1,
        size,
        color: pickColor(i),
      };
    });
  }, [sizesRef.current]);

  //  division of a rectangle into two parts
  const split = useCallback((index: number): void => {
    const value = sizesRef.current[index];

    if (value < 3) {
      alert("Can't be done - item size is too small");
      return;
    }

    const firstPart = Math.floor(value / 3);
    const secondPart = value - firstPart;

    const newSizes = [...sizesRef.current];
    newSizes.splice(index, 1, firstPart, secondPart);

    searchParams.set(queryParam, JSON.stringify(newSizes));
    setSearchParams(searchParams);
  }, []);

  //  merging rectangles
  const merge = useCallback((e: React.MouseEvent, startIndex: number): void => {
    e.preventDefault();

    //  if we are on the last item, there is no reason to do anything
    if (startIndex === sizesRef.current.length - 1) {
      alert("Can't be done - last item");
      return;
    }

    const firstPart = sizesRef.current[startIndex];
    let otherParts = 0;
    let endIndex = startIndex + 1;

    while (otherParts < firstPart * 2 && endIndex < sizesRef.current.length) {
      otherParts += sizesRef.current[endIndex++];
    }

    //  deciding whether other parts can be merged together or not
    if (
      Math.trunc(otherParts / 2) !== firstPart &&
      Math.trunc(otherParts / 2) !== firstPart + 1
    ) {
      alert("Can't be done - can't merge");
      return;
    }

    const newSizes = [...sizesRef.current];
    newSizes.splice(startIndex, endIndex - startIndex, firstPart + otherParts);

    searchParams.set(queryParam, JSON.stringify(newSizes));
    setSearchParams(searchParams);
  }, []);

  if (errorMessage) {
    return <Error message={errorMessage} />;
  }

  return (
    <div className="board">
      {rectangleData.map((params, index) => (
        <Rectangle
          key={`${params.gridRowStart}-${params.gridColumnStart}-${params.size}`}
          {...params}
          onClick={() => split(index)}
          onContextMenu={(e) => merge(e, index)}
        />
      ))}
    </div>
  );
};

export default Board;
