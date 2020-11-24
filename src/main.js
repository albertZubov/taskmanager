import { MainController } from "./controllers/main";
import { API } from "./components/api";
import { TaskActions } from "./controllers/card";

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://htmlacademy-es-9.appspot.com/task-manager`;

// Очистка main
export const main = document.querySelector(`.main`);
const controlRemove = main.querySelector(`.control`);
main.removeChild(controlRemove);

/* eslint-disable */
const onDataChange = (actionType, card, onError) => {
  switch (actionType) {
    case TaskActions.delete:
      api
        .deleteCard({
          id: card.id,
        })
        .then(() => api.getCards())
        .then((cards) => {
          mainCtrl.render(cards);
        })
        .catch(() => {
          onError();
        });
      break;
    case TaskActions.update:
      api
        .updateCard({
          id: card.id,
          data: card.toRAW(),
        })
        .then(() => api.getCards())
        .then((cards) => {
          mainCtrl.render(cards);
        })
        .catch(() => {
          onError();
        });
      break;
    case TaskActions.create:
      api
        .createCard({
          card: card.toRAW(),
        })
        .then(() => api.getCards())
        .then((cards) => mainCtrl.render(cards));
      break;
  }
};

// Запуск контроллера MainController
const mainCtrl = new MainController(onDataChange);
const api = new API({ endPoint: END_POINT, authorization: AUTHORIZATION });

api.getCards().then((cards) => {
  mainCtrl.render(cards);
});
