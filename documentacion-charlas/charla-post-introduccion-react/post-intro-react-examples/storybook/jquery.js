import React, { Component } from "react";
import { storiesOf } from "@kadira/storybook";

class LabelContainer extends Component {
  state = {
    shouldUpdate: true,
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props) {
      return this.state.shouldUpdate;
    }
    return true;
  }

  componentDidMount() {
    this.label.innerHTML = "content set by jQuery";
  }

  componentWillUnmount() {
    //
  }

  render() {
    return(
      <div>
        <p ref={label => this.label = label} >{this.props.label}</p>
        <label>
          shouldComponentUpdate
          <input
            type="checkbox"
            checked={this.state.shouldUpdate}
            onChange={(e) => this.setState({ shouldUpdate: e.target.value })}
          />
        </label>
      </div>
    );
  }
}

class Container extends Component {
  state = {
    text: "",
  }

  handleChange = event => this.setState({ text: event.target.value });

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleChange} value={this.state.text} />
        <LabelContainer label={this.state.text} />
      </div>
    )
  }
}

storiesOf("External libraries", module).add("jQuery", () => <Container />);
