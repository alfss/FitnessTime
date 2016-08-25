"use strict";

import WorkoutSession from "../../Components/WorkoutSessionComponent/WorkoutSessionComponent";
import Token from "../../getCSRFToken";

class WorkoutSessionsContainer extends React.Component {
  constructor() {
    super();
    this.handleDeletingSession = this.handleDeletingSession.bind(this);
    this.state = { workoutSessionData: [] };
  }

  loadWorkoutSessionData() {
    fetch("/api/v1/workout/training/", {
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

  handleDeletingSession(sessionId) {
    return () => {
      const confirmDeleting = confirm("Вы действительно хотите удалить сессию?");
      if (confirmDeleting) {
        fetch(`/api/v1/workout/training/${sessionId}`, {
          credentials: "include",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Token
          }
        })
        .then(data => {
          if (data.status === 204) {
            const newState = this.state.workoutSessionData.filter(session => !(session.url === data.url));
            this.setState({
              workoutSessionData: newState
            });
          }
        });
      }
    };
  }

  render() {
    return (
      <WorkoutSession
        workoutSessionData={this.state.workoutSessionData}
        deleteSession={this.handleDeletingSession}
      />
    );
  }
}

export default WorkoutSessionsContainer;
