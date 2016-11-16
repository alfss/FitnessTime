import Stopwatch from "../../Containers/StopwatchContainer/StopwatchContainer";
import Menu from "../../Containers/MenuContainer/MenuContainer";
import { Link } from "react-router";
import Modal from "react-modal";

function WorkoutItem ({
  isModalOpen,
  toggleModal,
  workoutItemData,
  toggleItemFullData,
  shouldWarn,
  deleteItem,
  setShouldStartWarning,
  id,
  currentRepeat,
  setRepeatsDone,
  appState
}) {
  Modal.setAppElement("body");
  const modal = <Modal isOpen={isModalOpen} onRequestClose={toggleModal} overlayClassName="modal__overlay" className="modal__content">
                  <span className="modal__close-btn" onClick={toggleModal} />
                  <img src={workoutItemData.example_photo} className="modal__image" />
                </Modal>;
  const repeatsText = (currentRepeat > workoutItemData.repeat)
    ? "Завершенно"
    : `${currentRepeat }/${workoutItemData.repeat}`;
  return (
    <div data-id={id}>
      <div className="workout-item__name" onClick={toggleItemFullData}>
        {workoutItemData.title}
        <span className={classNames("workout-item__drag", {removed: appState !== "editing"})} />
        <Menu menuClass={classNames({removed: appState !== "default"})}>
          <Link className="menu__item" to={`/app/form/exercise/${workoutItemData.training}/${workoutItemData.uuid}`}>Редактировать</Link>
          <div className="menu__item" onClick={deleteItem(workoutItemData.uuid)}>Удалить</div>
        </Menu>
      </div>
      <div className="workout-item__wrapper workout-item__wrapper_closed" style={{height:0}}>
        <div className={classNames("workout-item__full-data", {"workout-item__timer-warn": shouldWarn})}>
          <div className="workout-item__info">
            <div className="workout-item__description">
              <div className="workout-item__repeats">
                <span className="workout-item__description-name">Подход:</span>{ repeatsText }
              </div>
              <div className="workout-item__weight">
                <span className="workout-item__description-name">Вес:</span>{workoutItemData.weight}
              </div>
            </div>
            <div className={workoutItemData.example_photo ? "workout-item__image" : "workout-item__no-image"}>
              <img width="100" height="100" src={workoutItemData.example_photo}  onClick={workoutItemData.example_photo ? toggleModal : null} />
            </div>
          </div>
          <Stopwatch
            rest={workoutItemData.rest_time}
            repeats={workoutItemData.repeat}
            currentRepeat={currentRepeat}
            setShouldStartWarning={setShouldStartWarning}
            setRepeatsDone={setRepeatsDone}
          />
        </div>
      </div>
      { workoutItemData.example_photo && modal }
    </div>
  );
}

export default WorkoutItem;
