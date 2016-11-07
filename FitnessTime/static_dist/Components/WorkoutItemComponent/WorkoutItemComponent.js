import Stopwatch from "../../Containers/StopwatchContainer/StopwatchContainer";
import Menu from "../../Containers/MenuContainer/MenuContainer";
import { Link } from "react-router";
import Modal from "react-modal";

function WorkoutItem ({isModalOpen, toggleModal, data, toggleItemFullData, shouldWarn, deleteItem, formatRestTimer, setShouldStartWarning} = this.props) {
  Modal.setAppElement("body");
  const modal = <Modal isOpen={isModalOpen} onRequestClose={toggleModal} overlayClassName="modal__overlay" className="modal__content">
                  <span className="modal__close-btn" onClick={toggleModal} />
                  <img src={data.example_photo} className="modal__image" />
                </Modal>;
  return (
    <div>
      <div className="workout-item__name" onClick={toggleItemFullData}>
        {data.title}
        <Menu>
          <Link className="menu__item" to={`/app/form/exercise/${data.training}/${data.uuid}`}>Редактировать</Link>
          <div className="menu__item" onClick={deleteItem(data.uuid)}>Удалить</div>
        </Menu>
      </div>
      <div className="workout-item__wrapper workout-item__wrapper_closed" style={{height:0}}>
        <div className={classNames("workout-item__full-data", {"workout-item__timer-warn": shouldWarn})}>
          <div className="workout-item__info">
          <div className="workout-item__description">
              <div className="workout-item__repeats"><span className="workout-item__description-name">Повторы:</span>{data.repeat}</div>
              <div className="workout-item__weight"><span className="workout-item__description-name">Вес:</span>{data.weight}</div>
              <div className="workout-item__rest"><span className="workout-item__description-name">Отдых:</span>{formatRestTimer(data.rest_time)}</div>
            </div>
            <div className={data.example_photo ? "workout-item__image" : "workout-item__no-image"}>
              <img width="100" height="100" src={data.example_photo}  onClick={data.example_photo ? toggleModal : null} />
            </div>
          </div>
          <Stopwatch
            rest={formatRestTimer(data.rest_time)}
            repeats={data.repeat}
            setShouldStartWarning={setShouldStartWarning}
          />
        </div>
      </div>
      { data.example_photo && modal }
    </div>
  );
}

export default WorkoutItem;
