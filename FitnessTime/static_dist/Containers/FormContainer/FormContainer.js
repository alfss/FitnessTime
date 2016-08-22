"use strict";

import FormComponent from "../../Components/FormComponent/FormComponent";

class Form extends React.Component {
  constructor() {
    super();
    this.getCookie = this.getCookie.bind(this);
    this.createSession = this.createSession.bind(this);
    this.createWorkout = this.createWorkout.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.cancelCreate = this.cancelCreate.bind(this);
    this.state = {};
  }

  componentWillMount() {
    //TODO Делать запрос для редактирования формы
    console.log(this.props.params.id);
    if (this.props.params.id) {
      console.log("Делаю запрос");
    }
  }

  handleInputChange(e) {
    this.setState({ [e.target.name] : e.target.value });
  }

  getCookie(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  createSession(e) {
    e.preventDefault();
    const sessionUrl = "/api/v1/workout/training/";
    const csrfToken = this.getCookie("csrftoken");
    const sessionTitle = this.state.sessionTitle;

    fetch(sessionUrl, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken
      },
      body: JSON.stringify({ title: sessionTitle })
    })
    .then(data => data.json())
    .then(data => console.log(data));
  }

  createWorkout(e) {
    e.preventDefault();
    const sessionUrl = "/api/v1/workout/exercise/";
    const csrfToken = this.getCookie("csrftoken");
    console.log(this.state);
    fetch(sessionUrl, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken
      },
      body: JSON.stringify({
        title: this.state.workoutTitle,
        repeat: this.state.workoutRepeats,
        weight: +this.state.workoutWeight,
        rest_time: +this.state.workoutRest,
        example_photo: document.querySelector(".form__input_file").files[0],
        training: this.props.params.id
      })
    })
    .then(data => data.json())
    .then(data => console.log(data));
  }

  cancelCreate(e) {
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <FormComponent
        formType={this.props.routeParams.form}
        createSession={this.createSession}
        createWorkout={this.createWorkout}
        handleInputChange={this.handleInputChange}
        inputValue={this.state.title}
        cancelCreate={this.cancelCreate}
      />
    );
  }
}

export default Form;
