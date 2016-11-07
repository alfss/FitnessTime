import Menu from "../../Components/MenuComponent/MenuComponent";

class MenuContainer extends React.Component {
  constructor() {
    super();
    this.toggleMenu = this.toggleMenu.bind(this);
    this.state = {
      isMenuOpen: false
    };
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.toggleMenu);
  }

  toggleMenu(e) {
    e.stopPropagation();
    if (!this.state.isMenuOpen) document.addEventListener("click", this.toggleMenu);
    else document.removeEventListener("click", this.toggleMenu);
    this.setState({ isMenuOpen: !this.state.isMenuOpen});
  }

  render() {
    return (
      <Menu
        {...this.props}
        {...this.state}
        toggleMenu={this.toggleMenu}
      />
    );
  }
}

export default MenuContainer;
