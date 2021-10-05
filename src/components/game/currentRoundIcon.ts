import Core from '../core';

export class CurrentRoundIcon extends Core {
  private roundNumber: Core<HTMLSpanElement>;

  constructor(parentNode: HTMLElement, roundNumber: number) {
    super(parentNode, 'div');
    this.node.classList.add('game-current-round-icon');
    const icon = new Core<HTMLSpanElement>(this.node, 'span');
    icon.node.classList.add('iconify');
    icon.node.setAttribute('data-icon', 'bx:bx-message-square');
    this.roundNumber = new Core<HTMLSpanElement>(
      this.node,
      'span',
      'game-current-round-counter',
      roundNumber.toString(),
    );
  }
  changeRoundNumber(roundNumber: number): void {
    this.roundNumber.node.textContent = roundNumber.toString();
  }
}
