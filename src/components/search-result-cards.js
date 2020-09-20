import { AbstractComponent } from "./absctract-component";

export class SearchResultCards extends AbstractComponent {
  getTemplate() {
    return `
      <div class="result__cards"></div>`;
  }
}
