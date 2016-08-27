"use strict";

import { Router, Route, IndexRoute } from "react-router";

import App from "./Containers/App/App";
import Workout from "./Containers/WorkoutContainer/WorkoutContainer";
import WorkoutSession from "./Containers/WorkoutSessionContainer/WorkoutSessionContainer";
import Form from "./Containers/FormContainer/FormContainer";
import NotFound404 from "./Components/NotFound404Component/NotFound404Container";

const routes = (
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={WorkoutSession}/>
      <Route path="page:page" component={WorkoutSession}/>
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
