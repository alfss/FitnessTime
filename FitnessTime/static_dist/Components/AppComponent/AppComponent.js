import Header from "../../Containers/HeaderContainer/HeaderContainer";
import Modal from "react-modal";
import NotFoundPage from "../../Containers/NotFound404Container/NotFound404Container";

const propTypes = {
  ChildNode: React.PropTypes.object.isRequired,
  routePathName: React.PropTypes.string.isRequired
};

function App (props) {
  Modal.setAppElement("body");

  const page = (props.isPageExist) ?  props.ChildNode : <NotFoundPage checkIsPageExist={props.checkIsPageExist} routeParams={props.routeParams}/>;

  return (
    <div>
      <Header routePathName = {props.routePathName}/>
      { page }
      <Modal isOpen={props.isDataFetching} overlayClassName="modal__overlay" className="modal__app" />
    </div>
  );
}

App.propTypes = propTypes;

export default App;
