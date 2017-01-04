import Form from "../../Containers/FormContainer/FormContainer";
import Rest from "../../restAPI";

function FormHOC (props) {
  const formType = props.params.form;
  const trainingId = props.params.trainingId;
  const exerciseId = props.params.exerciseId;
  const data = {
    exercise: {
      parentRoute: `/app/workout/${trainingId}`,
      headerName: "Создать упражнение",
      isFetchNeeded: Boolean(exerciseId),
      isEditable: Boolean(exerciseId),
      action: exerciseId ? Rest.putWorkout.bind(Rest) : Rest.postWorkout.bind(Rest),
      formFields: [
        { label: "Название", name: "title", type: "text", placeholder: "Название упражнения"},
        { label: "Повторы", name: "repeat", type: "number", placeholder: "Колличество повторов" },
        { label: "Вес", name: "weight", type: "number", placeholder: "Необходимый вес (в килограммах)" },
        { label: "Отдых", name: "rest_time", type: "number", placeholder: "Время отдыха (в секундах)" }
      ]
    },
    training: {
      parentRoute: "/app",
      headerName: "Создать тренировку",
      isFetchNeeded: Boolean(trainingId),
      isEditable: Boolean(trainingId),
      action: trainingId ? Rest.putWorkout.bind(Rest) : Rest.postWorkout.bind(Rest),
      formFields: [
        { label: "Название тренировки", name:"title", type: "text", placeholder: "Название тренировки" }
      ]
    },
    personal: {
      parentRoute: "/app/profile",
      headerName: "Редактировать профиль",
      isFetchNeeded: false,
      action: Rest.putUserInfo.bind(Rest),
      formFields: [
        { label: "Новый логин", name:"username", type: "name", placeholder: "Введите новое логин" },
        { label: "Новая почта", name:"email", type: "email", placeholder: "Введите новую почту" }
      ]
    },
    password: {
      parentRoute: "/app/profile",
      headerName: "Редактировать пароль",
      isFetchNeeded: false,
      action: Rest.putUserInfo.bind(Rest),
      formFields: [
        { label: "Пароль", name:"password", type: "password", placeholder: "Введите пароль" },
        { label: "Подтвердите пароль", name:"confirm-password", type: "password", placeholder: "Повторите пароль" }
      ]
    }
  };

  return (
    <Form
      {...props}
      formInfo={data[formType]}
      trainingId={trainingId}
      exerciseId={exerciseId}
    />
  );
}

export default FormHOC;
