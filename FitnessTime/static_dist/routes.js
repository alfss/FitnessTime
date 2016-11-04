"use strict";

import { Router, Route, IndexRoute } from "react-router";

import App from "./Containers/AppContainer/AppContainer";
import Workout from "./Containers/WorkoutContainer/WorkoutContainer";
import WorkoutTraining from "./Containers/WorkoutTrainingContainer/WorkoutTrainingContainer";
import Form from "./Containers/FormContainer/FormContainer";
import NotFound404 from "./Components/NotFound404Component/NotFound404Container";

const routes = (
  <Router>
    <Route path="/app" component={App}>
      <IndexRoute component={WorkoutTraining}/>
      <Route path="page:page" component={WorkoutTraining}/>
      <Route path="workout/:id" component={Workout}/>
      <Route path="form/:form" component={Form}>
        <Route path=":id" component={Form}>
          <Route path=":exerciseId" component={Form} />
        </Route>
      </Route>
      <Route path="*" component={NotFound404}/>
    </Route>
  </Router>
);

export default routes;
