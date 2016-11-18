import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { AppTheme } from "./scripts/constants";
import "./index.scss";

ReactDOM.render(<App />, document.getElementById("container1"));
ReactDOM.render(<App theme={AppTheme.madeon} />, document.getElementById("container2"));