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
}