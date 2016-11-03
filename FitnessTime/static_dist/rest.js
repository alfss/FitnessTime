import Token from "./getCSRFToken";

class rest {

  getSession(page = 1) {
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

  deleteSession(session) {
    return this.restDelete("training", session);
  }

  deleteTraining(training) {
    return this.restDelete("exercise", training);
  }

  restDelete(path, id) {
    return fetch(`/api/v1/workout/${path}/${id}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Token
      }
    });
  }

  postForm(path, body) {
    return this.restSend(`/api/v1/workout/${path}/`, body, "POST");
  }

  putForm(path, body, id) {
    return this.restSend(`/api/v1/workout/${path}/${id}/`, body, "PUT");
  }

  restSend(url, body, method) {
    return fetch(url, {
      credentials: "include",
      headers: {
        "Accept": "application/json, application/xml, text/plain, text/html",
        "X-CSRFToken": Token
      },
      method,
      body
    });
  }
}

export default new rest();
