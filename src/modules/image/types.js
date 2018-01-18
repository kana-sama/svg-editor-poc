// @flow

type Rectangle = {|
  id: string,
  type: "rectangle",
  x: number,
  y: number,
  width: number,
  height: number,
  fill: string
|};

type Circle = {|
  id: string,
  type: "circle",
  x: number,
  y: number,
  radius: number,
  fill: string
|};

export type Node = Rectangle | Circle;
