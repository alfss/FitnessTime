"use strict";

import AppComponent from "../../Components/AppComponent/AppComponent";

class App extends React.Component {
  constructor() {
    super();
    this.getRoutePathName = this.getRoutePathName.bind(this);
    this.state = { routePathName: "" };
  }

  getRoutePathName(name) {
    this.setState({ routePathName: name });
  }

  render() {
    return (
      <AppComponent
        children={this.props.children}
        getRoutePathName={this.getRoutePathName}
        routePathName={this.state.routePathName}
      />
    );
  }
}

export default App;
