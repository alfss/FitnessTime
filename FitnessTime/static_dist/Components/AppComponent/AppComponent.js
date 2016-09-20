import Header from "../../Containers/HeaderContainer/HeaderContainer";
import Modal from "react-modal";
import NotFoundPage from "../../Containers/NotFound404Container/NotFound404Container";

const propTypes = {
  ChildNode: React.PropTypes.object.isRequired,
  routeName: React.PropTypes.string.isRequired,
  parentRoute: React.PropTypes.string
};

function App (props) {
  Modal.setAppElement("body");

  const page = (props.isPageExist) ?  props.ChildNode : <NotFoundPage checkIsPageExist={props.checkIsPageExist} routeParams={props.routeParams}/>;

  return (
    <div className="app">
      <Header routeName={props.routeName} parentRoute={props.parentRoute}/>
      { page }
      <Modal isOpen={props.isDataFetching} overlayClassName="modal__overlay" className="modal__app" />
    </div>
  );
}

App.propTypes = propTypes;

export default App;
