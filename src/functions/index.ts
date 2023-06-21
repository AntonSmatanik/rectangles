import colors from "../data/colors.json";

export const pickColor = (index: number): string =>
  colors[index % colors.length];

export const isEven = (val: number): boolean => (val % 2 === 0 ? true : false);

export const isArrayOfNumbers = (array: Array<any>): boolean =>
  array?.every((e) => typeof e === "number");
