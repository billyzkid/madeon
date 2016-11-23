import React from "react";
import Overlay from "./Overlay";
import { trace, getClassNames } from "../scripts/functions";
import "./Error.scss";

export default class Error extends React.PureComponent {
  static propTypes = {
    isVisible: React.PropTypes.bool,
    onShow: React.PropTypes.func,
    onHide: React.PropTypes.func,
    children: React.PropTypes.node
  }

  constructor(props) {
    super(props);
    trace(this, this.constructor, props);
  }

  render() {
    trace(this, this.render);

    const classNames = getClassNames("error", {
      hidden: !this.props.isVisible
    });

    return (
      <div className={classNames}>
        <Overlay isVisible={this.props.isVisible} onShow={this.props.onShow} onHide={this.props.onHide}>
          <div className="content">{this.props.children}</div>
        </Overlay>
      </div>
    );
  }
}