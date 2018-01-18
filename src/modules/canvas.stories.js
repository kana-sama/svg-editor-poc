// @flow

import * as React from "react";
import { storiesOf } from "@storybook/react";

import { Canvas } from "./canvas";

storiesOf("Canvas", module).add("normal", () => (
  <Canvas
    nodes={[
      {
        id: "1",
        type: "rectangle",
        x: -50,
        y: -50,
        width: 100,
        height: 100,
        fill: "red"
      },
      {
        id: "2",
        type: "circle",
        x: 0,
        y: 0,
        radius: 50,
        fill: "blue"
      }
    ]}
  />
));
