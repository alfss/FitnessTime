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
    { label: "Название", name: "title", type: "text", classes: "", placeholder: "Название упражнения"},
    { label: "Повторы", name: "repeat", type: "text", classes: "", placeholder: "Колличество повторов" },
    { label: "Вес", name: "weight", type: "number", classes: "", placeholder: "Необходимый вес (в килограммах)" },
    { label: "Отдых", name: "rest_time", type: "number", classes: "", placeholder: "Время отдыха (в секундах)" },
    { label: "Фото", name: "example_photo", type: "file", classes: "form__input_file", placeholder: "" }
  ],
  session: [
    { label: "Название тренировки", name:"title", type: "text", classes: "form__session-title", placeholder: "Название тренировки" }
  ]
};

function Form (props) {
  let action = (props.isFormEditing) ? props.handleEditingForm : props.handleCreatingForm;

  return (
    <form className="form">
      {
        formTypes[props.formType].map( (data, i) => {
          const fileInput = document.querySelector(".form__input_file");
          let value = props.inputValue[data.name] || "";
          if (fileInput && fileInput.files.length === 0 && data.name === "example_photo") value = "";

          return <label key={i} className="form__label">
            {data.label}:
            <span className="form__error hidden">(Введите корректную информацию)</span>
            <input
              type={data.type}
              name={data.name}
              onChange={props.handleInputChange}
              className={`form__input ${data.classes}`}
              value={value}
              placeholder={data.placeholder}
            />
          </label>;
        })
      }
      <div className="form__controls">
        <Button name="Save" action={action}/>
      </div>
    </form>
  );
}

Form.propTypes = propTypes;

export default Form;
