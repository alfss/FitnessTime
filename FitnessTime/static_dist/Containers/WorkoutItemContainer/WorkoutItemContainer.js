import WorkoutItem from "../../Components/WorkoutItemComponent/WorkoutItemComponent";

class WorkoutItemContainer extends React.Component {
  constructor() {
    super();
    this.formatRestTimer = this.formatRestTimer.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.setShouldStartWarning = this.setShouldStartWarning.bind(this);
    this.setRepeatsDone = this.setRepeatsDone.bind(this);
    this.state = {
      isModalOpen: false,
      shouldWarn: false,
      repeatsDone: 1
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

  setRepeatsDone(repeat) {
    const newRepeat = +repeat || this.state.repeatsDone + 1;
    this.setState({ repeatsDone: newRepeat});
  }

  render() {
    return (
      <WorkoutItem
        {...this.props}
        {...this.state}
        formatRestTimer={this.formatRestTimer}
        setShouldStartWarning={this.setShouldStartWarning}
        toggleModal={this.toggleModal}
        setRepeatsDone={this.setRepeatsDone}
      />
    );
  }
}

export default WorkoutItemContainer;
