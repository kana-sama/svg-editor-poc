// @flow

import React, { Component } from "react";
import styled from "styled-components";
import * as normalized from "normalized-styled-components";
import { lighten, darken } from "polished";

type Props = {|
  value: number,
  onChange: number => void
|};

type State = {||};

const maxZoom = 2;
const minZoom = 0.5;
const zoomStep = 0.1;

function fixNumber(number: number): number {
  return Math.round(number * 10) / 10;
}

export class ZoomPanel extends Component<Props, State> {
  handleZoomIn = () => {
    const newValue = fixNumber(this.props.value + zoomStep);
    if (newValue <= maxZoom) {
      this.props.onChange(newValue);
    }
  };

  handleZoomOut = () => {
    const newValue = fixNumber(this.props.value - zoomStep);
    if (newValue >= minZoom) {
      this.props.onChange(newValue);
    }
  };

  get valueInPercents(): string {
    return `${(this.props.value * 100).toFixed()} %`;
  }

  render() {
    return (
      <Wrapper>
        <Button
          onClick={this.handleZoomOut}
          disabled={this.props.value === minZoom}
        >
          -
        </Button>
        <Value>{this.valueInPercents}</Value>
        <Button
          onClick={this.handleZoomIn}
          disabled={this.props.value === maxZoom}
        >
          +
        </Button>
      </Wrapper>
    );
  }
}

const color = "#555";

export const Wrapper = styled.div`
  display: flex;

  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
`;

export const Button = styled(normalized.Button)`
  display: flex;

  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;

  font-weight: bold;
  color: ${color};

  border: 0;

  background-color: #fff;

  cursor: pointer;

  :hover {
    color: ${darken(0.2, color)};
  }

  :disabled {
    color: ${lighten(0.2, color)};

    cursor: not-allowed;
  }
`;

export const Value = styled.div`
  display: flex;

  width: 70px;

  align-items: center;
  justify-content: center;

  border: 1px solid #eee;
  border-top: 0;
  border-bottom: 0;

  background-color: #fff;

  font-family: sans-serif;
  color: ${color};
`;
