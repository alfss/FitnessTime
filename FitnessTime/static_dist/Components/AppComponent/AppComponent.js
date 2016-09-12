import Header from "../../Containers/HeaderContainer/HeaderContainer";

const propTypes = {
  ChildNode: React.PropTypes.object.isRequired,
  routePathName: React.PropTypes.string.isRequired
};

function App (props) {
  return (
    <div>
      <Header routePathName = {props.routePathName}/>
      { props.ChildNode }
    </div>
  );
}

App.propTypes = propTypes;

export default App;
