import WorkoutItem from "../../Components/WorkoutItemComponent/WorkoutItemComponent";

class WorkoutItemContainer extends React.Component {
  constructor() {
    super();
    this.formatRestTimer = this.formatRestTimer.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.setShouldStartWarning = this.setShouldStartWarning.bind(this);
    this.state = {
      isModalOpen: false,
      isMenuOpen: false,
      shouldWarn: false
    };
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen});
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.toggleMenu);
  }

  toggleMenu(e) {
    if (e.target.classList.contains("workout-item__menu-item_link")) return;
    if (!this.state.isMenuOpen) document.addEventListener("click", this.toggleMenu);
    else document.removeEventListener("click", this.toggleMenu);
    this.setState({ isMenuOpen: !this.state.isMenuOpen});
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
        data={this.props.workoutItemData}
        formatRestTimer={this.formatRestTimer}
        shouldWarn={this.state.shouldWarn}
        setShouldStartWarning={this.setShouldStartWarning}
        toggleModal={this.toggleModal}
        isModalOpen={this.state.isModalOpen}
        toggleMenu={this.toggleMenu}
        isMenuOpen={this.state.isMenuOpen}
        deleteItem={this.props.deleteItem}
        toggleItemFullData={this.props.toggleItemFullData}
      />
    );
  }
}

export default WorkoutItemContainer;
