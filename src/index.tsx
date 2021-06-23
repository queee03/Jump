import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Demo } from "@/components";
import Game from "@/pages/Game";

ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
  document.getElementById("root")
);
