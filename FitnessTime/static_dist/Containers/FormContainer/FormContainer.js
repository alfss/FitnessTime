"use strict";

import FormComponent from "../../Components/FormComponent/FormComponent";
import { withRouter } from "react-router";
import rest from "../../rest";

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
      let formHeaderName = (nextState.formType === "exercise") ? "Создать упражнение" : "Создать тренировку";
      if (nextState.oldData.title) formHeaderName = `Редиктировать ${nextState.oldData.title}`;
      this.props.getRouteName(formHeaderName);
    }
  }

  componentDidUpdate() {
    if (this.state.isDataSaved) {
      this.props.params.form !== "training"
        ? this.props.router.push(`/app/workout/${this.props.params.id}`)
        : this.props.router.push("/app");
    }
  }

  componentWillMount() {
    if (this.props.params.form === "exercise" && !this.props.params.id) this.props.checkIsPageExist(false);
    let parentRoute;
    switch (this.props.params.form) {
      case "exercise": parentRoute = `/app/workout/${this.props.params.id}`; break;
      case "training": parentRoute = "/app"; break;
    }
    this.props.getParentRoute(parentRoute);
  }

  componentDidMount() {
    this.props.router.setRouteLeaveHook(this.props.route, this.checkForUnsavedData);
    this.setupForm();
  }

  setupForm() {
    if (this.props.params.exerciseId || this.props.params.form === "training" &&  this.props.params.id) {
      this.fetchData();
    } else this.setState({ formType: this.props.params.form });
  }

  fetchData() {
    rest.getTrainings(this.props.params.id)
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


  handleInputChange(e) {
    if (!e.target.previousSibling.classList.contains("removed")) e.target.previousSibling.classList.add("removed");
    let newValue = Object.assign({}, this.state.newData);
    newValue[e.target.name] = (e.target.type === "number") ? +e.target.value : e.target.value;
    this.setState({ newData : newValue });
  }

  handleCreatingForm(e) {
    e.preventDefault();
    if (!this.validateForm()) return;
    const body = this.createBody();
    rest.postForm(this.props.params.form, body)
      .then(data => {
        if (data.status === 201) this.setState({ isDataSaved: true });
      });
  }

  handleEditingForm(e) {
    e.preventDefault();
    if (!this.validateForm()) return;
    const body = this.createBody();
    const id = this.props.params.form === "training" ? this.props.params.id : this.state.newData.uuid;
    rest.putForm(this.props.params.form, body, id)
      .then(data => {
        if (data.status === 200) this.setState({ isDataSaved: true });
      });
  }

  createBody() {
    let body = new FormData(document.querySelector(".form"));
    if (this.state.formType === "exercise") body.append("training", this.props.params.id);
    body.append("priority", +Date.now().toString().slice(-10, -2));
    return body;
  }

  validateForm() {
    if (!this.isDataChanged()) {
      this.setState({ isDataSaved: true });
      return false;
    }
    if (!this.isFormValid()) return false;
    return true;
  }

  isFormValid() {
    let isFormValid = true;
    const form = document.forms[0];
    const fieldsForChecking = (this.state.formType === "training") ? ["title"] : ["title", "repeat", "weight", "rest_time"];
    for (let i =0; i < fieldsForChecking.length; i++) {
      const formField = form[fieldsForChecking[i]];
      const isFieldEmpty = !formField.value;
      const isFieldNaN = (fieldsForChecking[i] === "weight" || fieldsForChecking[i] === "rest_time") && isNaN(+formField.value);
      if (isFieldNaN || isFieldEmpty) {
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
        if (key === "example_photo" && this.state.newData[key] === "") continue;
        if (this.state.oldData[key] !== this.state.newData[key]) return true;
      }
    }
    return false;
  }

  render() {
    const isFormEditing = this.props.params.exerciseId || this.props.params.form === "training" &&  this.props.params.id ? true : false;
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
