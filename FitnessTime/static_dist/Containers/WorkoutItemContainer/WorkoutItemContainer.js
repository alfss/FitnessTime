import WorkoutItem from "../../Components/WorkoutItemComponent/WorkoutItemComponent";

class WorkoutItemContainer extends React.Component {
  constructor() {
    super();
    this.formatRestTimer = this.formatRestTimer.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.setShouldStartWarning = this.setShouldStartWarning.bind(this);
    this.state = {
      isModalOpen: false,
      shouldWarn: false
    };
  }

  toggleModal () {
    this.setState({ isModalOpen: !this.state.isModalOpen});
  }

  formatRestTimer(time) {
    let minutes = parseInt(time / 60);
    if (minutes < 10) minutes = `0${minutes}`;
    let seconds = (time  - minutes * 60);
    if (seconds < 10) seconds = `0${seconds}`;
    return `${minutes}:${seconds}`;
  }

  setShouldStartWarning(bool) {
    this.setState({ shouldWarn: bool });
  }

  render() {
    return (
      <WorkoutItem
        data={this.props.workoutItemData}
        formatRestTimer={this.formatRestTimer}
        shouldWarn={this.state.shouldWarn}
        setShouldStartWarning={this.setShouldStartWarning}
        isModalOpen={this.state.isModalOpen}
        toggleModal={this.toggleModal}
        deleteItem={this.props.deleteItem}
        toggleItemFullData={this.props.toggleItemFullData}
      />
    );
  }
}

export default WorkoutItemContainer;
