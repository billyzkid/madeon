import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { AppTheme } from "./scripts/constants";
import "./index.scss";

ReactDOM.render(<App />, document.getElementById("madeon1"));
ReactDOM.render(<App theme={AppTheme.dark} />, document.getElementById("madeon2"));
ReactDOM.render(<App theme={AppTheme.light} />, document.getElementById("madeon3"));