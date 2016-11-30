import React from "react";
import GatewayRegistry from "./GatewayRegistry";

export default class Gateway extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    into: React.PropTypes.string.isRequired,
    children: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.string])
  };

  static contextTypes = {
    gatewayRegistry: React.PropTypes.instanceOf(GatewayRegistry).isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.gatewayRegistry = context.gatewayRegistry;
  }

  componentWillMount() {
    this.renderIntoGatewayNode(this.props);
  }

  componentWillReceiveProps(props) {
    this.renderIntoGatewayNode(props);
  }

  componentWillUnmount() {
    this.gatewayRegistry.removeChild(this.props.into, this.props.id);
  }

  renderIntoGatewayNode(props) {
    this.gatewayRegistry.addChild(props.into, props.children, props.id);
  }

  render() {
    return null;
  }
}