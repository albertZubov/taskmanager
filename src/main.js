import { MainController } from "./controllers/main";
import { API } from "./components/api";

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://12.ecmascript.pages.academy/task-manager`;

// Очистка main
export const main = document.querySelector(`.main`);
const controlRemove = main.querySelector(`.control`);
main.removeChild(controlRemove);

// Запуск контроллера MainController
const api = new API({ endPoint: END_POINT, authorization: AUTHORIZATION });
api.getCards().then((cards) => {
  new MainController(cards, onDataChange).init();
});

/* eslint-disable */
const onDataChange = (actionType, update) => {
  switch (actionType) {
    case `delete`:
      console.log(update);
      api
        .deleteCard({
          id: update.id,
        })
        .then(() => api.getCards())
        .then((cards) => new MainController(cards, onDataChange));
      break;
  }
};
