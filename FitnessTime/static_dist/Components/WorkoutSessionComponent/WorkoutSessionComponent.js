"use strict";

import { Link } from "react-router";

const propTypes = {
  workoutSessionData: React.PropTypes.array.isRequired
};

function WorkoutSession (props) {
  return (
    <div className="workout-session">
      {
        props.workoutSessionData.map( data => {
          return <Link to={"workout/" + data.id} key={data.id} className="workout-session__item">
            {data.title}
          </Link>;
        })
      }
      <Link to="/form/session" className="button button_add">
        Новая тренировка
      </Link>
    </div>
  );
}

WorkoutSession.propTypes = propTypes;

export default WorkoutSession;
