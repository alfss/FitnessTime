"use strict";

import FormComponent from "../../Components/FormComponent/FormComponent";
import Token from "../../getCSRFToken";
import { withRouter } from "react-router";

class Form extends React.Component {
  constructor() {
    super();
    this.createSession = this.createSession.bind(this);
    this.createWorkout = this.createWorkout.bind(this);
    this.editWorkout = this.editWorkout.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.checkForUnsavedData = this.checkForUnsavedData.bind(this);
    this.state = {
      newData: {},
      oldData: {}
    };
  }

  componentDidMount() {
    this.props.router.setRouteLeaveHook(this.props.route, this.checkForUnsavedData);

    if (this.props.params.exerciseId) {
      fetch(`/api/v1/workout/training/${this.props.params.id}`)
      .then(data => data.json())
      .then(data => data.exercises.filter(exercise => exercise.uuid === this.props.params.exerciseId ))
      .then(data => {
        this.setState({
          newData: data[0],
          oldData: data[0]
        });
      });
    }
  }

  checkForUnsavedData() {
    const message = "You have unsaved information, are you sure you want to leave this page?";
    for (let key in this.state.newData) {
      if (!this.state.oldData) {
        if (this.state.newData[key]) return message;
      } else {
        if (this.state.newData[key] !== this.state.oldData[key]) return message;
      }
    }
  }

  handleInputChange(e) {
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
    const body = JSON.stringify({ "title" : this.state.title });
    const options = this.createOptions("POST", body, "application/json");

    fetch("/api/v1/workout/training/", options)
    .then(data => {
      if (data.status === 201) {
        this.props.router.push("/");
      }
    });
  }

  createWorkout(e) {
    e.preventDefault();
    const sessionUrl = "/api/v1/workout/exercise/";
    const formData = new FormData(document.querySelector(".form"));
    formData.append("training", this.props.params.id);
    const options = this.createOptions("POST", formData);

    fetch(sessionUrl, options)
    .then(data => {
      if (data.status === 201) {
        data.json().then(value => this.props.router.push(`/workout/${value.training}`));
      }
    });
  }

  editWorkout(e) {
    e.preventDefault();
    const workoutItemUrl = `/api/v1/workout/exercise/${this.state.uuid}/`;
    const formData = new FormData(document.querySelector(".form"));
    formData.append("training", this.props.params.id);
    const options = this.createOptions("PUT", formData);

    fetch(workoutItemUrl, options)
    .then(data => {
      if (data.status === 200) {
        this.props.router.push(`/workout/${this.props.params.id}`);
      }
    });
  }

  render() {
    const isFormEditing = this.props.params.exerciseId ? true : false;
    return (
      <FormComponent
        formType={this.props.params.form}
        editForm={isFormEditing}
        createSession={this.createSession}
        createWorkout={this.createWorkout}
        editWorkout={this.editWorkout}
        handleInputChange={this.handleInputChange}
        inputValue={this.state.newData}
      />
    );
  }
}

export default withRouter(Form);
