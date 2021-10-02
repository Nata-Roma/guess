import Core from '../core';
import { InputRange } from './inputRange';

export class InputBox extends Core {
  private input: InputRange;

  constructor(parentNode: HTMLElement, initVolume: string) {
    super(parentNode, 'div');
    this.node.classList.add(
      'flex',
      'flex-col',
      'items-center',
      'my-4',
      'space-y-3',
      'w-full',
    );

    this.input = new InputRange(this.node, initVolume);
    const inputVal = new Core(this.node, 'div');
    inputVal.node.classList.add('text-base', 'text-yellow-700');
    inputVal.node.textContent = `0%`;
    this.input.onInput = (val: string) => {
      inputVal.node.textContent = `${val}%`;
    };
  }

  setEnable(status: boolean) {
    this.input.setEnable(status);
  }
}
