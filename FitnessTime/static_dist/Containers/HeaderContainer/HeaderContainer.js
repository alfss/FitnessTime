import Header from "../../Components/HeaderComponent/HeaderComponent";
import { withRouter } from "react-router";

class HeaderContainer extends React.Component {
  constructor() {
    super();
    this.toggleNav = this.toggleNav.bind(this);
    this.goBack = this.goBack.bind(this);
    this.state = {
      isNavShown: false
    };
  }

  toggleNav() {
    this.setState({ isNavShown: !this.state.isNavShown });
  }

  goBack() {
    this.props.router.push(this.props.parentRoute);
  }

  render() {
    return (
      <Header
        {...this.props}
        {...this.state}
        toggleNav = {this.toggleNav}
        goBack={this.goBack}
      />
    );
  }
}

export default withRouter(HeaderContainer);
