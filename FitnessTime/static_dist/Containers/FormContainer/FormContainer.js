import FormComponent from "../../Components/FormComponent/FormComponent";
import { withRouter } from "react-router";
import Rest from "../../rest";

class Form extends React.Component {
  constructor(props) {
    super();
    this.id = props.params.id;
    this.exerciseId = props.params.exerciseId;
    this.isTraining = props.params.form === "training";
    this.handleCreatingForm = this.handleCreatingForm.bind(this);
    this.handleEditingForm = this.handleEditingForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageDrop = this.handleImageDrop.bind(this);
    this.checkForUnsavedData = this.checkForUnsavedData.bind(this);
    this.state = {
      isDataSaved: false,
      imagePreview: "",
      oldData: {},
      newData: {
        "title": "",
        "repeat": "",
        "weight": "",
        "rest_time": ""
      }
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.newData.title !== nextState.newData.title) {
      this.props.getRouteName(`Редиктировать ${nextState.newData.title}`);
    }
  }

  componentDidUpdate() {
    if (this.state.isDataSaved) {
      (!this.isTraining)
        ? this.props.router.push(`/app/workout/${this.id}`)
        : this.props.router.push("/app");
    }
  }

  componentWillMount() {
    if (!this.isTraining && !this.id) this.props.renderNotFoundPage(true);
    let parentRoute = (!this.isTraining)
      ? `/app/workout/${this.id}`
      : "/app";
    this.props.getParentRoute(parentRoute);
  }

  componentDidMount() {
    this.props.router.setRouteLeaveHook(this.props.route, this.checkForUnsavedData);
    if (this.exerciseId || this.isTraining && this.id) {
      this.fetchData();
    } else {
      let formHeaderName = (this.isTraining) ? "Создать тренировку" : "Создать упражнение";
      this.props.getRouteName(formHeaderName);
    }
  }

  fetchData() {
    this.props.setFetchingData(true);
    Rest.getTrainings(this.id)
      .then(data => {
        this.props.setFetchingData(false);
        let formData = this.exerciseId
          ? data.exercises.filter(exercise => exercise.uuid === this.exerciseId)[0]
          : { title: data.title };
        if (!formData) throw Error(404);
        this.setState({
          newData: formData,
          oldData: formData,
          imagePreview: formData.example_photo
        });
      })
      .catch( error => {
        if (error.message === "404") this.props.renderNotFoundPage(true);
      });
  }

  checkForUnsavedData() {
    if (this.state.isDataSaved) return;
    const message = "You have unsaved information, are you sure you want to leave this page?";
    if (this.isDataChanged()) return message;
  }


  handleInputChange(e) {
    if (!e.target.previousSibling.classList.contains("removed")) e.target.previousSibling.classList.add("removed");
    let newValue = Object.assign({}, this.state.newData);
    let targetValue;
    if (e.target.type === "number") {
      targetValue = parseInt(e.target.value);
      if (isNaN(targetValue)) targetValue = "";
    } else {
      targetValue = e.target.value;
    }
    newValue[e.target.name] = targetValue;
    this.setState({ newData : newValue });
  }

  handleImageDrop(image) {
    this.setState({ imagePreview: image[0].preview });
  }

  handleCreatingForm(e) {
    e.preventDefault();
    if (!this.isFormValid()) return;
    const body = this.createBody();
    this.props.setFetchingData(true);
    Rest.postForm(this.props.params.form, body)
      .then(data => {
        this.props.setFetchingData(false);
        if (data.status === 201) this.setState({ isDataSaved: true });
      });
  }

  handleEditingForm(e) {
    e.preventDefault();
    if (!this.isFormValid()) return;
    const body = this.createBody();
    const id = this.isTraining ? this.id : this.state.newData.uuid;
    this.props.setFetchingData(true);
    Rest.putForm(this.props.params.form, body, id)
      .then(data => {
        this.props.setFetchingData(false);
        if (data.status === 200) this.setState({ isDataSaved: true });
      });
  }

  createBody() {
    let body = new FormData(document.querySelector(".form"));
    if (!this.isTraining) body.append("training", this.id);
  //  body.append("priority", +Date.now().toString().slice(-10, -2));
    return body;
  }

  isFormValid() {
    let isFormValid = true;
    const form = document.forms[0];
    const fieldsForChecking = (this.isTraining) ? ["title"] : ["title", "repeat", "weight", "rest_time"];
    for (let i = 0; i < fieldsForChecking.length; i++) {
      const formField = form[fieldsForChecking[i]];
      if (!formField.value) {
        isFormValid = false;
        formField.previousSibling.classList.remove("removed");
      }
    }
    return isFormValid;
  }

  isDataChanged() {
    for (let key in this.state.newData) {
      if (!this.state.oldData.title) {
        if (this.state.newData[key]) return true;
      } else {
        if (key === "example_photo") {
          if (this.state.newData[key] !== this.state.imagePreview) return true;
          else continue;
        }
        if (this.state.oldData[key] !== this.state.newData[key]) return true;
      }
    }
    return false;
  }

  render() {
    const isFormEditing = this.exerciseId || this.isTraining && this.id;
    return (
      <FormComponent
        formType={this.props.params.form}
        isFormEditing={isFormEditing}
        handleCreatingForm={this.handleCreatingForm}
        handleEditingForm={this.handleEditingForm}
        handleInputChange={this.handleInputChange}
        handleImageDrop={this.handleImageDrop}
        inputValue={this.state.newData}
        image={this.state.imagePreview}
      />
    );
  }
}

export default withRouter(Form);
