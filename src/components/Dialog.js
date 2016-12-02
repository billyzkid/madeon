import React from "react";
import FocusTrap from "focus-trap-react";
import { trace, getClassNames } from "../scripts/functions";
import "./Dialog.scss";

export default class Dialog extends React.PureComponent {
  static propTypes = {
    isOpen: React.PropTypes.bool,
    onOpen: React.PropTypes.func,
    onClose: React.PropTypes.func,
    initialFocus: React.PropTypes.any,
    fallbackFocus: React.PropTypes.any,
    closeOnEscape: React.PropTypes.bool,
    closeOnClick: React.PropTypes.bool,
    returnFocusOnClose: React.PropTypes.bool,
    children: React.PropTypes.node
  }

  static defaultProps = {
    isOpen: false,
    //initialFocus: ".dialog",
    //fallbackFocus: ".dialog",
    closeOnEscape: true,
    closeOnClick: true,
    returnFocusOnClose: true
  }

  constructor(props) {
    super(props);
    trace(this, this.constructor, props);

    // See https://github.com/davidtheclark/focus-trap
    this._focusTrapOptions = {
      onActivate: props.onOpen,
      onDeactivate: props.onClose,
      initialFocus: props.initialFocus,
      fallbackFocus: props.fallbackFocus,
      escapeDeactivates: props.closeOnEscape,
      clickOutsideDeactivates: props.closeOnClick,
      returnFocusOnDeactivate: props.returnFocusOnClose,
    };
  }

  componentWillReceiveProps(nextProps) {
    trace(this, this.componentWillReceiveProps, nextProps);

    this._focusTrapOptions.onActivate = nextProps.onOpen;
    this._focusTrapOptions.onDeactivate = nextProps.onClose;
    this._focusTrapOptions.initialFocus = nextProps.initialFocus;
    this._focusTrapOptions.fallbackFocus = nextProps.fallbackFocus;
    this._focusTrapOptions.escapeDeactivates = nextProps.closeOnEscape;
    this._focusTrapOptions.clickOutsideDeactivates = nextProps.closeOnClick;
    this._focusTrapOptions.returnFocusOnDeactivate = nextProps.returnFocusOnClose;
  }

  render() {
    trace(this, this.render);

    const classNames = getClassNames("dialog", {
      hidden: !this.props.isOpen
    });

    return (
      <FocusTrap className={classNames} active={this.props.isOpen} focusTrapOptions={this._focusTrapOptions} tabIndex="-1">
        {this.props.children}
      </FocusTrap>
    );
  }
}