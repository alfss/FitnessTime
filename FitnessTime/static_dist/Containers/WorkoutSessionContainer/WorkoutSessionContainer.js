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
      count: 0,
      userName: "",
      currentPage: 1,
      pages: 1,
      workoutSessionData: []
    };
  }

  componentWillMount() {
    this.props.getParentRoute("");
  }

  componentDidMount() {
    const page = this.props.params.page || 1;
    this.fetchPageUrl(page);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.page === "1") this.props.router.replace("/");
    const nextPage = +nextProps.params.page || 1;
    const currentPage = +this.props.params.page || 1;
    if (nextPage !== currentPage) this.fetchPageUrl(nextPage);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.userName !== nextState.userName) this.props.getRouteName(`Тренировки ${nextState.userName}`);
  }

  handleSwitchPage(page) {
    return () => {
      if (+this.props.params.page === page) return;
      if (!this.props.params.page && page === 1) return;
      const pageUrl = (page === 1) ? "/app" :`/app/page${page}`;
      this.props.router.push(pageUrl);
    };
  }

  goToNextPage() {
    if (this.state.currentPage === this.state.pages) return;
    this.props.router.push(`/app/page${this.state.currentPage + 1}`);
  }

  goToPreviousPage() {
    if (this.state.currentPage === 1) return;
    const previousPage = this.state.currentPage - 1;
    const pageUrl = (previousPage === 1) ? "/app" : `/app/page${previousPage}`;
    this.props.router.push(pageUrl);
  }

  fetchPageUrl(page) {
    this.props.setFethingData(true);
    const url = (page === 1) ? "/api/v1/workout/training/" : `/api/v1/workout/training/?page=${page}`;

    fetch(url, { credentials: "include" })
      .then(data => {
        this.props.setFethingData(false);
        if (data.status === 404) throw Error(404);
        return data.json();
      })
      .then(data => {
        let pages = parseInt(data.count / 10);
        if (data.count % 10) ++pages;
        this.setState({
          count: data.count,
          userName: data.results[0].owner.username,
          currentPage: page,
          pages: pages,
          workoutSessionData: data.results
        });
      })
      .catch (error => {
        if (error.message === "404") this.props.checkIsPageExist(false);
      });
  }

  handleDeletingSession(sessionId) {
    return () => {
      const confirmDeleting = confirm("Вы действительно хотите удалить тренировку?");
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
            let page = this.state.currentPage;
            const newState = this.state.workoutSessionData.filter(session => !(session.url === data.url));
            this.setState({
              count: this.state.count - 1,
              workoutSessionData: newState
            });
            if (!newState.length && page === 1) return;
            if (!newState.length) {
              this.handleSwitchPage(--page)();
              return;
            }
            if (this.state.count % 10 === 0) this.fetchPageUrl(page);
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
        currentPage={+this.state.currentPage}
      />
    );
  }
}

export default withRouter(WorkoutSessionsContainer);
