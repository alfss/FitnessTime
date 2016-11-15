import WorkoutTraining from "../../Components/WorkoutTrainingComponent/WorkoutTrainingComponent";
import { withRouter } from "react-router";
import Rest from "../../rest";

class WorkoutTrainingsContainer extends React.Component {
  constructor() {
    super();
    this.handleDeletingTraining = this.handleDeletingTraining.bind(this);
    this.handleSwitchPage = this.handleSwitchPage.bind(this);
    this.goToNextPage = this.goToNextPage.bind(this);
    this.goToPreviousPage = this.goToPreviousPage.bind(this);
    this.state = {
      count: 0,
      userName: "",
      currentPage: 1,
      pages: 1,
      workoutTrainingData: []
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
    this.props.setFetchingData(true);
    Rest.getTraining(page)
      .then(data => {
        this.props.setFetchingData(false);
        let pages = parseInt(data.count / 10);
        if (data.count % 10) ++pages;
        this.setState({
          count: data.count,
          userName: data.results[0].owner.username,
          currentPage: page,
          pages: pages,
          workoutTrainingData: data.results
        });
      })
      .catch (error => {
        if (error.message === "404") this.props.renderNotFoundPage(true);
      });
  }

  handleDeletingTraining(trainingId) {
    return () => {
      const confirmDeleting = confirm("Вы действительно хотите удалить тренировку?");
      if (confirmDeleting) {
        this.props.setFetchingData(true);
        Rest.deleteTraining(trainingId)
        .then(data => {
          this.props.setFetchingData(false);
          if (data.status === 204) {
            let page = this.state.currentPage;
            const newState = this.state.workoutTrainingData.filter(training => !(training.url === data.url));
            this.setState({
              count: this.state.count - 1,
              workoutTrainingData: newState
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
      <WorkoutTraining
        workoutTrainingData={this.state.workoutTrainingData}
        pages={this.state.pages}
        switchPage={this.handleSwitchPage}
        nextPage={this.goToNextPage}
        previousPage={this.goToPreviousPage}
        deleteTraining={this.handleDeletingTraining}
        currentPage={+this.state.currentPage}
      />
    );
  }
}

export default withRouter(WorkoutTrainingsContainer);
