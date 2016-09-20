"use strict";

import { Link } from "react-router";
import Pagination from "../../Components/PaginationComponent/PaginationComponent";

const propTypes = {
  workoutSessionData: React.PropTypes.array.isRequired,
  deleteSession: React.PropTypes.func.isRequired
};

function WorkoutSession (props) {
  const pagination = props.pages <= 1
    ? null
    : <Pagination
        pages={props.pages}
        switchPage={props.switchPage}
        nextPage={props.nextPage}
        previousPage={props.previousPage}
        currentPage={props.currentPage}
      />;
  return (
    <div className="workout-session">
      {pagination}
      {
        props.workoutSessionData.map( data => {
          return (
            <div className="workout-session__item" key={data.uuid}>
              <Link to={"/app/workout/" + data.uuid} className="workout-session__item-link">
                {data.title}
              </Link>
              <Link to={`/app/form/session/${data.uuid}`} className="workout-session__edit-btn" />
              <button className="workout-session__close-btn" onClick={props.deleteSession(data.uuid)} />
            </div>
          );
        })
      }
      <Link to="/app/form/session" className="button button_add">
        Новая тренировка
      </Link>
    </div>
  );
}

WorkoutSession.propTypes = propTypes;

export default WorkoutSession;
