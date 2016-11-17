import ReactDOM from "react-dom";

import routes from "./routes";
import { Router, browserHistory } from "react-router";

import "normalize.css/normalize.css";
import "./Styles/main.styl";

import "./Html/MainPage.html";

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("app")) {
    ReactDOM.render(
      <Router history={browserHistory}>{routes}</Router>,
      document.getElementById("app")
    );
  }
});
