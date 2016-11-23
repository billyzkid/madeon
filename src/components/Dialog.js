import React from "react";
import Button from "./Button";
import Overlay from "./Overlay";
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
        <Overlay isInitialFocusEnabled isDismissEnabled isEscapeEnabled isVisible={this.props.isOpen} onShow={this.props.onOpen} onHide={this.props.onClose}>
          <div className="content">
            {this.props.children}
            <Button icon="&#xf00d;" title="Close dialog" onClick={this.props.onClose}>Close</Button>
          </div>
        </Overlay>
      </div>
    );
  }
}