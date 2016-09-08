"use strict";

import Header from "../HeaderContainer/HeaderContainer";

class App extends React.Component {
  constructor() {
    super();
    this.getRoutePathName = this.getRoutePathName.bind(this);
    this.state = {
      routePathName: ""
    };
  }

  getRoutePathName(name) {
    this.setState({
      routePathName: name
    });
  }

  render() {
    const ChildNode = React.cloneElement(this.props.children, { getRoutePathName: this.getRoutePathName });
    return (
      <div>
        <Header
          routePathName = {this.state.routePathName}
        />
        { ChildNode }
      </div>
    );
  }
}

export default App;
