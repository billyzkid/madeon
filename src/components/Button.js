import React from "react";
import { trace, getClassNames } from "../scripts/functions";
import "./Button.scss";

export default class Button extends React.PureComponent {
  static propTypes = {
    icon: React.PropTypes.string,
    label: React.PropTypes.string,
    title: React.PropTypes.string,
    isActive: React.PropTypes.bool,
    onClick: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    trace(this, this.constructor, props);
  }

  render() {
    trace(this, this.render);

    const classNames = getClassNames("button", {
      active: this.props.isActive
    });

    return <button type="button" className={classNames} icon={this.props.icon} label={this.props.label} title={this.props.title} onClick={this.props.onClick} />;
  }
}