"use strict";

import { Link } from "react-router";
import Pagination from "../../Components/PaginationComponent/PaginationComponent";

const propTypes = {
  workoutTrainingData: React.PropTypes.array.isRequired,
  deleteTraining: React.PropTypes.func.isRequired
};

function WorkoutTraining (props) {
  const pagination =  <Pagination
    pages={props.pages}
    switchPage={props.switchPage}
    nextPage={props.nextPage}
    previousPage={props.previousPage}
    currentPage={props.currentPage}
  />;

  function renderTraining(training) {
    return (
      <div className="workout-training__item" key={training.uuid}>
        <Link to={"/app/workout/" + training.uuid} className="workout-training__item-link">
          { training.title }
        </Link>
        <button className="button__delete" onClick={props.deleteTraining(training.uuid)} />
        <Link to={`/app/form/training/${training.uuid}`} className="button__edit" />
      </div>
    );
  }

  return (
    <div className="workout-training">
      { props.pages > 1 && pagination }
      { props.workoutTrainingData.map(renderTraining) }
      <Link to="/app/form/training" className="button button__round" >
        <i className="button__icon" />
      </Link>
    </div>
  );
}

WorkoutTraining.propTypes = propTypes;

export default WorkoutTraining;
