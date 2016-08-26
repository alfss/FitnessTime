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

  componentDidMount() {
    this.loadWorkoutSessionData();
  }

  loadWorkoutSessionData() {
    const sessionUrl = this.props.params.page
      ? `/api/v1/workout/training/?page=${this.props.params.page}`
      : "/api/v1/workout/training/";
    this.fetchPageUrl(sessionUrl);
  }

  handleSwitchPage(page) {
    return () => {
      if (+this.props.params.page === page) return;
      if (!this.props.params.page && page === 1) return;
      const fetchUrl = (page === 1) ? "/api/v1/workout/training/" : `/api/v1/workout/training/?page=${page}`;
      const pageUrl = (page === 1) ? "/" :`/page${page}`;
      this.props.router.push(pageUrl);
      this.fetchPageUrl(fetchUrl);
    };
  }

  goToNextPage() {
    if (this.state.next === null) return;
    const nextPage = this.state.next.match(/page=(\d*)/i)[1];
    this.props.router.push(`/page${nextPage}`);
    this.fetchPageUrl(this.state.next);
  }

  goToPreviousPage() {
    if (this.state.previous === null) return;
    const previousPage = this.state.previous.match(/page=(\d*)/i);
    const pageUrl = (previousPage === null) ? "/" : `/page${previousPage}`;
    this.props.router.push(pageUrl);
    this.fetchPageUrl(this.state.previous);
  }

  fetchPageUrl(url) {
    fetch(url, {
      credentials: "include"
    })
      .then(data => {
        if (!data.ok) throw Error("asd");
        return data.json();
      })
      .then(data => {
        let pages = parseInt(data.count / 10);
        if (data.count % 10) ++pages;
        this.setState({
          pages: pages,
          previous: data.previous,
          next: data.next,
          workoutSessionData: data.results
        });
      }, () => {
        this.props.router.push("/404");
      });
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
