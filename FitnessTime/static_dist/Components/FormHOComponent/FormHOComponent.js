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
      action: exerciseId ? Rest.putWorkout.bind(Rest) : Rest.postWorkout
    },
    training: {
      parentRoute: "/app",
      headerName: "Создать тренировку",
      isFetchNeeded: Boolean(trainingId),
      isEditable: Boolean(trainingId),
      action: trainingId ? Rest.putWorkout.bind(Rest) : Rest.postWorkout
    },
    personal: {
      parentRoute: "/app/profile",
      headerName: "Редактировать профиль",
      isFetchNeeded: false,
      isEditable: Rest.putUserInfo.bind(Rest)
    },
    password: {parentRoute: "/app/profile", headerName: "Редактировать пароль", isFetchNeeded: false}
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
