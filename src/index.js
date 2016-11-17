import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { AppTheme } from "./scripts/constants";
import "./index.scss";

ReactDOM.render(<App theme={AppTheme.dark} />, document.getElementById("madeon"));