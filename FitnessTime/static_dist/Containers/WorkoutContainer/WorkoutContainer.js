import Workout from "../../Components/WorkoutComponent/WorkoutComponent";
import animation from "css-animation";
import Rest from "../../rest";

class WorkoutContainer extends React.Component {
  constructor() {
    super();
    this.handleDeletingWorkoutItem = this.handleDeletingWorkoutItem.bind(this);
    this.toggleItemFullData = this.toggleItemFullData.bind(this);
    this.changeItemsOrder = this.changeItemsOrder.bind(this);
    this.state = {
      workoutName: "",
      test: true,
      workoutData: []
    };
  }

  componentWillMount() {
    this.props.getParentRoute("/app");
  }

  componentDidMount() {
    this.fetchData(this.props.params.id);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.workoutName !== nextState.workoutName) {
      this.props.getRouteName(nextState.workoutName);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.id !== nextProps.params.id) this.fetchData(nextProps.params.id);
  }

  fetchData(id) {
    this.props.setFetchingData(true);
    Rest.getTrainings(id)
      .then(data => {
        this.props.setFetchingData(false);
        this.setState({
          workoutName: data.title,
          workoutData: data.exercises.sort((a,b) => b.priority - a.priority)
        });
      })
      .catch (error => {
        if (error.message === "404") this.props.renderNotFoundPage(true);
      });
  }

  handleDeletingWorkoutItem(itemId) {
    return () => {
      const confirmDeleting = confirm("Вы действительно хотите удалить уражнение?");
      if (confirmDeleting) {
        this.props.setFetchingData(true);
        Rest.deleteExercise(itemId)
          .then(data => {
            this.props.setFetchingData(false);
            if (data.status === 204) {
              const newState = this.state.workoutData.filter(training => !(training.url === data.url));
              this.setState({ workoutData: newState });
            }
          });
      }
    };
  }

  toggleItemFullData(e) {
    const allFullDataItems = [...document.querySelectorAll(".workout-item__wrapper")];
    allFullDataItems.forEach(item => {
      const isItemFullDataClose = item.classList.contains("workout-item__wrapper_closed");
      if (e.target.nextSibling === item) this.animateFullData(e.target.nextSibling, !isItemFullDataClose);
      else if (!isItemFullDataClose) this.animateFullData(item, true);
    });
  }

  animateFullData(item, isShown) {
    let height;
    item.classList.toggle("workout-item__wrapper_closed");

    animation(item, "collapse", {
      start() {
        const itemHeight = `${item.offsetHeight}px`;
        if (!isShown) {
          item.style.height = "";
          height = item.offsetHeight;
        }
        item.style.height = itemHeight;
      },
      active() {
        item.style.height = `${isShown ? 0 : height}px`;
      },
      end() {
        if (!isShown) item.style.height = "";
      }
    });
  }

  changeItemsOrder(newOrder) {
    let newState = [];
    newOrder.forEach((oldPosition, newPosition) => newState[newPosition] = this.state.workoutData[oldPosition]);
    this.setState({ workoutData: newState});
  }

  render() {
    return (
      <Workout
        setAppState={this.props.setAppState}
        appState={this.props.appState}
        workoutData={this.state.workoutData}
        toggleItemFullData={this.toggleItemFullData}
        trainingId={this.props.params.id}
        deleteItem={this.handleDeletingWorkoutItem}
        changeItemsOrder={this.changeItemsOrder}
      />
    );
  }
}

export default WorkoutContainer;
