"use strict";

import FormComponent from "../../Components/FormComponent/FormComponent";
import Token from "../../getCSRFToken";
import { withRouter } from "react-router";

class Form extends React.Component {
  constructor() {
    super();
    this.handleCreatingForm = this.handleCreatingForm.bind(this);
    this.handleEditingForm = this.handleEditingForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.checkForUnsavedData = this.checkForUnsavedData.bind(this);
    this.state = {
      formType: "",
      isDataSaved: false,
      newData: {},
      oldData: {}
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.formType !== nextState.formType) {
      let formHeaderName = (nextState.formType === "workout") ? "Создать упражнение" : "Создать тренировку";
      if (nextState.oldData.title) formHeaderName = `Редиктировать ${nextState.oldData.title}`;
      this.props.getRouteName(formHeaderName);
    }
  }

  componentDidUpdate() {
    if (this.state.isDataSaved) {
      this.props.params.form !== "session"
        ? this.props.router.push(`/app/workout/${this.props.params.id}`)
        : this.props.router.push("/app");
    }
  }

  componentWillMount() {
    if (this.props.params.form === "workout" && !this.props.params.id) this.props.checkIsPageExist(false);
    let parentRoute;
    switch (this.props.params.form) {
      case "workout": parentRoute = `/app/workout/${this.props.params.id}`; break;
      case "session": parentRoute = "/app"; break;
    }
    this.props.getParentRoute(parentRoute);
  }

  componentDidMount() {
    this.props.router.setRouteLeaveHook(this.props.route, this.checkForUnsavedData);
    this.setupForm();
  }

  setupForm() {
    if (this.props.params.exerciseId || this.props.params.form === "session" &&  this.props.params.id) {
      this.props.setFethingData(true);
      this.fetchData();
    } else this.setState({ formType: this.props.params.form });
  }

  fetchData() {
    fetch(`/api/v1/workout/training/${this.props.params.id}`)
      .then(data => {
        this.props.setFethingData(false);
        if (data.status === 404) throw Error(404);
        return data.json();
      })
      .then(data => {
        let formData = this.props.params.exerciseId
          ? data.exercises.filter(exercise => exercise.uuid === this.props.params.exerciseId)[0]
          : { title: data.title };
        if (!formData) throw Error(404);
        this.setState({
          formType: this.props.params.form,
          newData: formData,
          oldData: formData
        });
      })
      .catch( error => {
        if (error.message === "404") this.props.checkIsPageExist(false);
      });
  }

  checkForUnsavedData() {
    if (this.state.isDataSaved) return;
    const message = "You have unsaved information, are you sure you want to leave this page?";
    if (this.isDataChanged()) return message;
  }

  isDataChanged() {
    for (let key in this.state.newData) {
      if (!this.state.oldData.title) {
        if (this.state.newData[key]) return true;
      } else {
        if (key === "example_photo" && this.state.newData[key] === "") continue;
        if (this.state.oldData[key] !== this.state.newData[key]) return true;
      }
    }
    return false;
  }

  handleInputChange(e) {
    if (!e.target.previousSibling.classList.contains("hidden")) e.target.previousSibling.classList.add("hidden");
    let newValue = Object.assign({}, this.state.newData);
    newValue[e.target.name] = (e.target.type === "number") ? +e.target.value : e.target.value;
    this.setState({ newData : newValue });
  }

  handleCreatingForm(e) {
    e.preventDefault();
    const fetchUrl = this.createFetchUrl(false);
    this.sendDataToServer(fetchUrl, "POST", 201);
  }

  handleEditingForm(e) {
    e.preventDefault();
    const fetchUrl = this.createFetchUrl(true);
    this.sendDataToServer(fetchUrl, "PUT", 200);
  }

  createFetchUrl(isEditing) {
    switch (this.state.formType) {
      case ("session"):
        return isEditing ? `/api/v1/workout/training/${this.props.params.id}/` : "/api/v1/workout/training/";
      case ("workout"):
        return isEditing ? `/api/v1/workout/exercise/${this.state.newData.uuid}/` : "/api/v1/workout/exercise/";
    }
  }

  sendDataToServer(url, method, code) {
    if (!this.isDataChanged()) {
      this.setState({ isDataSaved: true });
      return;
    }
    if (!this.isFormValid()) return;
    let body = new FormData(document.querySelector(".form"));
    if (this.state.formType === "workout") body.append("training", this.props.params.id);
    body.append("priority", +Date.now().toString().slice(-10, -2));
    const options = this.createOptions(method, body);

    fetch(url, options)
    .then(data => {
      if (data.status === code) this.setState({ isDataSaved: true });
    });
  }

  isFormValid() {
    let isFormValid = true;
    const form = document.forms[0];
    const fieldsForChecking = (this.state.formType === "session") ? ["title"] : ["title", "repeat", "weight", "rest_time"];
    for (let i =0; i < fieldsForChecking.length; i++) {
      const formField = form[fieldsForChecking[i]];
      const isFieldEmpty = !formField.value;
      const isFieldNaN = (fieldsForChecking[i] === "weight" || fieldsForChecking[i] === "rest_time") && isNaN(+formField.value);
      if (isFieldNaN || isFieldEmpty) {
        isFormValid = false;
        formField.previousSibling.classList.remove("hidden");
      }
    }
    return isFormValid;
  }

  createOptions(method, body, contentType) {
    let options = {
      credentials: "include",
      headers: {
        "Accept": "application/json, application/xml, text/plain, text/html",
        "X-CSRFToken": Token
      },
      method,
      body
    };
    if (contentType) options.headers["Content-Type"] = contentType;
    return options;
  }

  render() {
    const isFormEditing = this.props.params.exerciseId || this.props.params.form === "session" &&  this.props.params.id ? true : false;
    return (
      <FormComponent
        formType={this.props.params.form}
        isFormEditing={isFormEditing}
        handleCreatingForm={this.handleCreatingForm}
        handleEditingForm={this.handleEditingForm}
        handleInputChange={this.handleInputChange}
        inputValue={this.state.newData}
      />
    );
  }
}

export default withRouter(Form);
