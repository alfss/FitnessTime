import Header from "../../Containers/HeaderContainer/HeaderContainer";
import Modal from "react-modal";
import NotFoundPage from "../../Containers/NotFound404Container/NotFound404Container";

function App ({
  isPageExist,
  ChildNode,
  renderNotFoundPage,
  routeName,
  parentRoute,
  isDataFetching,
  routeParams,
  setAppState
}) {
  Modal.setAppElement("body");

  const page = (isPageExist) ?  ChildNode : <NotFoundPage renderNotFoundPage={renderNotFoundPage} routeParams={routeParams}/>;

  return (
    <div className="app">
      <Header routeName={routeName} parentRoute={parentRoute} setAppState={setAppState}/>
      <div className="app__container">
        { page }
      </div>
      <Modal isOpen={isDataFetching} overlayClassName="modal__overlay modal__overlay_app" className="modal__app" />
    </div>
  );
}

export default App;
