"use strict";

import WorkoutSession from "../../Components/WorkoutSessionComponent/WorkoutSessionComponent";
import Token from "../../getCSRFToken";
import { withRouter } from "react-router";

class WorkoutSessionsContainer extends React.Component {
  constructor() {
    super();
    this.handleDeletingSession = this.handleDeletingSession.bind(this);
    this.handleSwitchPage = this.handleSwitchPage.bind(this);
    this.goToNextPage = this.goToNextPage.bind(this);
    this.state = {
      pages: 1,
      previous: null,
      next: null,
      workoutSessionData: []
    };
  }

  loadWorkoutSessionData() {
    const sessionUrl = this.props.params.page
      ? `/api/v1/workout/training/?page=${this.props.params.page}`
      : "/api/v1/workout/training/";
    console.log(sessionUrl);
    fetch(sessionUrl, {
      credentials: "include"
    })
      .then((response) => response.json())
      .then((data) => {
        let pages = parseInt(data.count / 10);
        if (data.count % 10) ++pages;
        this.setState({
          pages: pages,
          previous: data.previous,
          next: data.next,
          workoutSessionData: data.results
        });
      }
    );
  }

  handleSwitchPage(page) {
    return () => {
      const pageUrl = (page === 1) ? "/api/v1/workout/training/" : `/api/v1/workout/training/?page=${page}`;
      this.props.router.push((page === 1) ? "/" :`/page${page}`);
      fetch(pageUrl, {
        credentials: "include"
      })
        .then((response) => response.json())
        .then((data) => {
          let pages = parseInt(data.count / 10);
          if (data.count % 10) ++pages;
          console.log(pages);
          this.setState({
            pages: pages,
            previous: data.previous,
            next: data.next,
            workoutSessionData: data.results
          });
        }
      );
    };
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
    return (
      <WorkoutSession
        workoutSessionData={this.state.workoutSessionData}
        pages={this.state.pages}
        switchPage={this.handleSwitchPage}
        nextPage={this.goToNextPage}
        deleteSession={this.handleDeletingSession}
      />
    );
  }
}

export default withRouter(WorkoutSessionsContainer);
