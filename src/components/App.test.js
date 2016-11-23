import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

test("renders", () => {
  var s = ReactDOM.render(<App />, document.createElement("div"));
  console.log(s);
});