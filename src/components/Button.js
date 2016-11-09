import React from "react";
import { trace, getClassNames } from "../scripts/functions";
import "./Button.scss";

export default class Button extends React.PureComponent {
  static propTypes = {
    isActive: React.PropTypes.bool,
    isVisible: React.PropTypes.bool,
    icon: React.PropTypes.string,
    label: React.PropTypes.string,
    title: React.PropTypes.string,
    onClick: React.PropTypes.func
  }

  static defaultProps = {
    isActive: false,
    isVisible: true
  }

  constructor(props) {
    super(props);
    trace(this, this.constructor, props);
  }

  render() {
    trace(this, this.render);

    const classNames = getClassNames("button", {
      active: this.props.isActive,
      visible: this.props.isVisible
    });

    return <button type="button" className={classNames} icon={this.props.icon} label={this.props.label} title={this.props.title} onClick={this.props.onClick} />;
  }
}