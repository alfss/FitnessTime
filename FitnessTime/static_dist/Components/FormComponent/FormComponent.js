"use strict";

import Button from "../ButtonComponent/ButtonComponent";

const propTypes = {
  formType: React.PropTypes.string.isRequired,
  isFormEditing: React.PropTypes.bool.isRequired,
  handleCreatingForm: React.PropTypes.func.isRequired,
  handleEditingForm: React.PropTypes.func.isRequired,
  handleInputChange: React.PropTypes.func.isRequired,
  inputValue: React.PropTypes.object.isRequired
};

const formTypes = {
  workout: [
    { label: "Название", name: "title", type: "text", placeholder: "Название упражнения"},
    { label: "Повторы", name: "repeat", type: "number", placeholder: "Колличество повторов" },
    { label: "Вес", name: "weight", type: "number", placeholder: "Необходимый вес (в килограммах)" },
    { label: "Отдых", name: "rest_time", type: "number", placeholder: "Время отдыха (в секундах)" }
  ],
  session: [
    { label: "Название тренировки", name:"title", type: "text", classes: "form__session-title", placeholder: "Название тренировки" }
  ]
};

function Form (props) {
  let action = (props.isFormEditing) ? props.handleEditingForm : props.handleCreatingForm;
  const fileInput = props.formType === "workout" &&
    <div>
      <label className="form__label">{"Фото:"}</label>
      <input
      type={"file"}
      name={"example_photo"}
      className={"form__input form__input_file"}
      accept="image/*"
      onChange={props.handleInputChange}
      />
    </div>;

  return (
    <form className="form">
      {
        formTypes[props.formType].map( (data, i) => {
          let value = props.inputValue[data.name] || "";

          return <label key={i} className="form__label">
            {data.label}:
            <span className="form__error hidden">(Введите корректную информацию)</span>
            <input
              type={data.type}
              name={data.name}
              onChange={props.handleInputChange}
              className={`form__input ${data.classes || ""}`}
              value={value}
              placeholder={data.placeholder}
            />
          </label>;
        })
      }
      {fileInput}
      <div className="form__controls">
        <Button name="Save" action={action}/>
      </div>
    </form>
  );
}

Form.propTypes = propTypes;

export default Form;
