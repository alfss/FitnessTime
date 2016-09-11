"use strict";

import FormComponent from "../../Components/FormComponent/FormComponent";
import Token from "../../getCSRFToken";
import { withRouter } from "react-router";

class Form extends React.Component {
  constructor() {
    super();
    this.createSession = this.createSession.bind(this);
    this.createWorkout = this.createWorkout.bind(this);
    this.editSession = this.editSession.bind(this);
    this.editWorkout = this.editWorkout.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.checkForUnsavedData = this.checkForUnsavedData.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.state = {
      formType: "",
      isDataSaved: false,
      newData: {},
      oldData: {}
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.formType !== nextState.formType) {
      let formHeaderName;
      switch (nextState.formType) {
        case "workout": formHeaderName = "Создать тренировку"; break;
        case "session": formHeaderName = "Создать сессию"; break;
      }
      if (nextState.oldData.title) formHeaderName = `Редиктировать ${nextState.oldData.title}`;
      this.props.getRoutePathName(formHeaderName);
    }
  }

  componentDidUpdate() {
    if (this.state.isDataSaved) {
      this.props.params.form !== "session"
        ? this.props.router.push(`/workout/${this.props.params.id}`)
        : this.props.router.push("/");
    }
  }

  componentDidMount() {
    this.props.router.setRouteLeaveHook(this.props.route, this.checkForUnsavedData);

    if (this.props.params.exerciseId || this.props.params.form === "session" &&  this.props.params.id) {
      fetch(`/api/v1/workout/training/${this.props.params.id}`)
      .then(data => data.json())
      .then(data => {
        let formData = this.props.params.form === "session"
          ? {title: data.title}
          : data.exercises.filter(exercise => exercise.uuid === this.props.params.exerciseId)[0];
        this.setState({
          formType: this.props.params.form,
          newData: formData,
          oldData: formData
        });
      });
    } else {
      this.setState({ formType: this.props.params.form });
    }
  }

  checkForUnsavedData() {
    if (this.state.isDataSaved) return;
    const message = "You have unsaved information, are you sure you want to leave this page?";
    for (let key in this.state.newData) {
      if (!this.state.oldData.title) {
        if (this.state.newData[key]) return message;
      } else {
        if (key === "example_photo" && this.state.newData[key] === "") continue;
        if (this.state.oldData[key] !== this.state.newData[key]) return message;
      }
    }
  }

  handleInputChange(e) {
    if (!e.target.previousSibling.classList.contains("hidden")) e.target.previousSibling.classList.add("hidden");
    var newValue = Object.assign({}, this.state.newData);
    newValue[e.target.name] = e.target.value;
    this.setState({
      newData : newValue
    });
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

  createSession(e) {
    e.preventDefault();
    const body = JSON.stringify({ "title" : this.state.newData.title });
    const options = this.createOptions("POST", body, "application/json");

    fetch("/api/v1/workout/training/", options)
    .then(data => {
      if (data.status === 201) {
        this.setState({isDataSaved: true});
        this.props.router.push("/");
      }
    });
  }

  createWorkout(e) {
    e.preventDefault();
    if (!this.isFormValid()) return;
    const sessionUrl = "/api/v1/workout/exercise/";
    const formData = new FormData(document.querySelector(".form"));
    formData.append("training", this.props.params.id);
    const options = this.createOptions("POST", formData);

    fetch(sessionUrl, options)
    .then(data => {
      if (data.status === 201) {
        this.setState({isDataSaved: true});
      }
    });
  }

  editWorkout(e) {
    e.preventDefault();
    if (!this.isFormValid()) return;
    const workoutItemUrl = `/api/v1/workout/exercise/${this.state.newData.uuid}/`;
    const formData = new FormData(document.querySelector(".form"));
    formData.append("training", this.props.params.id);
    const options = this.createOptions("PUT", formData);

    fetch(workoutItemUrl, options)
    .then(data => {
      if (data.status === 200) {
        this.setState({isDataSaved: true});
      }
    });
  }

  editSession(e) {
    e.preventDefault();
    const workoutSessionUrl = `/api/v1/workout/training/${this.props.params.id}/`;
    const body = new FormData(document.querySelector(".form"));
    const options = this.createOptions("PUT", body);
    console.log(options);

    fetch(workoutSessionUrl, options)
    .then(data => {
      if (data.status === 200) {
        this.setState({isDataSaved: true});
      }
    });
  }

  isFormValid() {
    let isFormValid = true;
    const form = document.forms[0];
    const fieldsForChecking = ["title", "repeat", "weight", "rest_time"];
    for (var i =0; i < fieldsForChecking.length; i++) {
      const formField = form[fieldsForChecking[i]];
      if (!formField.value) {
        isFormValid = false;
        formField.previousSibling.classList.remove("hidden");
      }
      if ((fieldsForChecking[i] === "weight" || fieldsForChecking[i] === "rest_time") && isNaN(+formField.value)) {
        isFormValid = false;
        formField.previousSibling.classList.remove("hidden");
      }
    }
    return isFormValid;
  }

  render() {
    const isFormEditing = this.props.params.exerciseId || this.props.params.form === "session" &&  this.props.params.id ? true : false;
    return (
      <FormComponent
        formType={this.props.params.form}
        editForm={isFormEditing}
        createSession={this.createSession}
        createWorkout={this.createWorkout}
        editSession={this.editSession}
        editWorkout={this.editWorkout}
        handleInputChange={this.handleInputChange}
        inputValue={this.state.newData}
      />
    );
  }
}

export default withRouter(Form);
