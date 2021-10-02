import Core from '../core';

export class Icon extends Core {
  public onClick: (name: string) => void;

  constructor(parentNode: HTMLElement, iconName: string, disabled = false, order = '') {
    super(parentNode, 'div');
    this.node.classList.add('text-2xl', 'cursor-pointer', 'text-red-400', `${order? order : ''}`);
    this.setDisabledStatus(disabled);

    const icon = new Core(this.node, 'span', 'iconify');
    icon.node.setAttribute('data-icon', `mdi:${iconName}`);
    this.node.onclick = () => {
      this.onClick(iconName);
    };
  }

  setDisabledStatus(status: boolean) {
    status
      ? this.node.classList.add('text-yellow-300')
      : this.node.classList.remove('text-yellow-300');
  }
}
