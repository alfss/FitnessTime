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
    this.cancelCreate = this.cancelCreate.bind(this);
    this.state = {};
  }

  componentWillMount() {
    if (this.props.params.exerciseId) {
      fetch(`/api/v1/workout/training/${this.props.params.id}`)
      .then(data => data.json())
      .then(data => data.exercises.filter(exercise => exercise.uuid === this.props.params.exerciseId ))
      .then(data => {
        this.setState({
          title: data[0].title,
          repeat: data[0].repeat,
          rest_time: data[0].rest_time,
          weight: data[0].weight,
          uuid: data[0].uuid
        });
      });
    }
  }

  handleInputChange(e) {
    this.setState({ [e.target.name] : e.target.value });
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

  cancelCreate(e) {
    e.preventDefault();
    console.log(this.state);
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
        inputValue={this.state}
        cancelCreate={this.cancelCreate}
      />
    );
  }
}

export default withRouter(Form);
