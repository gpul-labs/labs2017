import React, { Component, Children } from "react";
import PropTypes from "prop-types";
import { storiesOf } from "@kadira/storybook";

class LocaleProvider extends Component {
  static childContextTypes = {
    locale: PropTypes.string,
  };

  getChildContext() {
    return {
      locale: this.props.locale,
    };
  }

  render() {
    return Children.only(this.props.children);
  }
}

const CurrentLocale = (props, { locale }) => <p>Current locale: {locale}</p>;

CurrentLocale.contextTypes = LocaleProvider.childContextTypes;

const translations = {
  es: {
    greeting: "Hola!",
  },
};

const T = ({ id }, { locale }) => <span>{translations[locale][id]}</span>;

T.contextTypes = LocaleProvider.childContextTypes;

storiesOf("Context", module).add("Deep proping", () => (
  <LocaleProvider locale="es">
    <div>
      <CurrentLocale />
      <T id="greeting" />
    </div>
  </LocaleProvider>
));
