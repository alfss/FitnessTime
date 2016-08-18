"use strict";
import Header from "../../Components/HeaderComponent/HeaderComponent";

class HeaderContainer extends React.Component {
  constructor() {
    super();
    this.showNav = this.showNav.bind(this);
    this.state = {
      isNavShown : false
    };
  }

  showNav() {
    const headerNav = document.querySelector(".header__nav");

    if (this.state.isNavShown) headerNav.style.display = "";
    else headerNav.style.display = "block";

    this.setState({
      isNavShown: !this.state.isNavShown
    });
  }

  render() {
    return (
      <Header showNav={this.showNav}/>
    );
  }
}

export default HeaderContainer;
