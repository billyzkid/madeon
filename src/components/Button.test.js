import React from "react";
import ReactDOM from "react-dom";
import Button from "./Button";

test("renders", () => {
  ReactDOM.render(<Button />, document.createElement("div"));
});