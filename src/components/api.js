import { ModelCard } from "./model-card";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status} : ${response.statusText}`);
  }
};

const toJSON = (response) => {
  return response.json();
};

export class API {
  constructor({ endPoint, authorization }) {
    this._authorization = authorization;
    this._endPoint = endPoint;
  }

  getCards() {
    return this._load({ url: `tasks` })
      .then(toJSON)
      .then((cards) => {
        return ModelCard.parseCards(cards);
      });
  }

  createCard({ card }) {
    return this._load({
      url: `tasks`,
      method: Method.POST,
      body: JSON.stringify(card),
      headers: new Headers({ "Content-type": "application/json" }),
    })
      .then(toJSON)
      .then(ModelCard.parseCard);
  }

  updateCard({ id, data }) {
    return this._load({
      url: `tasks/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data),
      headers: new Headers({ "Content-type": "application/data" }),
    })
      .then(toJSON)
      .then(ModelCard.parseCard);
  }

  deleteCard({ id }) {
    return this._load({
      url: `tasks/${id}`,
      method: Method.DELETE,
    });
  }

  _load({ url, method = Method.GET, body = null, headers = new Headers() }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, { method, body, headers })
      .then(checkStatus)
      .catch((err) => {
        console.error(`fetch error: ${err}`);
        throw err;
      });
  }
}
