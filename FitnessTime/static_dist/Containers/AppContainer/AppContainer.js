"use strict";

import AppComponent from "../../Components/AppComponent/AppComponent";

class App extends React.Component {
  constructor() {
    super();
    this.getRouteName = this.getRouteName.bind(this);
    this.checkIsPageExist = this.checkIsPageExist.bind(this);
    this.setFethingData = this.setFethingData.bind(this);
    this.state = {
      routePathName: "",
      isPageExist: true,
      isDataFetching: false
    };
  }

  getRouteName(name) {
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
      getRouteName: this.getRouteName,
      setFethingData: this.setFethingData
    });

    return (
      <AppComponent
        ChildNode={ChildNode}
        routeParams={this.props.params}
        checkIsPageExist={this.checkIsPageExist}
        isPageExist={this.state.isPageExist}
        routePathName={this.state.routePathName}
        isDataFetching={this.state.isDataFetching}
      />
    );
  }
}

export default App;
