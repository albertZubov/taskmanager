import { MainController } from "./controllers/main";
import { API } from "./components/api";

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://htmlacademy-es-9.appspot.com/task-manager`;

// Очистка main
export const main = document.querySelector(`.main`);
const controlRemove = main.querySelector(`.control`);
main.removeChild(controlRemove);

/* eslint-disable */
const onDataChange = (actionType, update) => {
  console.log(update);
  switch (actionType) {
    case `delete`:
      api
        .deleteCard({
          id: update.id,
        })
        .then(() => api.getCards())
        .then((cards) => mainCtrl.render(cards));
      break;
    case `update`:
      api
        .updateCard({
          id: update.id,
          data: update.toRAW(),
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
