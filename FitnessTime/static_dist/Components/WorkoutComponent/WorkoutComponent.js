"use strict";

import { Link } from "react-router";
import WorkoutItem from "../../Containers/WorkoutItemContainer/WorkoutItemContainer";

const propTypes = {
  workoutData: React.PropTypes.array.isRequired,
  sessionId: React.PropTypes.string.isRequired,
  deleteItem: React.PropTypes.func.isRequired
};

function Workout (props) {
  return (
    <div className="workout">
      {
        props.workoutData.map( data => {
          return <WorkoutItem
            key={data.uuid}
            workoutItemData={data}
            deleteItem={props.deleteItem}
          />;
        })
      }
      <Link to={`/form/workout/${props.sessionId}`} className="button button_add">
        Новое упражнение
      </Link>
    </div>
  );
}

Workout.propTypes = propTypes;

export default Workout;
