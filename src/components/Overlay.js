import React from "react";
import { trace, getClassNames } from "../scripts/functions";
import "./Overlay.scss";

export default class Overlay extends React.PureComponent {
  static propTypes = {
    isVisible: React.PropTypes.bool
  }

  static defaultProps = {
    isVisible: false
  }

  constructor(props) {
    super(props);
    trace(this, this.constructor, props);
  }

  render() {
    trace(this, this.render);

    const classNames = getClassNames("overlay", {
      hidden: !this.props.isVisible
    });

    return (
      <div className={classNames} >
        {this.props.children}
      </div>
    );
  }
}