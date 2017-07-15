import React, { Component, Children } from "react";
import * as PropTypes from "prop-types";
import { storiesOf } from "@kadira/storybook";


const createStore = reducer => {

  let state = reducer(undefined, { type: "@@INIT@@" });
  let subscribers = [];

  const notify = () => subscribers.forEach(s => s(state));

  return {
    getState: () => {
      return state;
    },

    subscribe: (subscriber) => {
      subscribers = [...subscribers, subscriber];
      return () => {
        subscribers = subscribers.filter(s => s !== subscriber);
      }
    },

    dispatch(action) {
      state = reducer(state, action);
      notify();
    },
  };
};


class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store
    }
  }

  render() {
    return Children.only(this.props.children);
  }
}

Provider.childContextTypes = {
  store: PropTypes.object,
};


const initialState = {
  count: 0,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + 1,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

const connect = (stateToProps = () =>({}), dispatchToProps = () => ({})) => WrappedComponent => {

  class Wrapper extends Component {

    constructor (props, context) {
      super(props, context);
      this.state = stateToProps(context.store.getState());
      context.store.subscribe(newState => this.setState(newState));
    }

    render() {
      return <WrappedComponent {...this.props} {...stateToProps(this.state)} {...dispatchToProps(this.context.store.dispatch)} />;
    }
  }

  Wrapper.contextTypes = Provider.childContextTypes;

  return Wrapper;
}

const Counter = ({ count }) => <span>{count}</span>;

const ConnectedCounter = connect(
  state => ({
    count: state.count
  })
)(Counter);

const Button = ({ onClick }) => <button onClick={onClick}>+1</button>;

const ConnectedButton = connect(
  undefined,
  dispatch => ({
    onClick: () => dispatch({ type: "INCREMENT" }),
  })
)(Button);

const App = () => (
  <Provider store={store}>
    <div>
      <ConnectedCounter />
      <ConnectedButton />
    </div>
  </Provider>
);

storiesOf("Poor man redux", module).add("redux", () => <App />);
