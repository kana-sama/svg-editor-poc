import * as React from "react";

import * as types from "./types";

type Props = {|
  node: types.Node,
  onClick: string => void
|};

export class Node extends React.Component<Props> {
  handleClick = () => {
    this.props.onClick(this.props.node.id);
  };

  get commonProps() {
    return {
      fill: this.props.node.fill,
      onClick: this.handleClick
    };
  }

  render() {
    switch (this.props.node.type) {
      case "rectangle":
        return (
          <rect
            {...this.commonProps}
            x={this.props.node.x}
            y={this.props.node.y}
            width={this.props.node.width}
            height={this.props.node.height}
          />
        );

      case "circle":
        return (
          <circle
            {...this.commonProps}
            cx={this.props.node.x + this.props.node.radius}
            cy={this.props.node.y + this.props.node.radius}
            r={this.props.node.radius}
          />
        );
    }
  }
}
