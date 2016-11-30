import React from "react";
import GatewayRegistry from "./GatewayRegistry";

export default class GatewayProvider extends React.Component {
  static propTypes = {
    children: React.PropTypes.element,
  };

  static childContextTypes = {
    gatewayRegistry: React.PropTypes.instanceOf(GatewayRegistry).isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.gatewayRegistry = new GatewayRegistry();
  }

  getChildContext() {
    return { gatewayRegistry: this.gatewayRegistry };
  }

  render() {
    return this.props.children;
  }
}