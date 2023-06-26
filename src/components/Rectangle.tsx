import React from "react";
import { TRectangleComponent } from "../types";

const Rectangle = ({
  gridRowStart,
  gridRowEnd,
  gridColumnStart,
  gridColumnEnd,
  size,
  color,
  ...rootDOMAttributes
}: TRectangleComponent) => (
  <div
    style={{
      gridRowStart,
      gridRowEnd,
      gridColumnStart,
      gridColumnEnd,
      backgroundColor: color,
      border: `outset ${color} 0.15rem`,
    }}
    className="rectangle"
    title={size.toString()}
    {...rootDOMAttributes}
  >
    {size}
  </div>
);

const memoizedRectangle = React.memo(Rectangle, (prevProps, nextProps) => {
  if (
    prevProps.gridRowStart === nextProps.gridRowStart &&
    prevProps.gridColumnStart === nextProps.gridColumnStart &&
    prevProps.size === nextProps.size
  )
    return true;

  return false;
});

export default memoizedRectangle;
