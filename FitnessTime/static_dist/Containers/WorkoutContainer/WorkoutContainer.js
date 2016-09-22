import Workout from "../../Components/WorkoutComponent/WorkoutComponent";
import Token from "../../getCSRFToken";
import animation from 'css-animation';

class WorkoutContainer extends React.Component {
  constructor() {
    super();
    this.handleDeletingWorkoutItem = this.handleDeletingWorkoutItem.bind(this);
    this.toggleItemFullData = this.toggleItemFullData.bind(this);
    this.state = {
      workoutName: "",
      workoutData: []
    };
  }

  componentWillMount() {
    this.props.getParentRoute("/app");
  }

  componentDidMount() {
    this.loadWorkoutData();
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.workoutName !== nextState.workoutName) {
      this.props.getRouteName(nextState.workoutName);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.id !== nextProps.params.id) this.fetchData(nextProps.params.id);
  }

  loadWorkoutData() {
    this.props.setFethingData(true);
    this.fetchData(this.props.params.id);
  }

  fetchData(id) {
    fetch(`/api/v1/workout/training/${id}`)
      .then(data => {
        this.props.setFethingData(false);
        if (data.status === 404) throw Error(404);
        return data.json();
      })
      .then(data => {
        this.setState({
          workoutName: data.title,
          workoutData: data.exercises.sort((a,b) => b.priority - a.priority)
        });
      })
      .catch (error => {
        if (error.message === "404") this.props.checkIsPageExist(false);
      });
  }

  handleDeletingWorkoutItem(itemId) {
    return () => {
      const confirmDeleting = confirm("Вы действительно хотите удалить уражнение?");
      if (confirmDeleting) {
        fetch(`/api/v1/workout/exercise/${itemId}`, {
          credentials: "include",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Token
          }
        })
        .then(data => {
          if (data.status === 204) {
            const newState = this.state.workoutData.filter(session => !(session.url === data.url));
            this.setState({
              workoutData: newState
            });
          }
        });
      }
    };
  }

  toggleItemFullData(e) {
    const allFullDataItems = document.querySelectorAll(".workout-item__wrapper");
    allFullDataItems.forEach(item => {
      const isItemFullDataClose = item.classList.contains("workout-item__wrapper_closed");
      if (e.target.nextSibling === item) return;
      if (isItemFullDataClose) return;
        this.animateFullData(item, true);
    });
    const isOpen = !e.target.nextSibling.classList.contains("workout-item__wrapper_closed");
    this.animateFullData(e.target.nextSibling, isOpen);
  }

  animateFullData(item, isShown) {
    let height;
    item.classList.toggle("workout-item__wrapper_closed");

    animation(item, `collapse`, {
      start() {
        if (isShown) {
          item.style.height = `${item.offsetHeight}px`;
        } else {
          const tempHeight = (item.offsetHeight > 0) ? `${item.offsetHeight}px` : 0;
          item.style.height = '';
          height = item.offsetHeight;
          item.style.height = tempHeight;
        }
      },
      active() {
        item.style.height = `${isShown ? 0 : height}px`;
      }
    });
  }

  render() {
    return (
      <Workout
        workoutData={this.state.workoutData}
        toggleItemFullData={this.toggleItemFullData}
        sessionId={this.props.params.id}
        deleteItem={this.handleDeletingWorkoutItem}
      />
    );
  }
}

export default WorkoutContainer;
