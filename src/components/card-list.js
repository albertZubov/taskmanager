import { AbstractComponent } from "./absctract-component";

export class CardList extends AbstractComponent {
  getTemplate() {
    return `
  <div class="board__tasks"></div>`;
  }
}
