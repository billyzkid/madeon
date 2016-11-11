import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Theme } from "./scripts/constants";
import "./index.scss";

ReactDOM.render(<App theme={Theme.none} />, document.getElementById("madeon1"));
ReactDOM.render(<App theme={Theme.dark} />, document.getElementById("madeon2"));
ReactDOM.render(<App theme={Theme.light} />, document.getElementById("madeon3"));