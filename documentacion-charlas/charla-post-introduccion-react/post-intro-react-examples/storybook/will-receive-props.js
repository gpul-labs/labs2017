import React, { Component } from "react";
import { storiesOf } from "@kadira/storybook";

class Container extends Component {
  state = {
    factor: 1,
  };

  handleClick = () =>
    this.setState({
      factor: this.state.factor * 2,
    });

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Multiply by {this.state.factor * 2}</button>
        <UnawareButton factor={this.state.factor} />
        <AwareButton factor={this.state.factor} />
      </div>
    );
  }
}

class UnawareButton extends Component {
  state = {
    factor: this.props.factor,
    count: 0,
  };

  handleClick = () =>
    this.setState({
      count: this.state.count + 1,
    });

  render() {
    return <button onClick={this.handleClick}>Count is {this.state.count * this.state.factor}</button>;
  }
}

class AwareButton extends UnawareButton {
  componentWillReceiveProps(nextProps) {
    if (nextProps.factor !== this.props.factor) {
      this.setState({
        factor: nextProps.factor,
      });
    }
  }

  render() {
    return <button onClick={this.handleClick}>Count is {this.state.count * this.state.factor}</button>;
  }
}

storiesOf("State", module).add("willReceiveProps", () => <Container />);
