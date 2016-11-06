"use strict";

import Button from "../ButtonComponent/ButtonComponent";

const formTypes = {
  exercise: [
    { label: "Название", name: "title", type: "text", placeholder: "Название упражнения"},
    { label: "Повторы", name: "repeat", type: "number", placeholder: "Колличество повторов" },
    { label: "Вес", name: "weight", type: "number", placeholder: "Необходимый вес (в килограммах)" },
    { label: "Отдых", name: "rest_time", type: "number", placeholder: "Время отдыха (в секундах)" }
  ],
  training: [
    { label: "Название тренировки", name:"title", type: "text", classes: "form__training-title", placeholder: "Название тренировки" }
  ]
};

function Form ({isFormEditing, handleEditingForm, handleCreatingForm, formType, handleInputChange, inputValue} = this.props) {
  let action = (isFormEditing) ? handleEditingForm : handleCreatingForm;
  const fileInput = formType === "exercise" &&
    <div>
      <label className="form__label">{"Фото:"}</label>
      <input
      type={"file"}
      name={"example_photo"}
      className={"form__input form__input_file"}
      accept="image/*"
      onChange={handleInputChange}
      />
    </div>;

  function renderInput(input, i) {
    let value = inputValue[input.name] || "";
    return <label key={i} className="form__label">
            {input.label}:
            <span className="form__error removed">(Введите корректную информацию)</span>
            <input
            type={input.type}
            name={input.name}
            onChange={handleInputChange}
            className={`form__input ${input.classes || ""}`}
            value={value}
            placeholder={input.placeholder}
            />
          </label>;
  }

  return (
    <form className="form">
      { formTypes[formType].map(renderInput) }
      { fileInput }
      <div className="form__controls">
        <Button name="Save" action={action}/>
      </div>
    </form>
  );
}

export default Form;
