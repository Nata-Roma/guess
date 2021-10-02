import Core from '../core';

export class InputRange extends Core {
  node!: HTMLInputElement;
  private volume: string;
  public onInput: (val: string) => void;

  constructor(parentNode: HTMLElement, volume: string) {
    super(parentNode, 'input');
    this.volume = volume;
    this.node.classList.add('input-slider');
    this.node.type = 'range';
    this.node.min = '1';
    this.node.max = '100';
    this.node.step = '1';
    this.node.setAttribute('disabled', 'true');
    this.node.value = '0';
    this.node.style.backgroundSize = `0%`;
    
    this.node.oninput = (e) => {
      const pos = (<HTMLInputElement>e.target).value;
      this.node.style.backgroundSize = `${pos}%`;
      this.onInput(pos);
    };
  }

  setEnable(status: boolean) {
    if (status) {
      this.node.setAttribute('disabled', 'true');
      // this.node.classList.add('cursor-not-allowed');
      this.node.value = '0';
      this.node.style.backgroundSize = `0%`;
      this.onInput('0');
    } else {
      this.node.removeAttribute('disabled');
      // this.node.classList.remove('cursor-not-allowed');
      this.node.value = this.volume;
      this.node.style.backgroundSize = `${this.volume}%`;
      this.onInput(this.volume);
    }
  }
}
