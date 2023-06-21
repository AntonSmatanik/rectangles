import React from "react";
import { TRectangleComponent } from "../types";

const Rectangle = ({
  left,
  top,
  height,
  width,
  size,
  color,
  ...rootDOMAttributes
}: TRectangleComponent) => {
  console.log("size", size);
  return (
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
  );
};

const memoizedRectangle = React.memo(Rectangle, (prevProps, nextProps) => {
  if (
    prevProps.top === nextProps.top &&
    prevProps.left === nextProps.left &&
    prevProps.size === nextProps.size &&
    prevProps.onClick === nextProps.onClick &&
    prevProps.onContextMenu === nextProps.onContextMenu
  )
    return true;

  return false;
});

export default memoizedRectangle;
