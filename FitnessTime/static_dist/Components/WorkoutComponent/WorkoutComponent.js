import { Link } from "react-router";
import WorkoutItem from "../../Containers/WorkoutItemContainer/WorkoutItemContainer";
import Sortable from "react-sortablejs";

function Workout ({workoutData, deleteItem, toggleItemFullData, trainingId}) {
  const workoutItems = workoutData.map( item => {
    return <WorkoutItem
            key={item.uuid}
            workoutItemData={item}
            deleteItem={deleteItem}
            toggleItemFullData={toggleItemFullData}
          />;
  });

  return (
    <div className="workout-item">
      <Sortable options={{handle: ".workout-item__drag"}}>
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
