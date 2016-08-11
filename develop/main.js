import ReactDOM from "react-dom";

import routes from "./routes";
import { Router, hashHistory } from "react-router";

import "normalize.css";
import "./Styles/main.scss";

ReactDOM.render(
  <Router history={hashHistory}>{routes}</Router>,
  document.getElementById("app")
);
