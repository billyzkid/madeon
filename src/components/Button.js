import React from "react";
import { trace, getClassNames } from "../scripts/functions";
import "./Button.scss";

export default class Button extends React.PureComponent {
  static propTypes = {
    icon: React.PropTypes.string,
    title: React.PropTypes.string,
    isActive: React.PropTypes.bool,
    isVisible: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    children: React.PropTypes.node
  }

  static defaultProps = {
    isVisible: true
  }

  constructor(props) {
    super(props);
    trace(this, this.constructor, props);
  }

  render() {
    trace(this, this.render);

    const classNames = getClassNames({
      active: this.props.isActive,
      hidden: !this.props.isVisible
    });

    return (
      <button type="button" className={classNames} data-icon={this.props.icon} title={this.props.title} onClick={this.props.onClick}>
        <span>{this.props.children}</span>
      </button>
    );
  }
}