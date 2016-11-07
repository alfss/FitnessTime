import AppComponent from "../../Components/AppComponent/AppComponent";

class App extends React.Component {
  constructor() {
    super();
    this.getRouteName = this.getRouteName.bind(this);
    this.getParentRoute = this.getParentRoute.bind(this);
    this.renderNotFoundPage = this.renderNotFoundPage.bind(this);
    this.setFethingData = this.setFethingData.bind(this);
    this.state = {
      routeName: "",
      parentRoute: "",
      isPageExist: true,
      isDataFetching: false
    };
  }

  getRouteName(name) {
    this.setState({ routeName: name });
  }

  getParentRoute(path) {
    this.setState({ parentRoute: path});
  }

  renderNotFoundPage(bool) {
    this.setState({ isPageExist: !bool });
  }

  setFethingData(fetching){
    this.setState({ isDataFetching: fetching });
  }

  render() {
    const ChildNode = React.cloneElement(this.props.children, {
      renderNotFoundPage: this.renderNotFoundPage,
      getRouteName: this.getRouteName,
      getParentRoute: this.getParentRoute,
      setFethingData: this.setFethingData
    });

    return (
      <AppComponent
        ChildNode={ChildNode}
        routeParams={this.props.params}
        renderNotFoundPage={this.renderNotFoundPage}
        isPageExist={this.state.isPageExist}
        routeName={this.state.routeName}
        parentRoute={this.state.parentRoute}
        isDataFetching={this.state.isDataFetching}
      />
    );
  }
}

export default App;
