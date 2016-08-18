import Workout from "../../Components/WorkoutComponent/WorkoutComponent";

class WorkoutContainer extends React.Component {
  constructor() {
    super();
    this.state = { workoutData: [] };
  }

  loadWorkoutData() {
    const url = "https://api.mongolab.com/api/1/databases/zizik/collections/workout?apiKey=NRheaIcHQvxwCNRa3FmeLIAVZwtEjeyp";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          workoutData: data
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
      />
    );
  }
}

export default WorkoutContainer;
