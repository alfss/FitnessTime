"use strict";

import WorkoutSession from "../../Components/WorkoutSessionComponent/WorkoutSessionComponent";

class WorkoutSessionsContainer extends React.Component {
  constructor() {
    super();
    this.state = { workoutSessionData: [] };
  }

  loadWorkoutSessionData() {
    const url = "/api/v1/workout/training/";

    fetch(url, {
      credentials: "include"
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          workoutSessionData: data.results
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
