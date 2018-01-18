// @flow

import * as React from "react";
import styled from "styled-components";

import { ZoomPanel } from "./zoom-panel";

import * as types from "./image/types";
import { Node } from "./image/node";
import { Selection } from "./image/selection";

type Props = {|
  nodes: types.Node[]
|};

type State = {|
  zoom: number,

  offsetX: number,
  offsetY: number,

  isMoving: boolean,
  movingStartX: number,
  movingStartY: number,
  movingCurrentX: number,
  movingCurrentY: number,

  activeNodeId: ?string
|};

const width = 640;
const height = 480;

export class Canvas extends React.Component<Props, State> {
  state = {
    zoom: 1,

    offsetX: 40,
    offsetY: 40,

    isMoving: false,
    movingStartX: 0,
    movingStartY: 0,
    movingCurrentX: 0,
    movingCurrentY: 0,

    activeNodeId: null
  };

  componentDidMount() {
    document.addEventListener("mouseup", this.handleMouseUp);
    document.addEventListener("mousemove", this.handleMouseMove);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleMouseUp);
    document.removeEventListener("mousemove", this.handleMouseMove);
  }

  handleZoomChange = (zoom: number) => {
    this.setState({ zoom });
  };

  handleMouseDown = (event: *) => {
    event.stopPropagation();
    event.preventDefault();

    this.setState({
      isMoving: true,
      movingStartX: event.screenX,
      movingStartY: event.screenY,
      movingCurrentX: event.screenX,
      movingCurrentY: event.screenY
    });
  };

  handleMouseMove = (event: *) => {
    if (this.state.isMoving) {
      this.setState({
        movingCurrentX: event.screenX,
        movingCurrentY: event.screenY
      });
    }
  };

  handleMouseUp = () => {
    if (this.state.isMoving) {
      this.setState({
        isMoving: false,
        movingStartX: 0,
        movingStartY: 0,
        movingCurrentX: 0,
        movingCurrentY: 0,
        offsetX: this.state.offsetX + this.movingOffsetX,
        offsetY: this.state.offsetY + this.movingOffsetY
      });
    }
  };

  handleNodeCLick = (activeNodeId: string) => {
    this.setState({ activeNodeId });
  };

  handleSelectionClick = () => {
    this.setState({ activeNodeId: null });
  };

  get movingOffsetX(): number {
    return (
      (this.state.movingStartX - this.state.movingCurrentX) / this.state.zoom
    );
  }

  get movingOffsetY(): number {
    return (
      (this.state.movingStartY - this.state.movingCurrentY) / this.state.zoom
    );
  }

  get cameraX(): number {
    return -(this.movingOffsetX + this.state.offsetX);
  }

  get cameraY(): number {
    return -(this.movingOffsetY + this.state.offsetY);
  }

  renderSelection() {
    const activeNode = this.props.nodes.find(
      node => node.id === this.state.activeNodeId
    );

    if (activeNode) {
      return (
        <Selection node={activeNode} onClick={this.handleSelectionClick} />
      );
    }
  }

  renderNodes() {
    return (
      <g>
        {this.props.nodes.map(node => (
          <Node node={node} onClick={this.handleNodeCLick} />
        ))}
      </g>
    );
  }

  render() {
    return (
      <Wrapper>
        <ImageWrapper
          viewBox={`0 0 ${width} ${height}`}
          onMouseDown={this.handleMouseDown}
        >
          <g
            transform={`
              translate(${width / 2} ${height / 2})
              scale(${this.state.zoom})
              translate(${this.cameraX} ${this.cameraY})
            `}
          >
            {this.renderNodes()}
            {this.renderSelection()}
          </g>
        </ImageWrapper>
        <ZoomPanelWrapper>
          <ZoomPanel value={this.state.zoom} onChange={this.handleZoomChange} />
        </ZoomPanelWrapper>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  position: relative;

  cursor: pointer;

  // TODO: remove width and margin
  width: ${width}px;
  height: ${height}px;

  margin: 10px;

  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

const ImageWrapper = styled.svg`
  width: 100%;
  height: 100%;
`;

const ZoomPanelWrapper = styled.div`
  position: absolute;

  display: flex;

  justify-content: center;

  left: 0;
  right: 0;
  bottom: 16px;
`;
