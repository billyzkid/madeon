import React from "react";
import { trace, getClassNames } from "../scripts/functions";
import "./Button.scss";

export default class Button extends React.PureComponent {
  static propTypes = {
    isActive: React.PropTypes.bool,
    isVisible: React.PropTypes.bool,
    icon: React.PropTypes.string,
    text: React.PropTypes.string,
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

    const classNames = getClassNames({
      active: this.props.isActive,
      hidden: !this.props.isVisible
    });
    
    return <button type="button" className={classNames} data-icon={this.props.icon} data-text={this.props.text} title={this.props.title} onClick={this.props.onClick} />;
  }
}