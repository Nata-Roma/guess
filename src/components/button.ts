import Core from "./core";

export class Button extends Core {
  node!: HTMLButtonElement;
  public onClick: (btnName: string) => void

  constructor(parentNode: HTMLElement, style: string, content: string, btnName: string) {
    super(parentNode, 'button', style, content);
    this.node.onclick = () => {
      this.onClick(btnName);
    }
  }
}