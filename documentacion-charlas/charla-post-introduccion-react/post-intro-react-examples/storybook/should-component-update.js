import React, { Component } from "react";
import { storiesOf } from "@kadira/storybook";

//TODO: shouldComponentUpdates with Recompose oh wow
//TODO: show when a component is rendered or not
class Counter extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.value !== this.props.value;
  }

  render() {
    return <div>{this.props.value}</div>;
  }
}

class CounterIncrementer extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ((nextProps.disabled !== this.props.disabled) || (nextProps.handleClick !== this.props.handleClick));
  }

  render() {
    const { handleClick, disabled } = this.props;
    return <button onClick={handleClick} disabled={disabled}>Increment!</button>;
  }
}

class Toggle extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ((nextProps.text !== this.props.text) || (nextProps.handleToggle !== this.props.handleToggle));
  }

  render() {
    return <button onClick={this.props.handleToggle}>{this.props.text}</button>
  }
}

class HideableCounter extends Component {
  state = {
    counter: 0,
    disabled: false,
  }

  handleIncrement = () =>
    this.setState((prevState) => ({counter: prevState.counter + 1}));

  handleToggle = () =>
    this.setState((prevState) => ({ disabled: !prevState.disabled }));

  render() {
    const { counter, disabled } = this.state;

    return (
      <div>
        <Counter value={counter} />
        <CounterIncrementer disabled={disabled} handleClick={this.handleIncrement} />
        <Toggle text={disabled ? "Enable" : "Disable"} handleToggle={this.handleToggle} />
      </div>
    );
  }
}

storiesOf("Optimization", module).add("shouldComponentUpdate", () => <HideableCounter />);
