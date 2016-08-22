"use strict";

import Button from "../ButtonComponent/ButtonComponent";

const propTypes = {
  formType: React.PropTypes.string.isRequired
};

const formTypes = {
  workout: [
    { label: "Название", name: "workoutTitle", type: "text", classes: ""},
    { label: "Повторы", name: "workoutRepeats", type: "text", classes: "" },
    { label: "Вес", name: "workoutWeight", type: "text", classes: "" },
    { label: "Отдых", name: "workoutRest", type: "text", classes: "" },
    { label: "Фото", name: "workoutPhoto", type: "file", classes: "form__input_file" }
  ],
  session: [
    { label: "Название трениров", name:"sessionTitle", type: "text", classes: "form__session-title" }
  ]
};

function Form (props) {
  const formType = props.formType;
  let action;
  switch (formType) {
    case ("workout"): action = props.createWorkout; break;
    case ("session"): action = props.createSession; break;
  }
  return (
    <form className="form">
      {
        formTypes[formType].map( (data, i) => {
          return <label key={i} className="form__label">
            {data.label}:
            <input
              type={data.type}
              name={data.name}
              onChange={props.handleInputChange}
              className={`form__input ${data.classes}`}
              value={props.inputValue}
            />
          </label>;
        })
      }
      <div className="form__controls">
        <Button name="Save" action={action}/>
        <Button name="Cancel" action={props.cancelCreate} classes="button_cancel"/>
      </div>
    </form>
  );
}

Form.propTypes = propTypes;

export default Form;
