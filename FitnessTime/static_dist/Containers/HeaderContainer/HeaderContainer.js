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
    document.querySelector(".header__mask").classList.add("header__mask_open");
    document.querySelector(".header__nav").classList.add("header__nav_open");
    document.addEventListener("click", this.hideNav);
  }

  hideNav() {
    document.querySelector(".header__mask").classList.remove("header__mask_open");
    document.querySelector(".header__nav").classList.remove("header__nav_open");
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
