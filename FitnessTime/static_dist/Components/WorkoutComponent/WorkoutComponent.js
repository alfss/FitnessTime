"use strict";

import { Link } from "react-router";
import WorkoutItem from "../../Containers/WorkoutItemContainer/WorkoutItemContainer";

function Workout ({workoutData, deleteItem, toggleItemFullData, trainingId}) {
  const workoutItem = workoutData.map( data => {
    return <WorkoutItem
            key={data.uuid}
            workoutItemData={data}
            deleteItem={deleteItem}
            toggleItemFullData={toggleItemFullData}
          />;
  });

  return (
    <div className="workout-item">
      { workoutItem }
      <Link to={`/app/form/exercise/${trainingId}`} className="button button_round" >
        <i className="button__icon" />
      </Link>
      <audio id="stop-timer">
        <source src="/static/sounds/beep.ogg" type="audio/ogg" />
        <source src="/static/sounds/beep.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default Workout;
