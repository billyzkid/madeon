import React from "react";
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

  componentWillReceiveProps(nextProps) {
    trace(this, this.componentWillReceiveProps, nextProps);

    if (nextProps.isVisible && !this.props.isVisible) {
      this._show();
    } else if (!nextProps.isVisible && this.props.isVisible) {
      this._hide();
    }
  }

  render() {
    trace(this, this.render);

    const classNames = getClassNames("error", {
      hidden: !this.props.isVisible
    });

    return (
      <div className={classNames}>
        {this.props.children}
      </div>
    );
  }

  _show() {
    trace(this, this._show);

    if (this.props.onShow) {
      this.props.onShow();
    }
  }

  _hide() {
    trace(this, this._hide);

    if (this.props.onHide) {
      this.props.onHide();
    }
  }
}