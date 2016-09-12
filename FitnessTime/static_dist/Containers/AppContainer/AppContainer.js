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
    const ChildNode = React.cloneElement(this.props.children, { getRoutePathName: this.getRoutePathName });

    return (
      <AppComponent
        ChildNode={ChildNode}
        routePathName={this.state.routePathName}
      />
    );
  }
}

export default App;
