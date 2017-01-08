import Dropzone from "react-dropzone";

function Form ({
  image,
  formType,
  inputValue,
  formFields,
  handleImageDrop,
  handleInputChange,
  handleSendingWorkout
}) {
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
            <span className="form__error removed">({input.error})</span>
            <input className="form__input"
                  type={input.type}
                  name={input.name}
                  onChange={handleInputChange}
                  value={inputValue[input.name] || ""}
                  placeholder={input.placeholder}
                  />
          </label>;
  }

  return (
    <form className="form">
      { formFields.map(renderInput) }
      { fileInput }
      <div className="form__controls">
        <button className="button" onClick={handleSendingWorkout}>Save</button>
      </div>
    </form>
  );
}

export default Form;
