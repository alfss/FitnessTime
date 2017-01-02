import Dropzone from "react-dropzone";

const formTypes = {
  exercise: [
    { label: "Название", name: "title", type: "text", placeholder: "Название упражнения"},
    { label: "Повторы", name: "repeat", type: "number", placeholder: "Колличество повторов" },
    { label: "Вес", name: "weight", type: "number", placeholder: "Необходимый вес (в килограммах)" },
    { label: "Отдых", name: "rest_time", type: "number", placeholder: "Время отдыха (в секундах)" }
  ],
  training: [
    { label: "Название тренировки", name:"title", type: "text", placeholder: "Название тренировки" }
  ],
  password: [
    { label: "Пароль", name:"password", type: "password", placeholder: "Введите пароль" },
    { label: "Подтвердите пароль", name:"confirm-password", type: "password", placeholder: "Повторите пароль" }
  ],
  personal: [
    { label: "Новый логин", name:"username", type: "name", placeholder: "Введите новое логин" },
    { label: "Новая почта", name:"email", type: "email", placeholder: "Введите новую почту" }
  ]
};

function Form ({
  isFormEditing,
  handleEditingForm,
  handleCreatingForm,
  handleImageDrop,
  formType,
  handleInputChange,
  inputValue,
  image
}) {
  const action = (isFormEditing) ? handleEditingForm : handleCreatingForm;
  const inputInner = (image)
    ? <img className="form__image" width="115" height="115"  src={image} />
    : <div className="form__input-text">Что бы добавить картинку, нажмите или перенесите файл сюда.</div>;
  const fileInput = formType === "exercise" &&
                    <Dropzone onDrop={handleImageDrop}
                              multiple={false}
                              className="form__input_file"
                              accept="image/*"
                              name="example_photo"
                              >
                      {inputInner}
                    </Dropzone>;

  function renderInput(input, i) {
    return <label key={i} className="form__label">
            {input.label}:
            <span className="form__error removed">(Введите корректную информацию)</span>
            <input className="form__input"
                  type={input.type}
                  name={input.name}
                  onChange={handleInputChange}
                  value={inputValue[input.name]}
                  placeholder={input.placeholder}
                  />
          </label>;
  }

  return (
    <form className="form">
      { formTypes[formType].map(renderInput) }
      { fileInput }
      <div className="form__controls">
        <button className="button" onClick={action}>Save</button>
      </div>
    </form>
  );
}

export default Form;
