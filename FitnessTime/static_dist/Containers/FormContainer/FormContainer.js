import FormComponent from "../../Components/FormComponent/FormComponent";
import { withRouter } from "react-router";
import Rest from "../../restAPI";

class Form extends React.Component {
  constructor(props) {
    super();
    this.trainingId = props.params.trainingId;
    this.exerciseId = props.params.exerciseId;
    this.isTraining = props.params.form === "training";
    this.parentRoute = "";
    this.handleCreatingForm = this.handleCreatingForm.bind(this);
    this.handleEditingForm = this.handleEditingForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageDrop = this.handleImageDrop.bind(this);
    this.checkForUnsavedData = this.checkForUnsavedData.bind(this);
    this.state = {
      isDataSaved: false,
      imagePreview: "",
      oldData: {},
      newData: {}
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.oldData.title !== nextState.oldData.title) {
      this.props.getRouteName(`Редиктировать ${nextState.newData.title}`);
      document.title = `Редиктировать ${nextState.newData.title}`;
    }
  }

  componentDidUpdate() {
    if (this.state.isDataSaved) {
      this.props.router.push(this.parentRoute);
    }
  }

  componentWillMount() {
    this.parentRoute = this.getInfoFromFormType({
      exercise: `/app/workout/${this.trainingId}`,
      training: "/app",
      personal: "/app/profile",
      password: "/app/profile"
    });
    this.props.getParentRoute(this.parentRoute);
  }

  componentDidMount() {
    this.props.router.setRouteLeaveHook(this.props.route, this.checkForUnsavedData);
    if (this.isFetchNeeded()) {
      this.fetchData();
    } else {
      let formHeaderName = this.getInfoFromFormType({
        exercise: "Создать упражнение",
        training: "Создать тренировку",
        personal: "Редактировать профиль",
        password: "Редактировать пароль"
      });
      this.props.getRouteName(formHeaderName);
      document.title = formHeaderName;
    }
  }

  isFetchNeeded() {
    return this.getInfoFromFormType({
      exercise: Boolean(this.exerciseId),
      training: Boolean(this.trainingId),
      personal: false,
      password: false
    });
  }

  getInfoFromFormType(obj) {
    return obj[this.props.params.form];
  }

  fetchData() {
    this.props.setFetchingData(true);
    Rest.getTrainings(this.trainingId)
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
    const id = this.isTraining ? this.trainingId : this.state.newData.uuid;
    this.props.setFetchingData(true);
    Rest.putExercise(this.props.params.form, id, body)
      .then(data => {
        this.props.setFetchingData(false);
        if (data.status === 200) this.setState({ isDataSaved: true });
      });
  }

  createBody() {
    let body = new FormData(document.querySelector(".form"));
    if (!this.isTraining) body.append("training", this.trainingId);
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
    console.log(this.state);
    const isFormEditing = this.exerciseId || this.isTraining && this.trainingId;
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
