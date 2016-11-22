import React from "react";
import Button from "./Button";
import { AppTheme, AppState, PlayerState } from "../scripts/constants";
import { trace, getClassNames, delay } from "../scripts/functions";
import "./App.scss";

export default class App extends React.PureComponent {
  static propTypes = {
    theme: React.PropTypes.string
  }

  static defaultProps = {
    theme: AppTheme.default
  }

  constructor(props) {
    super(props);
    trace(this, this.constructor, props);

    this._onShareButtonClick = this._onShareButtonClick.bind(this);
    this._onUrlButtonClick = this._onUrlButtonClick.bind(this);
    this._onTwitterButtonClick = this._onTwitterButtonClick.bind(this);
    this._onFacebookButtonClick = this._onFacebookButtonClick.bind(this);
    this._onInfoButtonClick = this._onInfoButtonClick.bind(this);
    this._onAboutButtonClick = this._onAboutButtonClick.bind(this);
    this._onLaunchpadButtonClick = this._onLaunchpadButtonClick.bind(this);
    this._onHelpButtonClick = this._onHelpButtonClick.bind(this);
    this._onPlayButtonClick = this._onPlayButtonClick.bind(this);
    this._onPauseButtonClick = this._onPauseButtonClick.bind(this);
    this._onStopButtonClick = this._onStopButtonClick.bind(this);

    this.state = {
      theme: props.theme,
      appState: AppState.default,
      playerState: PlayerState.playing,
      isShareButtonsVisible: false,
      isInfoButtonsVisible: false
    };
  }

  componentDidMount() {
    trace(this, this.componentDidMount);

    delay().then(() => {
      this.setState({ appState: AppState.loading });
    }).then(() => delay(2000)).then(() => {
      this.setState({ appState: AppState.loaded });
    }).catch((error) => {
      this.setState({ appState: AppState.failed });
    });
  }

  render() {
    trace(this, this.render);

    const classNames = getClassNames("app", {
      [this.state.theme]: this.state.theme !== AppTheme.none,
      [this.state.appState]: this.state.appState !== AppState.default
    });

    return (
      <div className={classNames}>
        <div className="splash">
          <span>Loading...</span>
        </div>
        <div className="chrome">
          <div className="background" />
          <div className="header">
            <a href="http://madeon.fr" target="_blank">Madeon's Adventure Machine</a>
          </div>
          <div className="footer">
            <a href="http://wmas.it" target="_blank">We Made This</a>
          </div>
          <div className="buttons">
            <section>
              <Button title="Share your mix" isActive={this.state.isShareButtonsVisible} onClick={this._onShareButtonClick}>Share</Button>
              <Button icon="&#xf064;" title="Copy mix URL" isVisible={this.state.isShareButtonsVisible} onClick={this._onUrlButtonClick}>Copy URL</Button>
              <Button icon="&#xf099;" title="Share mix on Twitter" isVisible={this.state.isShareButtonsVisible} onClick={this._onTwitterButtonClick}>Twitter</Button>
              <Button icon="&#xf09a;" title="Share mix on Facebook" isVisible={this.state.isShareButtonsVisible} onClick={this._onFacebookButtonClick}>Facebook</Button>
            </section>
            <section>
              <Button title="More information" isActive={this.state.isInfoButtonsVisible} onClick={this._onInfoButtonClick}>Info</Button>
              <Button title="About the application" isVisible={this.state.isInfoButtonsVisible} onClick={this._onAboutButtonClick}>About</Button>
              <Button icon="&#xf287;" title="Connect your Launchpad" isVisible={this.state.isInfoButtonsVisible} onClick={this._onLaunchpadButtonClick}>Launchpad</Button>
              <Button icon="&#xf128;" title="Help me!" isVisible={this.state.isInfoButtonsVisible} onClick={this._onHelpButtonClick}>Help</Button>
            </section>
            <section>
              {this.state.playerState === PlayerState.paused ? <Button ref="playPauseButton" icon="&#xf04b;" title="Resume player" onClick={this._onPlayButtonClick}>Play</Button> :
                this.state.playerState === PlayerState.playing ? <Button ref="playPauseButton" icon="&#xf04c;" title="Pause player" onClick={this._onPauseButtonClick}>Pause</Button> :
                  this.refs.playPauseButton ? <Button ref="playPauseButton" {...this.refs.playPauseButton.props} isVisible={false} /> :
                    <Button ref="playPauseButton" isVisible={false} />}
            </section>
            <section>
              <Button icon="&#xf04d;" title="Stop player" isVisible={this.state.playerState === PlayerState.paused || this.state.playerState === PlayerState.playing} onClick={this._onStopButtonClick}>Stop</Button>
            </section>
          </div>
        </div>
      </div>
    );
  }

  _onShareButtonClick(event) {
    trace(this, this._onShareButtonClick, event);
    this.setState({ isShareButtonsVisible: !this.state.isShareButtonsVisible });
  }

  _onUrlButtonClick(event) {
    trace(this, this._onUrlButtonClick, event);
  }

  _onTwitterButtonClick(event) {
    trace(this, this._onTwitterButtonClick, event);
  }

  _onFacebookButtonClick(event) {
    trace(this, this._onFacebookButtonClick, event);
  }

  _onInfoButtonClick(event) {
    trace(this, this._onInfoButtonClick, event);
    this.setState({ isInfoButtonsVisible: !this.state.isInfoButtonsVisible });
  }

  _onAboutButtonClick(event) {
    trace(this, this._onAboutButtonClick, event);
  }

  _onLaunchpadButtonClick(event) {
    trace(this, this._onLaunchpadButtonClick, event);
  }

  _onHelpButtonClick(event) {
    trace(this, this._onHelpButtonClick, event);
  }

  _onPlayButtonClick(event) {
    trace(this, this._onPlayButtonClick, event);
    this.setState({ playerState: PlayerState.playing });
  }

  _onPauseButtonClick(event) {
    trace(this, this._onPauseButtonClick, event);
    this.setState({ playerState: PlayerState.paused });
  }

  _onStopButtonClick(event) {
    trace(this, this._onStopButtonClick, event);
    this.setState({ playerState: PlayerState.default });
  }
}