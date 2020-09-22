import { MainController } from "./controllers/main";

// Очистка main
export const main = document.querySelector(`.main`);
const controlRemove = main.querySelector(`.control`);
main.removeChild(controlRemove);

// Запуск контроллера mainController
const mainController = new MainController();
mainController._init();
