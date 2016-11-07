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

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen});
  }

  formatRestTimer(time) {
    let minutes = parseInt(time / 60);
    let seconds = (time  - minutes * 60);
    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;
    return `${minutes}:${seconds}`;
  }

  setShouldStartWarning(bool) {
    this.setState({ shouldWarn: bool });
  }


  render() {
    return (
      <WorkoutItem
        {...this.props}
        {...this.state}
        formatRestTimer={this.formatRestTimer}
        setShouldStartWarning={this.setShouldStartWarning}
        toggleModal={this.toggleModal}
      />
    );
  }
}

export default WorkoutItemContainer;
