import React from "react";
import ReactDOM from "react-dom";
import Error from "./Error";

test("renders", () => {
  ReactDOM.render(<Error />, document.createElement("div"));
});