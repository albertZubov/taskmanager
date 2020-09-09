import { AbstractComponent } from "./absctract-component";

export class Board extends AbstractComponent {
  getTemplate() {
    return `
  <section class="board container">
    </section>
  `;
  }
}
