"use strict";

import { Link } from "react-router";
import Pagination from "../../Components/PaginationComponent/PaginationComponent";

const propTypes = {
  workoutSessionData: React.PropTypes.array.isRequired,
  deleteSession: React.PropTypes.func.isRequired
};

function WorkoutSession (props) {
  const pagination =  <Pagination
    pages={props.pages}
    switchPage={props.switchPage}
    nextPage={props.nextPage}
    previousPage={props.previousPage}
    currentPage={props.currentPage}
  />;

  function renderSession(session) {
    return (
      <div className="workout-session__item" key={session.uuid}>
        <Link to={"/app/workout/" + session.uuid} className="workout-session__item-link">
          { session.title }
        </Link>
        <button className="button__delete" onClick={props.deleteSession(session.uuid)} />
        <Link to={`/app/form/session/${session.uuid}`} className="button__edit" />
      </div>
    );
  }

  return (
    <div className="workout-session">
      { props.pages > 1 && pagination }
      { props.workoutSessionData.map(renderSession) }
      <Link to="/app/form/session" className="button button__round" >
        <i className="button__icon" />
      </Link>
    </div>
  );
}

WorkoutSession.propTypes = propTypes;

export default WorkoutSession;
