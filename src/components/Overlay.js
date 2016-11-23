import React from "react";
import FocusTrap from "focus-trap-react";
import { KeyCodes } from "../scripts/constants";
import { trace, getClassNames } from "../scripts/functions";
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

    // See https://github.com/davidtheclark/focus-trap-react
    this._focusTrapOptions = {
      escapeDeactivates: false
    };
  }

  componentDidMount() {
    trace(this, this.componentDidMount);

    this._updateFocusTrapOptions();

    if (this.props.isVisible) {
      this._show();
    } else {
      this._hide();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    trace(this, this.componentDidUpdate, prevProps, prevState);

    this._updateFocusTrapOptions();

    if (!prevProps.isVisible && this.props.isVisible) {
      this._show();
    } else if (prevProps.isVisible && !this.props.isVisible) {
      this._hide();
    }
  }

  render() {
    trace(this, this.render);

    const classNames = getClassNames("overlay", {
      hidden: !this.props.isVisible
    });

    // Explicit truthy/falsy conversion required
    const isFocusTrapActive = !!this.props.isVisible;

    return (
      <FocusTrap ref="focusTrap" className={classNames} active={isFocusTrapActive} focusTrapOptions={this._focusTrapOptions} onClick={this._onClick} onKeyDown={this._onKeyDown} tabIndex="-1">
        {this.props.children}
      </FocusTrap>
    );
  }

  _updateFocusTrapOptions() {
    trace(this, this._updateFocusTrapOptions);

    this._focusTrapOptions.initialFocus = !this.props.isInitialFocusEnabled ? this.refs.focusTrap.node : null;
    this._focusTrapOptions.fallbackFocus = this.refs.focusTrap.node;
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

  _onClick(event) {
    trace(this, this._onClick, event);

    if (this.props.isDismissEnabled && event.target === this.refs.focusTrap.node) {
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