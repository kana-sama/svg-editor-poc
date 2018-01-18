import * as React from "react";
import styled from "styled-components";

import * as types from "./types";

type Box = { x: number, y: number, width: number, height: number };

function boxFromNode(node: types.Node): Box {
  console.log(node);
  switch (node.type) {
    case "rectangle":
      return node;
    case "circle":
      return { ...node, width: node.radius * 2, height: node.radius * 2 };
  }
}

function boxForSelection(box: Box): Box {
  return {
    x: box.x - 3,
    y: box.y - 3,
    width: box.width + 6,
    height: box.height + 6
  };
}

const SelectionStroke = styled.rect`
  fill: transparent;
  stroke: black;
  stroke-width: 3;
  stroke-dasharray: 5 5;
  stroke-linecap: square;
  position: relative;
  z-index: 9999;
`;

type Props = {|
  node: types.Node,
  onClick: () => void
|};

export const Selection = ({ node, onClick }: Props) => (
  <SelectionStroke {...boxForSelection(boxFromNode(node))} onClick={onClick} />
);
