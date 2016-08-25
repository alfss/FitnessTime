import Stopwatch from "../../Containers/StopwatchContainer/StopwatchContainer";
import { Link } from "react-router";
import Modal from "react-modal";

const propTypes = {
  data: React.PropTypes.object.isRequired,
  formatRestTimer: React.PropTypes.func.isRequired,
  isModalOpen: React.PropTypes.bool.isRequired,
  toggleModal: React.PropTypes.func.isRequired,
  deleteItem: React.PropTypes.func.isRequired,
  toggleOpenFullData: React.PropTypes.func.isRequired
};

function WorkoutItem (props) {
  Modal.setAppElement("body");
  console.log(props.data.example_photo);
  return (
    <div className="workout__item" key={props.data.uuid}>
      <div className="workout__name" onClick={props.toggleOpenFullData}>
        {props.data.title}
      </div>
      <div className="workout__full-data">
        <div className="workout__info">
        <div className="workout__description">
            <div className="workout__repeats"><span className="workout__description-name">Повторы:</span>{props.data.repeat}</div>
            <div className="workout__weight"><span className="workout__description-name">Вес:</span>{props.data.weight}</div>
            <div className="workout__rest"><span className="workout__description-name">Отдых:</span>{props.formatRestTimer(props.data.rest_time)}</div>
          </div>
          <div className={props.data.example_photo ? "workout__image" : "workout__no-image"}>
            <img width="100" height="100" src={props.data.example_photo}  onClick={props.data.example_photo ? props.toggleModal : null} />
          </div>
        </div>
        <Stopwatch rest={props.formatRestTimer(props.data.rest_time)} repeats={props.data.repeat}/>
        <div className="workout__controls">
          <Link to={`/form/workout/${props.data.training}/${props.data.uuid}`}>
            <button className="workout__control-button workout__control-button_edit"></button>
          </Link>
          <button className="workout__control-button workout__control-button_delete" onClick={props.deleteItem(props.data.uuid)}></button>
        </div>
      </div>
      <Modal isOpen={props.isModalOpen} onRequestClose={props.toggleModal} overlayClassName="modal__overlay" className="modal__content">
        <img src={props.data.example_photo} className="modal__image" />
      </Modal>
    </div>
  );
}

WorkoutItem.propTypes = propTypes;

export default WorkoutItem;
