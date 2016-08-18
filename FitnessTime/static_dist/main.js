import ReactDOM from "react-dom";

import routes from "./routes";
import { Router, hashHistory } from "react-router";

import "normalize.css/normalize.css";
import "./Styles/main.scss";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Router history={hashHistory}>{routes}</Router>,
    document.getElementById("app")
  );
});
