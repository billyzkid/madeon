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
    theme: AppTheme.none
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
      playerState: PlayerState.default,
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

    let playPauseButton;

    if (this.state.playerState === PlayerState.paused) {
      playPauseButton = <Button ref="playPauseButton" isVisible={true} icon="&#xf04b;" title="Play" onClick={this._onPlayButtonClick} />;
    } else if (this.state.playerState === PlayerState.playing) {
      playPauseButton = <Button ref="playPauseButton" isVisible={true} icon="&#xf04c;" title="Pause" onClick={this._onPauseButtonClick} />;
    } else if (this.refs.playPauseButton) {
      playPauseButton = <Button ref="playPauseButton" {...this.refs.playPauseButton.props} isVisible={false} />;
    } else {
      playPauseButton = <Button ref="playPauseButton" isVisible={false} />;
    }

    return (
      <div className={classNames}>
        <div className="splash">
          <span>Loading</span>
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
              <Button isActive={this.state.isShareButtonsVisible} text="Share" onClick={this._onShareButtonClick} />
              <Button isVisible={this.state.isShareButtonsVisible} icon="&#xf064;" title="Share URL" onClick={this._onUrlButtonClick} />
              <Button isVisible={this.state.isShareButtonsVisible} icon="&#xf099;" title="Share on Twitter" onClick={this._onTwitterButtonClick} />
              <Button isVisible={this.state.isShareButtonsVisible} icon="&#xf09a;" title="Share on Facebook" onClick={this._onFacebookButtonClick} />
            </section>
            <section>
              <Button isActive={this.state.isInfoButtonsVisible} text="Info" onClick={this._onInfoButtonClick} />
              <Button isVisible={this.state.isInfoButtonsVisible} text="About" onClick={this._onAboutButtonClick} />
              <Button isVisible={this.state.isInfoButtonsVisible} icon="&#xf287;" title="Connect your Launchpad" onClick={this._onLaunchpadButtonClick} />
              <Button isVisible={this.state.isInfoButtonsVisible} icon="&#xf128;" title="Help!" onClick={this._onHelpButtonClick} />
            </section>
            <section>
              {playPauseButton}
            </section>
            <section>
              <Button isVisible={this.state.playerState === PlayerState.paused || this.state.playerState === PlayerState.playing} icon="&#xf04d;" title="Stop" onClick={this._onStopButtonClick} />
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