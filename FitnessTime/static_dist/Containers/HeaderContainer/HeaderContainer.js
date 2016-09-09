"use strict";
import Header from "../../Components/HeaderComponent/HeaderComponent";

class HeaderContainer extends React.Component {
  constructor() {
    super();
    this.showNav = this.showNav.bind(this);
    this.hideNav = this.hideNav.bind(this);
  }

  showNav() {
    document.querySelector(".header__nav").classList.remove("hidden");
    document.addEventListener("click", this.hideNav);
  }

  hideNav() {
    document.querySelector(".header__nav").classList.add("hidden");
    document.removeEventListener("click", this.hideNav);
  }

  render() {
    return (
      <Header
        showNav={this.showNav}
        routePathName={this.props.routePathName}
      />
    );
  }
}

export default HeaderContainer;
