import { Router, Route, IndexRoute } from "react-router";
import App from "./Containers/AppContainer/AppContainer";
import Workout from "./Containers/WorkoutContainer/WorkoutContainer";
import WorkoutTraining from "./Containers/WorkoutTrainingContainer/WorkoutTrainingContainer";
import Form from "./Components/FormHOComponent/FormHOComponent";
import Profile from "./Containers/ProfileContainer/ProfileContainer";
import NotFound404 from "./Components/NotFound404Component/NotFound404Container";

const routes = (
  <Router>
    <Route path="/app" component={App}>
      <IndexRoute component={WorkoutTraining}/>
      <Route path="profile" component={Profile}/>
      <Route path="page:page" component={WorkoutTraining}/>
      <Route path="workout/:id" component={Workout}/>
      <Route path="form/:form" component={Form}>
        <Route path=":trainingId" component={Form}>
          <Route path=":exerciseId" component={Form} />
        </Route>
      </Route>
      <Route path="*" component={NotFound404}/>
    </Route>
  </Router>
);

export default routes;
