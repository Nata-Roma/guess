import Core from '../core';

export class BtnBack extends Core {
  node!: HTMLButtonElement;
  public onClick: () => void;
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'button');
    this.node.classList.add('game-current-round-icon');

    const icon = new Core<HTMLSpanElement>(this.node, 'span');
    icon.node.classList.add('iconify');
    icon.node.setAttribute('data-icon', 'system-uicons:backward');

    this.node.onclick = () => {
      this.onClick();
    };
  }
}
