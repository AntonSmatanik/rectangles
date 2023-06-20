import React from "react";
import { TRectangleComponent } from "../types";

const Rectangle = React.memo(
  ({
    left,
    top,
    height,
    width,
    size,
    color,
    ...rootDOMAttributes
  }: TRectangleComponent) => (
    <div
      style={{
        left: `${left}px`,
        top: `${top}px`,
        height: `${height}px`,
        width: `${width}px`,
        backgroundColor: color,
        border: `outset ${color} 0.15rem`,
      }}
      className="rectangle"
      title={size.toString()}
      {...rootDOMAttributes}
    >
      {size}
    </div>
  ),
  (prevProps, nextProps) => {
    if (
      prevProps.left === nextProps.left &&
      prevProps.top === nextProps.top &&
      prevProps.size === nextProps.size
    ) {
      return true;
    }
    return false;
  }
);

export default Rectangle;
