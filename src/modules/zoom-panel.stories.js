// @flow

import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { ZoomPanel } from "./zoom-panel";

storiesOf("ZoomPanel", module)
  .add("with normal value", () => (
    <ZoomPanel value={1} onChange={action("onChange")} />
  ))
  .add("with minimum value", () => (
    <ZoomPanel value={0.5} onChange={action("onChange")} />
  ))
  .add("with maximum value", () => (
    <ZoomPanel value={2} onChange={action("onChange")} />
  ));
