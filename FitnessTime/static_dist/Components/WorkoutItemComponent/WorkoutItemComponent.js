import Stopwatch from "../../Containers/StopwatchContainer/StopwatchContainer";
import { Link } from "react-router";
import Modal from "react-modal";

const propTypes = {
  data: React.PropTypes.object.isRequired,
  formatRestTimer: React.PropTypes.func.isRequired,
  isModalOpen: React.PropTypes.bool.isRequired,
  toggleModal: React.PropTypes.func.isRequired,
  deleteItem: React.PropTypes.func.isRequired
};

function WorkoutItem (props) {
  Modal.setAppElement("body");
  const modal = <Modal isOpen={props.isModalOpen} onRequestClose={props.toggleModal} overlayClassName="modal__overlay" className="modal__content">
                  <span className="modal__close-btn" onClick={props.toggleModal} />
                  <img src={props.data.example_photo} className="modal__image" />
                </Modal>;

  return (
    <div>
      <div className="workout-item__name" onClick={props.toggleItemFullData}>
        {props.data.title}
        <button className="button__delete" onClick={props.deleteItem(props.data.uuid)} />
        <Link to={`/app/form/exercise/${props.data.training}/${props.data.uuid}`} className="button__edit" />
      </div>
      <div className="workout-item__wrapper workout-item__wrapper_closed" style={{height:0}}>
        <div className={`workout-item__full-data ${props.shouldWarn ? "workout-item__timer-warn" : ""}`}>
          <div className="workout-item__info">
          <div className="workout-item__description">
              <div className="workout-item__repeats"><span className="workout-item__description-name">Повторы:</span>{props.data.repeat}</div>
              <div className="workout-item__weight"><span className="workout-item__description-name">Вес:</span>{props.data.weight}</div>
              <div className="workout-item__rest"><span className="workout-item__description-name">Отдых:</span>{props.formatRestTimer(props.data.rest_time)}</div>
            </div>
            <div className={props.data.example_photo ? "workout-item__image" : "workout-item__no-image"}>
              <img width="100" height="100" src={props.data.example_photo}  onClick={props.data.example_photo ? props.toggleModal : null} />
            </div>
          </div>
          <Stopwatch
            rest={props.formatRestTimer(props.data.rest_time)}
            repeats={props.data.repeat}
            setShouldStartWarning={props.setShouldStartWarning}
          />
        </div>
      </div>
      { props.data.example_photo && modal }
    </div>
  );
}

WorkoutItem.propTypes = propTypes;

export default WorkoutItem;
