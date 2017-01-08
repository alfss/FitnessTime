import FormComponent from "../../Components/FormComponent/FormComponent";
import { withRouter } from "react-router";
import Rest from "../../restAPI";

class Form extends React.Component {
  constructor(props) {
    super();
    this.parentRoute = props.formInfo.parentRoute;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSendingWorkout = this.handleSendingWorkout.bind(this);
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

  componentWillReceiveProps(nextProps) {
    if (this.props.params.form === "personal" && nextProps.user.username) {
      this.setUserProfile(nextProps.user);
    }
  }

  componentDidUpdate() {
    if (this.state.isDataSaved) {
      this.props.router.push(this.parentRoute);
    }
  }

  componentWillMount() {
    this.props.getParentRoute(this.parentRoute);
  }

  componentDidMount() {
    this.props.router.setRouteLeaveHook(this.props.route, this.checkForUnsavedData);
    if (this.props.formInfo.isFetchNeeded) {
      this.fetchData(this.getTrainings.bind(this));
    } else {
      let formHeaderName = this.props.formInfo.headerName;
      this.props.getRouteName(formHeaderName);
      document.title = formHeaderName;
    }
  }

  setUserProfile(user) {
    this.setState({
      newData: user,
      oldData: user
    });
  }

  getTrainings() {
    return Rest.getTrainings(this.props.trainingId)
      .then(data => {
        let formData = this.props.exerciseId
          ? data.exercises.find(exercise => exercise.uuid === this.props.exerciseId)
          : { title: data.title };
        if (!formData) throw Error(404);
        this.setState({
          newData: formData,
          oldData: formData,
          imagePreview: formData.example_photo
        });
      }).catch( error => {
        if (error.message === "404") this.props.renderNotFoundPage(true);
      });
  }

  fetchData(fetchData) {
    this.props.setFetchingData(true);
    fetchData().then(this.props.setFetchingData);
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

  handleSendingWorkout(e) {
    e.preventDefault();
    if (!this.isFormValid()) return;
    const body = this.createBody();
    const id = this.props.exerciseId || this.props.trainingId;
    this.props.formInfo.action(body, this.props.params.form, id)
      .then(data => {
        this.props.setFetchingData(false);
        if (data.ok) this.setState({ isDataSaved: true });
      });
  }

  createBody() {
    let body = new FormData(document.querySelector(".form"));
    if (!this.isTraining) body.append("training", this.props.trainingId);
    for (let key of body.keys()) {
      if (!body.get(key)) body.delete(key);
    }
    return body;
  }

  isFormValid() {
    let isFormValid = true;
    const form = document.forms[0];
    this.props.formInfo.formFields.forEach(field => {
      const formField = form[field.name];
      if (!formField.value
          || field.name === "new_confirm_password"
          && formField.value !== form["new_password"].value) {
        isFormValid = false;
        formField.previousSibling.classList.remove("removed");
      }
    });
    return isFormValid;
  }

  isDataChanged() {
    for (let key in this.state.newData) {
      const newValue = this.state.newData[key];
      const oldValue = this.state.oldData[key];
      if (!oldValue && newValue
          || key === "example_photo" && newValue !== this.state.imagePreview
          || oldValue && oldValue !== newValue) {
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <FormComponent
        formType={this.props.params.form}
        formFields={this.props.formInfo.formFields}
        handleInputChange={this.handleInputChange}
        handleImageDrop={this.handleImageDrop}
        handleSendingWorkout={this.handleSendingWorkout}
        inputValue={this.state.newData}
        image={this.state.imagePreview}
      />
    );
  }
}

export default withRouter(Form);
