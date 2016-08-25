import WorkoutItem from "../../Components/WorkoutItemComponent/WorkoutItemComponent";

class WorkoutItemContainer extends React.Component {
  constructor() {
    super();
    this.toggleOpenFullData = this.toggleOpenFullData.bind(this);
    this.formatRestTimer = this.formatRestTimer.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = { isModalOpen: false };
  }

  toggleModal () {
    this.setState({ isModalOpen: !this.state.isModalOpen});
  }

  toggleOpenFullData(e) {
    const fullDataNodes = document.querySelectorAll(".workout__full-data");
    const currentFullDataNode = e.currentTarget.nextSibling;

    for (let node of fullDataNodes) {
      if(node !== currentFullDataNode) {
        if (node.classList.contains("open")) {
          node.classList.remove("open");
          $(node).slideUp("slow");
        }
      }
    }

    currentFullDataNode.classList.toggle("open");
    currentFullDataNode.classList.contains("open")
      ? $(currentFullDataNode).slideDown("slow")
      : $(currentFullDataNode).slideUp("slow");

  }

  formatRestTimer(time) {
    let minutes = parseInt(time / 60);
    if (minutes < 10) minutes = `0${minutes}`;
    let seconds = (time  - minutes * 60);
    if (seconds < 10) seconds = `0${seconds}`;
    return `${minutes}:${seconds}`;
  }

  render() {
    console.log(this.props);
    return (
      <WorkoutItem
        data={this.props.workoutItemData}
        formatRestTimer={this.formatRestTimer}
        toggleOpenFullData={this.toggleOpenFullData}
        isModalOpen={this.state.isModalOpen}
        toggleModal={this.toggleModal}
        deleteItem={this.props.deleteItem}
      />
    );
  }
}

export default WorkoutItemContainer;
