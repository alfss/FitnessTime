import { Link } from "react-router";
import WorkoutItem from "../../Containers/WorkoutItemContainer/WorkoutItemContainer";
import Sortable from "react-sortablejs";

function Workout ({workoutData, deleteItem, toggleItemFullData, trainingId, changeItemsOrder, appState}) {
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
      <Link to={`/app/form/exercise/${trainingId}`} className="button button_round" >
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
