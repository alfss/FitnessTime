"use strict";

import AppComponent from "../../Components/AppComponent/AppComponent";

class App extends React.Component {
  constructor() {
    super();
    this.getRoutePathName = this.getRoutePathName.bind(this);
    this.checkIsPageExist = this.checkIsPageExist.bind(this);
    this.setFethingData = this.setFethingData.bind(this);
    this.state = {
      routePathName: "",
      isPageExist: true,
      isDataFetching: false
    };
  }

  getRoutePathName(name) {
    this.setState({ routePathName: name });
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
      getRoutePathName: this.getRoutePathName,
      setFethingData: this.setFethingData
    });

    return (
      <AppComponent
        ChildNode={ChildNode}
        isPageExist={this.state.isPageExist}
        routePathName={this.state.routePathName}
        isDataFetching={this.state.isDataFetching}
      />
    );
  }
}

export default App;
