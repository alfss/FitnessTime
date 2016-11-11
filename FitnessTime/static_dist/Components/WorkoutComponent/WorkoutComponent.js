import { Link } from "react-router";
import WorkoutItem from "../../Containers/WorkoutItemContainer/WorkoutItemContainer";
import Sortable from "react-sortablejs";

function Workout ({workoutData, deleteItem, toggleItemFullData, trainingId, changeItemsOrder, appState, setAppState}) {
  const workoutItems = workoutData.map( (item, i) => {
    return <WorkoutItem
            key={i}
            id={i}
            workoutItemData={item}
            deleteItem={deleteItem}
            toggleItemFullData={toggleItemFullData}
            appState={appState}
           />;
  });
  return (
    <div className="workout-item">
      <Sortable
      onChange={ changeItemsOrder }
      options={{
        handle: ".workout-item__drag",
        animation: 150
      }}>
        { workoutItems }
      </Sortable>
      <button className={classNames("button button_app-actions", {"removed": appState !== "editing"})} onClick={setAppState()}>
        Сохранить изменения
      </button>
      <Link to={`/app/form/exercise/${trainingId}`} className={classNames("button button_round", {"removed": appState !== "default"})}>
        <i className="button__add" />
      </Link>
      <audio id="stop-timer">
        <source src="/static/sounds/beep.ogg" type="audio/ogg" />
        <source src="/static/sounds/beep.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default Workout;
