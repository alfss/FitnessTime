import Workout from "../../Components/WorkoutComponent/WorkoutComponent";

class WorkoutContainer extends React.Component {
  constructor() {
    super();
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

  componentDidMount() {
    this.loadWorkoutData();
  }

  render() {
    return (
      <Workout
        workoutData={this.state.workoutData}
        sessionId={this.props.params.id}
      />
    );
  }
}

export default WorkoutContainer;
