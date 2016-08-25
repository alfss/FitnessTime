import Workout from "../../Components/WorkoutComponent/WorkoutComponent";
import Token from "../../getCSRFToken";

class WorkoutContainer extends React.Component {
  constructor() {
    super();
    this.handleDeletingWorkoutItem = this.handleDeletingWorkoutItem.bind(this);
    this.state = { workoutData: [] };
  }

  loadWorkoutData() {
    const url = `/api/v1/workout/training/${this.props.params.id}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          workoutData: data.exercises
        });
      }
    );
  }


  handleDeletingWorkoutItem(itemId) {
    return () => {
      const confirmDeleting = confirm("Вы действительно хотите удалить уражнение?");
      if (confirmDeleting) {
        fetch(`/api/v1/workout/exercise/${itemId}`, {
          credentials: "include",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Token
          }
        })
        .then(data => {
          if (data.status === 204) {
            console.log(data);
            const newState = this.state.workoutData.filter(session => !(session.url === data.url));
            this.setState({
              workoutData: newState
            });
          }
        });
      }
    };
  }

  componentDidMount() {
    this.loadWorkoutData();
  }

  render() {
    return (
      <Workout
        workoutData={this.state.workoutData}
        sessionId={this.props.params.id}
        deleteItem={this.handleDeletingWorkoutItem}
      />
    );
  }
}

export default WorkoutContainer;
