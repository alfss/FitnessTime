import Header from "../../Containers/HeaderContainer/HeaderContainer";

const propTypes = {
  children: React.PropTypes.object.isRequired,
  getRoutePathName: React.PropTypes.func.isRequired,
  routePathName: React.PropTypes.string.isRequired
};

function App (props) {
  const ChildNode = React.cloneElement(props.children, { getRoutePathName: props.getRoutePathName });
  return (
    <div>
      <Header routePathName = {props.routePathName}/>
      { ChildNode }
    </div>
  );
}

App.propTypes = propTypes;

export default App;
