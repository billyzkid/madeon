import React from "react";
import createFocusTrap from "focus-trap";
import { KeyCodes } from "../scripts/constants";
import { trace, getClassNames, getHighestZIndex } from "../scripts/functions";
import "./Overlay.scss";

export default class Overlay extends React.PureComponent {
  static propTypes = {
    isInitialFocusEnabled: React.PropTypes.bool,
    isDismissEnabled: React.PropTypes.bool,
    isEscapeEnabled: React.PropTypes.bool,
    isVisible: React.PropTypes.bool,
    onShow: React.PropTypes.func,
    onHide: React.PropTypes.func,
    children: React.PropTypes.node
  }

  constructor(props) {
    super(props);
    trace(this, this.constructor, props);

    this._onClick = this._onClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  componentDidMount() {
    trace(this, this.componentDidMount);

    // See https://github.com/davidtheclark/focus-trap
    this._focusTrapOptions = {
      initialFocus: !this.props.isInitialFocusEnabled ? this.refs.root : null,
      fallbackFocus: this.refs.root,
      escapeDeactivates: false,
      clickOutsideDeactivates: false,
      returnFocusOnDeactivate: true
    };

    this._focusTrap = createFocusTrap(this.refs.root, this._focusTrapOptions);

    if (this.props.isVisible) {
      this._show();
    } else {
      this._hide();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    trace(this, this.componentDidUpdate, prevProps, prevState);

    this._focusTrapOptions.initialFocus = !this.props.isInitialFocusEnabled ? this.refs.root : null;
    this._focusTrapOptions.fallbackFocus = this.refs.root;

    if (!prevProps.isVisible && this.props.isVisible) {
      this._show();
    } else if (prevProps.isVisible && !this.props.isVisible) {
      this._hide();
    }
  }

  componentWillUnmount() {
    trace(this, this.componentWillUnmount);

    this._hide();
  }

  render() {
    trace(this, this.render);

    const classNames = getClassNames("overlay", {
      hidden: !this.props.isVisible
    });

    return (
      <div ref="root" className={classNames} onClick={this._onClick} onKeyDown={this._onKeyDown} tabIndex="-1">
        {this.props.children}
      </div>
    );
  }

  _show() {
    trace(this, this._show);

    this.refs.root.style.zIndex = getHighestZIndex(document.getElementsByClassName("overlay")) || 0;

    this._focusTrap.activate();

    if (this.props.onShow) {
      this.props.onShow();
    }
  }

  _hide() {
    trace(this, this._hide);

    this.refs.root.removeAttribute("style");
    
    this._focusTrap.deactivate();

    if (this.props.onHide) {
      this.props.onHide();
    }
  }

  _onClick(event) {
    trace(this, this._onClick, event);

    if (this.props.isDismissEnabled && event.target === this.refs.root) {
      this._hide();
    }
  }

  _onKeyDown(event) {
    trace(this, this._onKeyDown, event);

    if (this.props.isEscapeEnabled && event.keyCode === KeyCodes.escape) {
      event.preventDefault();
      this._hide();
    }
  }
}