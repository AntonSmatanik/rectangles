export type TErrorData = {
  message: string;
  code?: number;
};

export type TRectangleData = {
  gridRowStart: number;
  gridRowEnd: number;
  gridColumnStart: number;
  gridColumnEnd: number;
  size: number;
  color: string;
};

export type TRectangleComponent = TRectangleData & {
  onClick: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
};
