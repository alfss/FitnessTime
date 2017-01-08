import Form from "../../Containers/FormContainer/FormContainer";
import Rest from "../../restAPI";

function FormHOC (props) {
  const trainingId = props.params.trainingId;
  const exerciseId = props.params.exerciseId;
  const formInfo = {
    exercise: {
      parentRoute: `/app/workout/${trainingId}`,
      headerName: "Создать упражнение",
      isFetchNeeded: Boolean(exerciseId),
      action: exerciseId ? Rest.putWorkout.bind(Rest) : Rest.postWorkout.bind(Rest),
      formFields: [
        { label: "Название", name: "title", type: "text", placeholder: "Название упражнения", error: "Это поле не должно быть пустым"},
        { label: "Повторы", name: "repeat", type: "number", placeholder: "Колличество повторов", error: "Это поле не должно быть пустым" },
        { label: "Вес", name: "weight", type: "number", placeholder: "Необходимый вес (в килограммах)", error: "Это поле не должно быть пустым" },
        { label: "Отдых", name: "rest_time", type: "number", placeholder: "Время отдыха (в секундах)", error: "Это поле не должно быть пустым" }
      ]
    },
    training: {
      parentRoute: "/app",
      headerName: "Создать тренировку",
      isFetchNeeded: Boolean(trainingId),
      action: trainingId ? Rest.putWorkout.bind(Rest) : Rest.postWorkout.bind(Rest),
      formFields: [
        { label: "Название тренировки", name:"title", type: "text", placeholder: "Название тренировки", error: "Это поле не должно быть пустым" }
      ]
    },
    personal: {
      parentRoute: "/app/profile",
      headerName: "Редактировать профиль",
      isFetchNeeded: false,
      action: Rest.putUserInfo.bind(Rest),
      formFields: [
        { label: "Новый логин", name:"username", type: "name", placeholder: "Введите новый логин", error: "Это поле не должно быть пустым"},
        { label: "Новая почта", name:"email", type: "email", placeholder: "Введите новую почту", error: "Это поле не должно быть пустым"}
      ]
    },
    password: {
      parentRoute: "/app/profile",
      headerName: "Редактировать пароль",
      isFetchNeeded: false,
      action: Rest.putPassword.bind(Rest),
      formFields: [
        { label: "Старый пароль", name:"old_password", type: "password", placeholder: "Введите старый пароль", error: "Это поле не должно быть пустым" },
        { label: "Новый пароль", name:"new_password", type: "password", placeholder: "Введите новый пароль", error: "Это поле не должно быть пустым" },
        { label: "Подтвердите пароль", name:"new_confirm_password", type: "password", placeholder: "Повторите пароль", error: "Пароли должны совпадать" }
      ]
    }
  };
  console.log(props.user);
  return (
    <Form
      {...props}
      // user={props.user}
      formInfo={formInfo[props.params.form]}
      trainingId={trainingId}
      exerciseId={exerciseId}
    />
  );
}

export default FormHOC;
