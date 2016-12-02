import React from "react";
import FocusTrap from "focus-trap-react";
import { trace, getClassNames } from "../scripts/functions";
import "./Error.scss";

export default class Error extends React.PureComponent {
  static propTypes = {
    isVisible: React.PropTypes.bool,
    onShow: React.PropTypes.func,
    onHide: React.PropTypes.func,
    initialFocus: React.PropTypes.any,
    fallbackFocus: React.PropTypes.any,
    hideOnEscape: React.PropTypes.bool,
    hideOnClick: React.PropTypes.bool,
    returnFocusOnHide: React.PropTypes.bool,
    children: React.PropTypes.node
  }

  static defaultProps = {
    isVisible: false,
    //initialFocus: ".error",
    //fallbackFocus: ".error",
    hideOnEscape: false,
    hideOnClick: false,
    returnFocusOnHide: true
  }

  constructor(props) {
    super(props);
    trace(this, this.constructor, props);

    // See https://github.com/davidtheclark/focus-trap
    this._focusTrapOptions = {
      onActivate: props.onShow,
      onDeactivate: props.onHide,
      initialFocus: props.initialFocus,
      fallbackFocus: props.fallbackFocus,
      escapeDeactivates: props.hideOnEscape,
      clickOutsideDeactivates: props.hideOnClick,
      returnFocusOnDeactivate: props.returnFocusOnHide,
    };
  }

  componentWillReceiveProps(nextProps) {
    trace(this, this.componentWillReceiveProps, nextProps);

    this._focusTrapOptions.onActivate = nextProps.onShow;
    this._focusTrapOptions.onDeactivate = nextProps.onHide;
    this._focusTrapOptions.initialFocus = nextProps.initialFocus;
    this._focusTrapOptions.fallbackFocus = nextProps.fallbackFocus;
    this._focusTrapOptions.escapeDeactivates = nextProps.hideOnEscape;
    this._focusTrapOptions.clickOutsideDeactivates = nextProps.hideOnClick;
    this._focusTrapOptions.returnFocusOnDeactivate = nextProps.returnFocusOnHide;
  }

  render() {
    trace(this, this.render);

    const classNames = getClassNames("error", {
      hidden: !this.props.isVisible
    });

    return (
      <FocusTrap className={classNames} active={this.props.isVisible} focusTrapOptions={this._focusTrapOptions} tabIndex="-1">
        {this.props.children}
      </FocusTrap>
    );
  }
}