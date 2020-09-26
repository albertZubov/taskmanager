import { AbstractComponent } from "./absctract-component";

export class CreateLoadMore extends AbstractComponent {
  getTemplate() {
    return `
    <button class="load-more" type="button">load-more</button>
    `;
  }
}
