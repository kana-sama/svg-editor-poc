// @flow

import * as React from "react";

export type Props = {||};
export type State = {| counterValue: number |};

export class App extends React.Component<Props, State> {
  state = {
    counterValue: 0
  };

  handleCounterIncrement = () => {
    this.setState(state => ({ counterValue: state.counterValue + 1 }));
  };

  handleCounterDecrement = () => {
    this.setState(state => ({ counterValue: state.counterValue - 1 }));
  };

  render() {
    return (
      <div>
        <button onClick={this.handleCounterDecrement}>-</button>
        <div>{this.state.counterValue}</div>
        <button onClick={this.handleCounterIncrement}>+</button>
      </div>
    );
  }
}
