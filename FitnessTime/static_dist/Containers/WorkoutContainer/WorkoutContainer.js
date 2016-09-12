import Workout from "../../Components/WorkoutComponent/WorkoutComponent";
import Token from "../../getCSRFToken";

class WorkoutContainer extends React.Component {
  constructor() {
    super();
    this.handleDeletingWorkoutItem = this.handleDeletingWorkoutItem.bind(this);
    this.state = {
      workoutName: "",
      workoutData: []
    };
  }

  componentDidMount() {
    this.loadWorkoutData();
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.workoutName !== nextState.workoutName) {
      this.props.getRoutePathName(nextState.workoutName);
    }
  }

  loadWorkoutData() {
    //this.props.setFethingData(true);
    const url = `/api/v1/workout/training/${this.props.params.id}`;

    fetch(url)
      .then(data => data.json())
      .then(data => {
        //this.props.setFethingData(false);
        this.setState({
          workoutName: data.title,
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
            const newState = this.state.workoutData.filter(session => !(session.url === data.url));
            this.setState({
              workoutData: newState
            });
          }
        });
      }
    };
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
