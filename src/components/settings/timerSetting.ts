import Core from '../core';

export class TimerSettings extends Core {
  public onClick: (status: boolean) => void;
  public onInput: (time: string) => void;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div');
    this.node.classList.add('timer-settings-container');

    let isTimer = false;

    const label = new Core(this.node);
    label.node.classList.add('flex', 'space-x-4', 'items-center');

    const title = new Core(label.node);
    title.node.textContent = 'Timer';
    title.node.classList.add('text-red-400', 'text-2xl');

    const iconContainer = new Core(label.node);
    iconContainer.node.classList.add(
      'text-red-400',
      'text-3xl',
      'cursor-pointer',
    );
    iconContainer.node.classList.add('text-yellow-400');
    const icon = new Core<HTMLSpanElement>(iconContainer.node, 'span');

    icon.node.classList.add('iconify');
    icon.node.setAttribute('data-icon', 'mdi:timelapse');

    const time = new Core<HTMLInputElement>(this.node, 'input');
    time.node.classList.add('input-timer');
    time.node.classList.add('text-yellow-400');
    time.node.type = 'number';
    time.node.value = '20';
    time.node.min = '10';
    time.node.max = '30';
    time.node.disabled = !isTimer;
    time.node.oninput = (e) => {
      const value = (<HTMLInputElement>e.target).value;
      this.onInput(value);
    };

    iconContainer.node.onclick = () => {
      isTimer = !isTimer;
      time.node.disabled = !isTimer;
      if (isTimer) {
        iconContainer.node.classList.remove('text-yellow-400');
        time.node.classList.remove('text-yellow-400');
      } else {
        iconContainer.node.classList.add('text-yellow-400');
        time.node.classList.add('text-yellow-400');
        time.node.value = '20';
      }
      this.onClick(isTimer);
    };
  }
}
