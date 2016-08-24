import Stopwatch from "../../Containers/StopwatchContainer/StopwatchContainer";
import { Link } from "react-router";
import Modal from "react-modal";

const propTypes = {
  id: React.PropTypes.string.isRequired,
  image: React.PropTypes.string,
  title: React.PropTypes.string.isRequired,
  repeats: React.PropTypes.string.isRequired,
  rest: React.PropTypes.string.isRequired,
  weight: React.PropTypes.number.isRequired,
  toggleOpenFullData: React.PropTypes.func.isRequired
};

function WorkoutItem (props) {
  Modal.setAppElement("body");
  return (
    <div className="workout__item" key={props.id}>
      <div className="workout__name" onClick={props.toggleOpenFullData}>
        {props.title}
      </div>
      <div className="workout__full-data">
        <div className="workout__info">
        <div className="workout__description">
            <div className="workout__repeats"><span className="workout__description-name">Повторы:</span>{props.repeats}</div>
            <div className="workout__weight"><span className="workout__description-name">Вес:</span>{props.weight}</div>
            <div className="workout__rest"><span className="workout__description-name">Отдых:</span>{props.rest}</div>
          </div>
          <div className="workout__image">
            <img width="100" height="100" src={props.image} onClick={props.openModal} />
          </div>
        </div>
        <Stopwatch rest={props.rest} repeats={props.repeats}/>
        <div className="workout__controls">
          <Link to={`/form/workout/${props.training}/${props.id}`}>
            <button className="workout__control-button workout__control-button_edit"></button>
          </Link>
          <button className="workout__control-button workout__control-button_delete" onClick={props.deleteItem(props.id)}></button>
        </div>
      </div>
      <Modal isOpen={props.isModalOpen} onRequestClose={props.closeModal} overlayClassName="modal__overlay" className="modal__content">
        <img src={props.image} className="modal__image" />
      </Modal>
    </div>
  );
}

WorkoutItem.propTypes = propTypes;

export default WorkoutItem;
