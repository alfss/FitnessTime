"use strict";

import { Link } from "react-router";
import Pagination from "../../Components/PaginationComponent/PaginationComponent";

const propTypes = {
  workoutTrainingData: React.PropTypes.array.isRequired,
  deleteTraining: React.PropTypes.func.isRequired
};

function WorkoutTraining ({pages, switchPage, nextPage, previousPage, currentPage, deleteTraining, workoutTrainingData} = this.props) {
  const pagination =  <Pagination
    pages={pages}
    switchPage={switchPage}
    nextPage={nextPage}
    previousPage={previousPage}
    currentPage={currentPage}
  />;

  function renderTraining(training) {
    return (
      <div className="workout-training__item" key={training.uuid}>
        <Link to={"/app/workout/" + training.uuid} className="workout-training__item-link">
          { training.title }
        </Link>
        <button className="button__delete" onClick={deleteTraining(training.uuid)} />
        <Link to={`/app/form/training/${training.uuid}`} className="button__edit" />
      </div>
    );
  }

  return (
    <div className="workout-training">
      { pages > 1 && pagination }
      { workoutTrainingData.map(renderTraining) }
      <Link to="/app/form/training" className="button button__round" >
        <i className="button__icon" />
      </Link>
    </div>
  );
}

WorkoutTraining.propTypes = propTypes;

export default WorkoutTraining;
