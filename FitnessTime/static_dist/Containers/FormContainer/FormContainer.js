import FormComponent from "../../Components/FormComponent/FormComponent";
import { withRouter } from "react-router";
import Rest from "../../restAPI";

class Form extends React.Component {
  constructor(props) {
    super();
    this.isTraining = props.params.form === "training";
    this.parentRoute;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSendingForm = this.handleSendingForm.bind(this);
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
    this.parentRoute = this.props.formInfo.parentRoute;
    this.props.getParentRoute(this.parentRoute);
  }

  componentDidMount() {
    this.props.router.setRouteLeaveHook(this.props.route, this.checkForUnsavedData);
    if (this.props.formInfo.isFetchNeeded) {
      const fetchFunction = this.props.trainingId ? this.getTrainings.bind(this) : this.getUserProfile.bind(this);
      this.fetchData(fetchFunction);
    } else {
      let formHeaderName = this.props.formInfo.headerName;
      this.props.getRouteName(formHeaderName);
      document.title = formHeaderName;
    }
  }

  getInfoFromFormType(obj) {
    return obj[this.props.params.form];
  }

  getUserProfile() {
    return Rest.getUserProfile()
      .then(data => {
        this.setState({
          newData: data,
          oldData: data
        });
      });
  }

  getTrainings() {
    return Rest.getTrainings(this.props.trainingId)
      .then(data => {
        let formData = this.props.exerciseId
          ? data.exercises.filter(exercise => exercise.uuid === this.props.exerciseId)[0]
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

  handleSendingForm(e) {
    e.preventDefault();
    if (!this.isFormValid()) return;
    const body = this.createBody();
    const id = this.isTraining ? this.props.trainingId : this.state.newData.uuid;
    this.props.formInfo.action(body, this.props.params.form, id)
      .then(data => {
        this.props.setFetchingData(false);
        if (data.status === 200 || data.status === 201 ) this.setState({ isDataSaved: true });
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
    const fieldsForChecking = this.props.formInfo.formFields.map(field => field.name);
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
      if (!this.state.oldData[key]) {
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
    return (
      <FormComponent
        formType={this.props.params.form}
        formFields={this.props.formInfo.formFields}
        handleInputChange={this.handleInputChange}
        handleImageDrop={this.handleImageDrop}
        handleSendingForm={this.handleSendingForm}
        inputValue={this.state.newData}
        image={this.state.imagePreview}
      />
    );
  }
}

export default withRouter(Form);
