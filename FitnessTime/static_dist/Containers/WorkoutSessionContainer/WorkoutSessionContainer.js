"use strict";

import WorkoutSession from "../../Components/WorkoutSessionComponent/WorkoutSessionComponent";

class WorkoutSessionsContainer extends React.Component {
  constructor() {
    super();
    this.handleDeletingSession = this.handleDeletingSession.bind(this);
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

  handleDeletingSession(sessionId) {
    return () => {
      const csrfToken = this.getCookie("csrftoken");

      fetch(`/api/v1/workout/training/${sessionId}`, {
        credentials: "include",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken
        }
      })
      .then(data => console.log(data));
    };
  }

  getCookie(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
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
