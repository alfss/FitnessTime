import Token from "./getCSRFToken";

class rest {
  getUserProfile() {
    return this.restGet("/api/v1/common/users/profile/");
  }

  getTraining(page = 1) {
    const url = (page === 1) ? "/api/v1/workout/training/" : `/api/v1/workout/training/?page=${page}`;
    return this.restGet(url);
  }

  getTrainings(id) {
    const url = `/api/v1/workout/training/${id}`;
    return this.restGet(url);
  }

  restGet(url) {
    return fetch(url, { credentials: "include" })
    .then(data => {
      if (data.status === 404) throw Error(404);
      return data.json();
    });
  }

  deleteTraining(training) {
    return this.restDelete("training", training);
  }

  deleteExercise(exercise) {
    return this.restDelete("exercise", exercise);
  }

  restDelete(path, id) {
    const options = this.createOptions({
      method: "DELETE",
      includeType: true
    });
    return fetch(`/api/v1/workout/${path}/${id}`, options);
  }

  postItemsOrder(id, body) {
    const options = this.createOptions({
      method: "POST",
      includeType: true,
      body
    });
    return this.restSend(`/api/v1/workout/training/${id}/set_order_exercises/`, options);
  }

  postWorkout(path, body) {
    const options = this.createOptions({
      method: "POST",
      body
    });
    return this.restSend(`/api/v1/workout/${path}/`, options);
  }


  putUserInfo(body) {
    return this.putForm("/api/v1/common/users/profile/", body);
  }

  putWorkout(path, id, body) {
    return this.putForm(`/api/v1/workout/${path}/${id}/`, body);
  }

  putForm(link, body) {
    const options = this.createOptions({
      method: "PUT",
      body
    });
    return this.restSend(link, options);
  }

  restSend(url, options) {
    return fetch(url, options);
  }

  createOptions(data) {
    let options = {
      credentials: "include",
      headers: {
        "Accept": "application/json, application/xml, text/plain, text/html",
        "X-CSRFToken": Token
      },
      method: data.method
    };
    if (data.includeType) options.headers["Content-Type"] = "application/json";
    if (data.body) options.body = data.body;
    return options;
  }
}

export default new rest();
