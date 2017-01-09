import WorkoutItem from "../../Components/WorkoutItemComponent/WorkoutItemComponent";

class WorkoutItemContainer extends React.Component {
  constructor() {
    super();
    this.toggleModal = this.toggleModal.bind(this);
    this.setShouldStartWarning = this.setShouldStartWarning.bind(this);
    this.setRepeatsDone = this.setRepeatsDone.bind(this);
    this.state = {
      isModalOpen: false,
      shouldWarn: false,
      currentRepeat: 1
    };
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen});
  }

  setShouldStartWarning(bool) {
    this.setState({ shouldWarn: bool });
  }

  setRepeatsDone(repeat) {
    const newRepeat = +repeat || this.state.currentRepeat + 1;
    this.setState({ currentRepeat: newRepeat});
  }

  render() {
    return (
      <WorkoutItem
        {...this.props}
        {...this.state}
        setShouldStartWarning={this.setShouldStartWarning}
        toggleModal={this.toggleModal}
        setRepeatsDone={this.setRepeatsDone}
      />
    );
  }
}

export default WorkoutItemContainer;
