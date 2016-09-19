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
      "userName": "",
      "page-1": {
        pages: 1,
        previous: null,
        next: null,
        workoutSessionData: []
      }
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
    if (this.state.userName !== nextState.userName) {
      this.props.getRouteName(`Тренировки ${nextState.userName}`);
    }
  }


  handleSwitchPage(page) {
    return () => {
      if (+this.props.params.page === page) return;
      if (!this.props.params.page && page === 1) return;
      const pageUrl = (page === 1) ? "/" :`/page${page}`;
      this.props.router.push(pageUrl);
    };
  }

  goToNextPage() {
    if (this.state.next === null) return;
    const nextPage = this.state.next.match(/page=(\d*)/i)[1];
    this.props.router.push(`/page${nextPage}`);
  }

  goToPreviousPage() {
    if (this.state.previous === null) return;
    const previousPage = this.state.previous.match(/page=(\d*)/i);
    const pageUrl = (previousPage === null) ? "/" : `/page${previousPage}`;
    this.props.router.push(pageUrl);
  }

  fetchPageUrl(page) {
    this.props.setFethingData(true);
    const url = (page === 1) ? "/api/v1/workout/training/" : `/api/v1/workout/training/?page=${page}`;

    fetch(url, {
      credentials: "include"
    })
      .then(data => {
        this.props.setFethingData(false);
        if (data.status === 404) throw Error(404);
        return data.json();
      })
      .then(data => {
        let pages = parseInt(data.count / 10);
        if (data.count % 10) ++pages;
        this.setState( this.state[`page-${page || 1}`] = {
          pages: pages,
          previous: data.previous,
          next: data.next,
          workoutSessionData: data.results,
          userName: data.results[0].owner.username
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
            let page = this.props.params.page || 1;
            const newState = this.state[`page-${page}`].workoutSessionData.filter(session => !(session.url === data.url));
            this.setState(this.state[`page-${page}`].workoutSessionData = newState);
            if (!newState.length) {
              page = (page === 1) ? page  : page - 1;
              this.handleSwitchPage(page)();
            }
          }
        });
      }
    };
  }

  render() {
    const pageNumber = this.props.params.page || 1;
    const data = this.state[`page-${pageNumber}`] || this.state["page-1"];
    return (
      <WorkoutSession
        workoutSessionData={data.workoutSessionData}
        pages={data.pages}
        switchPage={this.handleSwitchPage}
        nextPage={this.goToNextPage}
        previousPage={this.goToPreviousPage}
        deleteSession={this.handleDeletingSession}
        currentPage = {+this.props.params.page || 1}
      />
    );
  }
}

export default withRouter(WorkoutSessionsContainer);
