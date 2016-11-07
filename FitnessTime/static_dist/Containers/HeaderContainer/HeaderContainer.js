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
        toggleNav = {this.toggleNav}
        isNavShown = {this.state.isNavShown}
        goBack={this.goBack}
        routeName={this.props.routeName}
        parentRoute={this.props.parentRoute}
      />
    );
  }
}

export default withRouter(HeaderContainer);
