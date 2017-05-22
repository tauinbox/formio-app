import {BaseComponent} from 'formiojs/build/components/base/Base';

export class Divider extends BaseComponent {
element;
ce;

  build() {
    this.element = this.ce('element', 'div', {
      class: 'divider'
    });
  }
}

