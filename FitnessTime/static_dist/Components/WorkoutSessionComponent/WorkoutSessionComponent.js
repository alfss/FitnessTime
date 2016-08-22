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
          return (
            <div className="workout-session__item" key={data.uuid}>
              <Link to={"workout/" + data.uuid} className="workout-session__item-link">
              {data.title}
              </Link>
              <button className="workout-session__close-btn" onClick={props.deleteSession(data.uuid)}></button>
            </div>
          );
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
