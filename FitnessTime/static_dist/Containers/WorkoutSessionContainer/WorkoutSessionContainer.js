"use strict";

import WorkoutSession from "../../Components/WorkoutSessionComponent/WorkoutSessionComponent";
import Token from "../../getCSRFToken";

class WorkoutSessionsContainer extends React.Component {
  constructor() {
    super();
    this.handleDeletingSession = this.handleDeletingSession.bind(this);
    this.goToNextPage = this.goToNextPage.bind(this);
    this.state = {
      pages: 1,
      previous: null,
      next: null,
      workoutSessionData: []
    };
  }

  loadWorkoutSessionData() {
    fetch("/api/v1/workout/training/", {
      credentials: "include"
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          pages: parseInt(data.count / 10) + 1,
          previous: data.previous,
          next: data.next,
          workoutSessionData: data.results
        });
      }
    );
  }

  componentDidMount() {
    this.loadWorkoutSessionData();
  }

  goToNextPage() {
    fetch(this.state.next, {
      credentials: "include"
    })
    .then(data => data.json())
    .then(data => console.log(data));
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
    console.log(this.state);
    return (
      <WorkoutSession
        workoutSessionData={this.state.workoutSessionData}
        pages={this.state.pages}
        nextPage={this.goToNextPage}
        deleteSession={this.handleDeletingSession}
      />
    );
  }
}

export default WorkoutSessionsContainer;
