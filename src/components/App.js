import React from "react";
import Button from "./Button";
import Dialog from "./Dialog";
import Error from "./Error";
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
    this._onReloadLinkClick = this._onReloadLinkClick.bind(this);
    this._onUrlDialogOpen = this._onUrlDialogOpen.bind(this);
    this._onUrlDialogClose = this._onUrlDialogClose.bind(this);
    this._onMidiDialogOpen = this._onMidiDialogOpen.bind(this);
    this._onMidiDialogClose = this._onMidiDialogClose.bind(this);
    this._onLoadErrorShow = this._onLoadErrorShow.bind(this);
    this._onLoadErrorHide = this._onLoadErrorHide.bind(this);
    this._onAudioContextUnsupportedErrorShow = this._onAudioContextUnsupportedErrorShow.bind(this);
    this._onAudioContextUnsupportedErrorHide = this._onAudioContextUnsupportedErrorHide.bind(this);

    this.state = {
      theme: props.theme,
      appState: AppState.default,
      playerState: PlayerState.playing,
      isShareButtonsVisible: false,
      isInfoButtonsVisible: false,
      isUrlDialogOpen: false,
      isMidiDialogOpen: false,
      isLoadErrorVisible: false,
      isAudioContextUnsupportedErrorVisible: false
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
      [this.state.theme]: this.state.theme !== AppTheme.default,
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
          <div className="dialogs">
            <Dialog isOpen={this.state.isUrlDialogOpen} onOpen={this._onUrlDialogOpen} onClose={this._onUrlDialogClose}>
              <h1>Your mix URL</h1>
              <p>Copy the following URL, and then share it with the world.</p>
              <input type="url" value={this._getUrl()} readOnly />
            </Dialog>
            <Dialog isOpen={this.state.isMidiDialogOpen} onOpen={this._onMidiDialogOpen} onClose={this._onMidiDialogClose}>
              <h1>Enable Web MIDI API</h1>
              <p>Copy the following URL, paste it into a new tab, press Enter, and then click Enable.</p>
              <input type="url" value="chrome://flags/#enable-web-midi" readOnly />
            </Dialog>
          </div>
          <div className="errors">
            <Error isVisible={this.state.isLoadErrorVisible} onShow={this._onLoadErrorShow} onHide={this._onLoadErrorHide}>
              <p>Something went horribly wrong.</p>
              <p>Please <a href="" onClick={this._onReloadLinkClick}>reload</a> the page or try back later.</p>
            </Error>
            <Error isVisible={this.state.isAudioContextUnsupportedErrorVisible} onShow={this._onAudioContextUnsupportedErrorShow} onHide={this._onAudioContextUnsupportedErrorHide}>
              <p>This browser does not support the fancy new Web Audio API.</p>
              <p>Please use the latest <a href="http://apple.com/safari/" target="_blank">Safari</a>, <a href="http://google.com/chrome/" target="_blank">Chrome</a>, <a href="http://mozilla.org/firefox/" target="_blank">Firefox</a> or <a href="http://opera.com/" target="_blank">Opera</a> for the best experience.</p>
            </Error>
          </div>
        </div>
      </div>
    );
  }

  _getUrl() {
    try {
      return window.location.href;
    } catch (error) {
      // Ignore errors thrown during testing
      return "";
    }
  }

  _onShareButtonClick(event) {
    trace(this, this._onShareButtonClick, event);
    this.setState({ isShareButtonsVisible: !this.state.isShareButtonsVisible });
  }

  _onUrlButtonClick(event) {
    trace(this, this._onUrlButtonClick, event);
    this.setState({ isUrlDialogOpen: true }); // FIXME
  }

  _onTwitterButtonClick(event) {
    trace(this, this._onTwitterButtonClick, event);
    this.setState({ isMidiDialogOpen: true }); // FIXME
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
    this.setState({ isLoadErrorVisible: true }); // FIXME
  }

  _onLaunchpadButtonClick(event) {
    trace(this, this._onLaunchpadButtonClick, event);
    this.setState({ isAudioContextUnsupportedErrorVisible: true }); // FIXME
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

  _onReloadLinkClick(event) {
    trace(this, this._onReloadLinkClick, event);
    event.preventDefault();
    window.location.reload(true);
  }

  _onUrlDialogOpen() {
    trace(this, this._onUrlDialogOpen);
    this.setState({ isUrlDialogOpen: true });
  }

  _onUrlDialogClose() {
    trace(this, this._onUrlDialogClose);
    this.setState({ isUrlDialogOpen: false });
  }

  _onMidiDialogOpen() {
    trace(this, this._onMidiDialogOpen);
    this.setState({ isMidiDialogOpen: true });
  }

  _onMidiDialogClose() {
    trace(this, this._onMidiDialogClose);
    this.setState({ isMidiDialogOpen: false });
  }

  _onLoadErrorShow() {
    trace(this, this._onLoadErrorShow);
    this.setState({ isLoadErrorVisible: true });
  }

  _onLoadErrorHide() {
    trace(this, this._onLoadErrorHide);
    this.setState({ isLoadErrorVisible: false });
  }

  _onAudioContextUnsupportedErrorShow() {
    trace(this, this._onAudioContextUnsupportedErrorShow);
    this.setState({ isAudioContextUnsupportedErrorVisible: true });
  }

  _onAudioContextUnsupportedErrorHide() {
    trace(this, this._onAudioContextUnsupportedErrorHide);
    this.setState({ isAudioContextUnsupportedErrorVisible: false });
  }
}