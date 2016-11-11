import AppComponent from "../../Components/AppComponent/AppComponent";

class App extends React.Component {
  constructor() {
    super();
    this.getRouteName = this.getRouteName.bind(this);
    this.getParentRoute = this.getParentRoute.bind(this);
    this.renderNotFoundPage = this.renderNotFoundPage.bind(this);
    this.setFethingData = this.setFethingData.bind(this);
    this.setAppState = this.setAppState.bind(this);
    this.state = {
      routeName: "",
      parentRoute: "",
      isPageExist: true,
      isDataFetching: false,
      appState: "default"
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

  setFethingData(fetching) {
    this.setState({ isDataFetching: fetching });
  }

  setAppState(state = "default") {
    return () => this.setState({ appState: state });
  }

  render() {
    const ChildNode = React.cloneElement(this.props.children, {
      renderNotFoundPage: this.renderNotFoundPage,
      getRouteName: this.getRouteName,
      getParentRoute: this.getParentRoute,
      setFethingData: this.setFethingData,
      appState: this.state.appState,
      setAppState: this.setAppState
    });

    return (
      <AppComponent
        {...this.state}
        ChildNode={ChildNode}
        routeParams={this.props.params}
        renderNotFoundPage={this.renderNotFoundPage}
        setAppState={this.setAppState}
      />
    );
  }
}

export default App;
