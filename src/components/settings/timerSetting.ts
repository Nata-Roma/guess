import Core from '../core';

export class TimerSettings extends Core {
  public onClick: (status: boolean) => void;
  public onInput: (time: string) => void;
  private iconContainer: Core;
  private time: Core<HTMLInputElement>;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div');
    this.node.classList.add('timer-settings-container');

    let isTimer = false;

    const label = new Core(this.node);
    label.node.classList.add('flex', 'space-x-4', 'items-center');

    const title = new Core(label.node);
    title.node.textContent = 'Timer';
    title.node.classList.add('text-red-400', 'text-2xl');

    this.iconContainer = new Core(label.node);
    this.iconContainer.node.classList.add(
      'text-red-400',
      'text-3xl',
      'cursor-pointer',
    );
    this.iconContainer.node.classList.add('text-yellow-400');
    const icon = new Core<HTMLSpanElement>(this.iconContainer.node, 'span');

    icon.node.classList.add('iconify');
    icon.node.setAttribute('data-icon', 'mdi:timelapse');

    this.time = new Core<HTMLInputElement>(this.node, 'input');
    this.time.node.classList.add('input-timer');
    this.time.node.classList.add('text-yellow-400');
    this.time.node.type = 'number';
    this.time.node.value = '20';
    this.time.node.min = '10';
    this.time.node.max = '30';
    this.time.node.disabled = !isTimer;
    this.time.node.oninput = (e) => {
      const value = (<HTMLInputElement>e.target).value;
      this.onInput(value);
    };

    this.iconContainer.node.onclick = () => {
      isTimer = !isTimer;
      this.time.node.disabled = !isTimer;
      if (isTimer) {
        this.iconContainer.node.classList.remove('text-yellow-400');
        this.time.node.classList.remove('text-yellow-400');
      } else {
        this.clearTimer();
      }
      this.onClick(isTimer);
    };
  }
  clearTimer() {
    this.iconContainer.node.classList.add('text-yellow-400');
    this.time.node.classList.add('text-yellow-400');
    this.time.node.value = '20';
  }
}
