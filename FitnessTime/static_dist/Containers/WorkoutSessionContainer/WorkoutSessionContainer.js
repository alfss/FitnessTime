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
    this.goToPreviousPage = this.goToPreviousPage.bind(this);
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
      if (+this.props.params.page === page) return;
      if (!this.props.params.page && page === 1) return;
      const fetchUrl = (page === 1) ? "/api/v1/workout/training/" : `/api/v1/workout/training/?page=${page}`;
      const pageUrl = (page === 1) ? "/" :`/page${page}`;

      this.props.router.push(pageUrl);
      fetch(fetchUrl, {
        credentials: "include"
      })
        .then(response => response.json())
        .then(data => {
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
    };
  }

  componentDidMount() {
    this.loadWorkoutSessionData();
  }

  goToNextPage() {
    if (this.state.next === null) return;
    const nextPage = this.state.next.match(/page=(\d*)/i)[1];
    this.props.router.push(`/page${nextPage}`);

    fetch(this.state.next, {
      credentials: "include"
    })
      .then(response => response.json())
      .then(data => {
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
  goToPreviousPage() {
    if (this.state.previous === null) return;
    const previousPage = this.state.previous.match(/page=(\d*)/i);
    const pageUrl = (previousPage === null) ? "/" : `/page${previousPage}`;
    this.props.router.push(pageUrl);

    fetch(this.state.previous, {
      credentials: "include"
    })
      .then(response => response.json())
      .then(data => {
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
        previousPage={this.goToPreviousPage}
        deleteSession={this.handleDeletingSession}
      />
    );
  }
}

export default withRouter(WorkoutSessionsContainer);
