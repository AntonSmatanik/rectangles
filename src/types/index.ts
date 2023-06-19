export type TErrorData = {
  message: string;
  code?: number;
};

export type TRectangleData = {
  left: number;
  top: number;
  height: number;
  width: number;
  size: number;
  color: string;
};

export type TRectangleComponent = TRectangleData & {
  index: number;
  split: (size: number) => void;
  merge: (e: React.MouseEvent, size: number) => void;
};