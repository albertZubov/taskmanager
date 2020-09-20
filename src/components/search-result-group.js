import { AbstractComponent } from "./absctract-component";

export class SearchResultGroup extends AbstractComponent {
  getTemplate() {
    return `<section class="result__group">
      <!--Append tasks here-->
    </section>`;
  }
}
