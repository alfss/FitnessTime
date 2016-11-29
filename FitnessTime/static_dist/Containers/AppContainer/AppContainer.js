import AppComponent from "../../Components/AppComponent/AppComponent";
import NotFoundPage from "../../Containers/NotFound404Container/NotFound404Container";

class App extends React.Component {
  constructor() {
    super();
    this.spinnerTimeout;
    this.getRouteName = this.getRouteName.bind(this);
    this.getParentRoute = this.getParentRoute.bind(this);
    this.renderNotFoundPage = this.renderNotFoundPage.bind(this);
    this.setFetchingData = this.setFetchingData.bind(this);
    this.setAppState = this.setAppState.bind(this);
    this.setUser = this.setUser.bind(this);
    this.state = {
      user: "",
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

  setFetchingData(fetching) {
    if (fetching) {
      this.spinnerTimeout = setTimeout(()=>{
        this.setState({ isDataFetching: fetching });
      }, 1000);
    } else {
      clearTimeout(this.spinnerTimeout);
      this.setState({ isDataFetching: fetching });
    }
  }

  setAppState(state = "default") {
    return () => this.setState({ appState: state });
  }

  setUser(user) {
    this.setState({ user });
  }

  render() {
    const children = React.cloneElement(this.props.children, {
      renderNotFoundPage: this.renderNotFoundPage,
      getRouteName: this.getRouteName,
      getParentRoute: this.getParentRoute,
      setFetchingData: this.setFetchingData,
      appState: this.state.appState,
      setAppState: this.setAppState,
      setUser: this.setUser
    });
    const notFoundPage = <NotFoundPage
                          renderNotFoundPage={this.renderNotFoundPage}
                          routeParams={this.props.params}
                          setFetchingData={this.setFetchingData}
                        />;
    const ChildNode = this.state.isPageExist ? children : notFoundPage;
    return (
      <AppComponent
        {...this.state}
        ChildNode={ChildNode}
        routeParams={this.props.params}
        setAppState={this.setAppState}
      />
    );
  }
}

export default App;
