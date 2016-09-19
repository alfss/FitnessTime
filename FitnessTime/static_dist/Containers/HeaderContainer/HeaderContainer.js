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
    document.querySelector(".header__nav").classList.remove("hidden");
    document.addEventListener("click", this.hideNav);
  }

  hideNav() {
    document.querySelector(".header__nav").classList.add("hidden");
    document.removeEventListener("click", this.hideNav);
  }

  goBack() {
    this.props.router.goBack();
  }

  render() {
    console.log(this.props.router.isActive("/", true));
    return (
      <Header
        checkRoute={this.props.router.isActive}
        showNav={this.showNav}
        goBack={this.goBack}
        routePathName={this.props.routePathName}
      />
    );
  }
}

export default withRouter(HeaderContainer);
