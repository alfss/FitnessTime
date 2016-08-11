"use strict";

import FormComponent from "../../Components/FormComponent/FormComponent";

class Form extends React.Component {
  componentWillMount() {
    //TODO Делать запрос для редактирования формы
    if (this.props.params.id) {
      console.log("Делаю запрос");
    }
  }

  render() {
    return (
      <FormComponent formType={this.props.params.form}/>
    );
  }
}

export default Form;
