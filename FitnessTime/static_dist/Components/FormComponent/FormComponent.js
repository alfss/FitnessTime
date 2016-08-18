"use strict";

import Button from "../ButtonComponent/ButtonComponent";

const propTypes = {
  formType: React.PropTypes.string.isRequired
};

const formTypes = {
  workout: [
    { label: "Повторы", type: "text", classes: "" },
    { label: "Вес", type: "text", classes: "" },
    { label: "Отдых", type: "text", classes: "" },
    { label: "Фото", type: "file", classes: "form__input_file" }
  ],
  session: [
    { label: "Название трениров", type: "text", classes: "" }
  ]
};

function Form (props) {
  const  formType = props.formType;
  return (
    <form className="form">
      {
        formTypes[formType].map( (data, i) => {
          return <label key={i} className="form__label">
            {data.label}:
            <input type={data.type} className={`form__input ${data.classes}`} value="" />
          </label>;
        })
      }
      <div className="form__controls">
        <Button name="Save" type="submit"/>
        <Button name="Cancel" classes="button_cancel"/>
      </div>
    </form>
  );
}

Form.propTypes = propTypes;

export default Form;
