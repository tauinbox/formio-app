import {BaseComponent} from 'formiojs/build/components/base/Base';

export class Divider extends BaseComponent {
createElement;
ce;
append;

  build() {
    this.createElement();
    let divider = this.ce('element', 'div', {
      class: 'divider'
    });
    this.append(divider);
  }
}

