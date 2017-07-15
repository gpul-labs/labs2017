import React, { Component, Children } from "react";
import PropTypes from "prop-types";
import { storiesOf } from "@kadira/storybook";

const blueTheme = { color: "#0000bb" };
const redTheme = { color: "#bb0000" };

class Layout extends Component {

  state = {
    theme: blueTheme,
  }

  useRedTheme = () => {
    this.setState({ theme: redTheme });
  }

  useBlueTheme = () => {
    this.setState({ theme: blueTheme });
  }

  render() {
    return (
      <div>
        <a href="#" onClick={this.useRedTheme}>Red theme</a>
        <a href="#" onClick={this.useBlueTheme}>Blue theme</a>
        <div>
          { this.props.children(this.state.theme) }
        </div>
      </div>
    );
  }

}

storiesOf("Children", module).add("Children api proping", () => (
  <Layout>
    { theme => <p style={theme}>This is themified!</p> }
  </Layout>
));

