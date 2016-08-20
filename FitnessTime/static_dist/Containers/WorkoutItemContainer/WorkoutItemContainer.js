import WorkoutItem from "../../Components/WorkoutItemComponent/WorkoutItemComponent";

class WorkoutItemContainer extends React.Component {
  constructor() {
    super();
    this.toggleOpenFullData = this.toggleOpenFullData.bind(this);
    this.formatRestTimer = this.formatRestTimer.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = { isModalOpen: false };
  }
  openModal () {
    this.setState({isModalOpen: true});
  }

  closeModal () {
    this.setState({isModalOpen: false});
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
    let minutes = parseInt(time / 60000);
    if (minutes < 10) minutes = `0${minutes}`;
    let seconds = (time  - minutes*60000) / 1000;
    if (seconds < 10) seconds = `0${seconds}`;
    return minutes + ":" + seconds;
  }

  render() {
    console.log(this.props);
    return (
      <WorkoutItem
        id={this.props.workoutItemData.uuid}
        image={this.props.workoutItemData.example_photo}
        title={this.props.workoutItemData.title}
        repeats={this.props.workoutItemData.repeat}
        rest={this.formatRestTimer(this.props.workoutItemData.rest)}
        weight={this.props.workoutItemData.weight}
        toggleOpenFullData={this.toggleOpenFullData}

        isModalOpen={this.state.isModalOpen}
        openModal={this.openModal}
        closeModal={this.closeModal}
      />
    );
  }
}

export default WorkoutItemContainer;
