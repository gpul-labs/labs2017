import React, { Component } from "react";
import { storiesOf } from "@kadira/storybook";

class ControlledForm extends Component {

  state = {
    value: "",
  };

  handleChange = event => this.setState({ value: event.target.value });

  handleSubmit = event => {
    event.preventDefault();
    alert(this.state.value);
  }

  render() {
    return (
      <form>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}>Submit!</button>
      </form>
    );
  }
}

storiesOf("Form", module).add("Form controlled", () => <ControlledForm />);

