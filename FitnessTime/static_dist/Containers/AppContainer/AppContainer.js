"use strict";

import AppComponent from "../../Components/AppComponent/AppComponent";

class App extends React.Component {
  constructor() {
    super();
    this.getRoutePathName = this.getRoutePathName.bind(this);
    this.setFethingData = this.setFethingData.bind(this);
    this.state = {
      routePathName: "",
      isDataFetching: false
    };
  }

  getRoutePathName(name) {
    this.setState({ routePathName: name });
  }

  setFethingData(fetching){
    this.setState({ isDataFetching: fetching });
  }

  render() {
    const ChildNode = React.cloneElement(this.props.children, {
      getRoutePathName: this.getRoutePathName,
      setFethingData: this.setFethingData
    });

    return (
      <AppComponent
        ChildNode={ChildNode}
        routePathName={this.state.routePathName}
        isDataFetching={this.state.isDataFetching}
      />
    );
  }
}

export default App;
