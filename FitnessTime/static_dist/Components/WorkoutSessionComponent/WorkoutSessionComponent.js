"use strict";

import { Link } from "react-router";

const propTypes = {
  workoutSessionData: React.PropTypes.array.isRequired,
  deleteSession: React.PropTypes.func.isRequired
};

function WorkoutSession (props) {
  return (
    <div className="workout-session">
        <ul className="workout-session__pagination">
          <li><a className="workout-session__page-nav" href="#">«</a></li>
          <li><a className="workout-session__page workout-session__page_active" href="#">1</a></li>
          <li><a className="workout-session__page" href="#">2</a></li>
          <li><a className="workout-session__page" href="#">3</a></li>
          <li><a className="workout-session__page" href="#">4</a></li>
          <li><a className="workout-session__page" href="#">5</a></li>
          <li><a className="workout-session__page" href="#">6</a></li>
          <li><a className="workout-session__page" href="#">7</a></li>
          <li><a className="workout-session__page-nav" href="#">»</a></li>
        </ul>
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
