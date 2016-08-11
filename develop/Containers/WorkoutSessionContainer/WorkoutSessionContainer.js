"use strict";

import WorkoutSession from "../../Components/WorkoutSessionComponent/WorkoutSessionComponent";

class WorkoutSessionsContainer extends React.Component {
  constructor() {
    super();
    this.state = { workoutSessionData: [] };
  }

  loadWorkoutSessionData() {
    const url = "https://api.mongolab.com/api/1/databases/zizik/collections/workoutSession?apiKey=NRheaIcHQvxwCNRa3FmeLIAVZwtEjeyp";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          workoutSessionData: data
        });
      }
    );
  }

  componentDidMount() {
    this.loadWorkoutSessionData();
  }

  render() {
    return (
      <WorkoutSession workoutSessionData={this.state.workoutSessionData} />
    );
  }
}

export default WorkoutSessionsContainer;
