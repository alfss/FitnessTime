import Header from "../../Containers/HeaderContainer/HeaderContainer";
import Modal from "react-modal";

function App ({
  ChildNode,
  routeName,
  parentRoute,
  isDataFetching,
  routeParams,
  setAppState
}) {
  Modal.setAppElement("body");
  return (
    <div className="app">
      <Header routeName={routeName} parentRoute={parentRoute} setAppState={setAppState} routeParams={routeParams}/>
      <div className="app__container">
        { ChildNode }
      </div>
      <Modal isOpen={isDataFetching} overlayClassName="modal__overlay modal__overlay_app" className="modal__app" />
    </div>
  );
}

export default App;
