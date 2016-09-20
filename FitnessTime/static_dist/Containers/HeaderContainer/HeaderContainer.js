"use strict";

import Header from "../../Components/HeaderComponent/HeaderComponent";
import { withRouter } from "react-router";

class HeaderContainer extends React.Component {
  constructor() {
    super();
    this.showNav = this.showNav.bind(this);
    this.hideNav = this.hideNav.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  showNav() {
    document.querySelector(".header__nav-overlay").classList.add("header__nav-overlay_open");
    document.querySelector(".header__list").classList.add("header__list_open");
    document.addEventListener("click", this.hideNav);
  }

  hideNav() {
    document.querySelector(".header__nav-overlay").classList.remove("header__nav-overlay_open");
    document.querySelector(".header__list").classList.remove("header__list_open");
    document.removeEventListener("click", this.hideNav);
  }

  goBack() {
    this.props.router.push(this.props.parentRoute);
  }

  render() {
    return (
      <Header
        checkRoute={this.props.router.isActive}
        showNav={this.showNav}
        goBack={this.goBack}
        routeName={this.props.routeName}
        parentRoute={this.props.parentRoute}
      />
    );
  }
}

export default withRouter(HeaderContainer);
