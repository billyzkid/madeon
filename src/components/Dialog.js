import React from "react";
import Button from "./Button";
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

    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    trace(this, this.componentWillReceiveProps, nextProps);

    if (nextProps.isOpen && !this.props.isOpen) {
      this._open();
    } else if (!nextProps.isOpen && this.props.isOpen) {
      this._close();
    }
  }

  render() {
    trace(this, this.render);

    const classNames = getClassNames("dialog", {
      hidden: !this.props.isOpen
    });

    return (
      <div className={classNames}>
        {this.props.children}
        <Button icon="&#xf00d;" title="Close dialog" onClick={this._onCloseButtonClick}>Close</Button>
      </div>
    );
  }

  _open() {
    trace(this, this._open);

    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }

  _close() {
    trace(this, this._close);

    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  _onCloseButtonClick(event) {
    trace(this, this._onCloseButtonClick, event);
    
    event.stopPropagation();
    this._close();
  }
}