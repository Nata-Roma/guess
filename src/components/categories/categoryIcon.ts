import Core from '../core';

export class CategoryIcon extends Core {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div');
    this.node.classList.add('category-icon');
    const icon = new Core<HTMLSpanElement>(this.node, 'span');
    icon.node.classList.add('iconify');
    icon.node.setAttribute('data-icon', 'ic:round-done-all');
  }
}
