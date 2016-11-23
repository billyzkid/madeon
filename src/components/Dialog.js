import React from "react";
import { trace, getClassNames } from "../scripts/functions";
import "./Dialog.scss";

export default class Dialog extends React.PureComponent {
  static propTypes = {
    isOpen: React.PropTypes.bool,
    onOpen: React.PropTypes.func,
    onClose: React.PropTypes.func,
    children: React.PropTypes.node
  }

  constructor(props) {
    super(props);
    trace(this, this.constructor, props);
  }

  render() {
    trace(this, this.render);

    const classNames = getClassNames("dialog", {
      hidden: !this.props.isOpen
    });

    return (
      <div className={classNames}>
        {this.props.children}
      </div>
    );
  }
}