import { IGameData } from '../../utils/interfaces';
import Core from '../core';

export class GameOverPopup extends Core {
  private statusText: Core;
  private btnPopup: Core<HTMLButtonElement>;
  public onClick: () => void;
  private score: Core;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'game-popup');
    const gamePopupInner = new Core(this.node, 'div', 'game-popup-info');

    this.statusText = new Core(gamePopupInner.node, 'div', 'text-3xl');
    this.statusText.node.classList.add(
      'font-semibold',
      'md:text-4xl',
      'text-yellow-700',
    );
    this.statusText.node.textContent = 'Game Over!';

    const iconBox = new Core(gamePopupInner.node, 'div', 'text-yellow-500');
    iconBox.node.classList.add('py-3', 'md:py-5');
    const icon = new Core<HTMLSpanElement>(
      iconBox.node,
      'span',
      'game-over-icon',
    );
    icon.node.classList.add('iconify');
    icon.node.setAttribute('data-icon', 'system-uicons:trophy');

    const resultInfo = new Core(gamePopupInner.node, 'div', 'game-result-info');
    const result = new Core(resultInfo.node, 'div', '', 'Your result:');
    this.score = new Core(resultInfo.node, 'div');

    this.btnPopup = new Core<HTMLButtonElement>(
      gamePopupInner.node,
      'button',
      'button',
      'OK',
    );
    this.btnPopup.node.classList.add('mx-auto');
    this.btnPopup.node.onclick = () => {
      this.onClick();
    }
  }

  show(result: string): void {
    this.node.style.display = 'flex';
    this.score.node.textContent = result + '!';
  }

  hide(): void {
    this.node.style.display = 'none';
  }
}
