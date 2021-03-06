import { Link } from "react-router";
import Pagination from "../../Components/PaginationComponent/PaginationComponent";
import Menu from "../../Containers/MenuContainer/MenuContainer";

function WorkoutTraining ({
  pages,
  switchPage,
  nextPage,
  previousPage,
  currentPage,
  deleteTraining,
  workoutTrainingData
}) {
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
        <Menu>
          <Link className="menu__item" to={`/app/form/training/${training.uuid}`}>Редактировать</Link>
          <div className="menu__item" onClick={deleteTraining(training.uuid)}>Удалить</div>
        </Menu>
      </div>
    );
  }

  return (
    <div className="workout-training">
      { pages > 1 && pagination }
      { workoutTrainingData.map(renderTraining) }
      <div className={classNames("tooltip", {"removed": workoutTrainingData.length})}>
        Создайте свою первую тренировку
        <div className="tooltip__arrow" />
      </div>
      <Link to="/app/form/training" className="button button_round" >
        <i className="button__add" />
      </Link>
    </div>
  );
}

export default WorkoutTraining;
