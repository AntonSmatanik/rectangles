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
    index,
    split,
    merge,
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
      onClick={() => split(index)}
      onContextMenu={(e) => merge(e, index)}
      title={size.toString()}
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
