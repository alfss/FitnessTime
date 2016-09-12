import Header from "../../Containers/HeaderContainer/HeaderContainer";
import Modal from "react-modal";

const propTypes = {
  ChildNode: React.PropTypes.object.isRequired,
  routePathName: React.PropTypes.string.isRequired
};

function App (props) {
  Modal.setAppElement("body");
  
  return (
    <div>
      <Header routePathName = {props.routePathName}/>
      { props.ChildNode }
      <Modal isOpen={props.isDataFetching} overlayClassName="modal__overlay" className="modal__app" />
    </div>
  );
}

App.propTypes = propTypes;

export default App;
