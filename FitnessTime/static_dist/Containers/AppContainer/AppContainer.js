"use strict";

import AppComponent from "../../Components/AppComponent/AppComponent";

class App extends React.Component {
  constructor() {
    super();
    this.getRouteName = this.getRouteName.bind(this);
    this.getParentRoute = this.getParentRoute.bind(this);
    this.checkIsPageExist = this.checkIsPageExist.bind(this);
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

  checkIsPageExist(bool) {
    this.setState({ isPageExist: bool });
  }

  setFethingData(fetching){
    this.setState({ isDataFetching: fetching });
  }

  render() {
    const ChildNode = React.cloneElement(this.props.children, {
      checkIsPageExist: this.checkIsPageExist,
      getRouteName: this.getRouteName,
      getParentRoute: this.getParentRoute,
      setFethingData: this.setFethingData
    });

    return (
      <AppComponent
        ChildNode={ChildNode}
        routeParams={this.props.params}
        checkIsPageExist={this.checkIsPageExist}
        isPageExist={this.state.isPageExist}
        routeName={this.state.routeName}
        parentRoute={this.state.parentRoute}
        isDataFetching={this.state.isDataFetching}
      />
    );
  }
}

export default App;
