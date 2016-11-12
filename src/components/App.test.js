import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

test("renders", () => {
  ReactDOM.render(<App />, document.createElement("div"));
});