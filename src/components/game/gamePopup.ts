import { IGameData } from '../../utils/interfaces';
import Core from '../core';

export class GamePopup extends Core {
  private statusBlock: Core;
  private statusIcon: Core<HTMLSpanElement>;
  private statusText: Core;
  private image: Core<HTMLImageElement>;
  private infoBlock: Core;
  private btnPopup: Core<HTMLButtonElement>;
  public onClick: (choice: string) => void;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'game-popup');
    const gamePopupInner = new Core(this.node, 'div', 'game-popup-info');
    this.statusBlock = new Core(gamePopupInner.node, 'div');
    this.statusBlock.node.classList.add(
      'flex',
      'justify-center',
      'items-center',
      'pb-4',
      'space-x-3',
      'text-red-500',
    );
    this.statusIcon = new Core(this.statusBlock.node);

    this.statusText = new Core(this.statusBlock.node, 'div', 'text-2xl');
    this.statusText.node.classList.add('font-semibold', 'md:text-3xl');

    const imageBlock = new Core(gamePopupInner.node, 'div');
    imageBlock.node.classList.add(
      'h-40',
      'w-full',
      'md:w-4/5',
      'mx-auto',
      'md:h-52',
      'border',
      'border-yellow-500',
      'rounded-md',
      'mb-8',
    );
    this.image = new Core<HTMLImageElement>(imageBlock.node, 'img');
    this.image.node.classList.add('w-full', 'h-full', 'object-cover');

    this.infoBlock = new Core(gamePopupInner.node, 'div', 'flex');
    this.infoBlock.node.classList.add(
      'flex-col',
      'justify-center',
      'items-center',
      'text-green-600',
      'text-2xl',
      'mb-4',
    );

    this.btnPopup = new Core<HTMLButtonElement>(
      gamePopupInner.node,
      'button',
      'button',
      'Continue',
    );
    this.btnPopup.node.classList.add('mx-auto');
    // this.showPopupInfo(true);
  }
  showPopupInfo(status: boolean, choice: string, gameData?: IGameData): void {
    this.node.style.display = 'flex';

    const icon = new Core<HTMLSpanElement>(
      this.statusIcon.node,
      'span',
      'game-popup-icon',
    );
    icon.node.classList.add('iconify');
    if (status) {
      this.statusBlock.node.classList.add('text-green-500');
      icon.node.setAttribute('data-icon', 'system-uicons:face-happy');
      this.statusText.node.textContent = 'Congrats!';
    } else {
      this.statusBlock.node.classList.remove('text-green-500');
      this.statusText.node.textContent = `Nope, that's wrong`;
      icon.node.setAttribute('data-icon', 'system-uicons:face-sad');
    }
    this.image.node.src = `../../assets/101full.jpg`;
    new Core(this.infoBlock.node, 'div', '', gameData.artist);
    new Core(this.infoBlock.node, 'div', '', gameData.masterpiece);
    new Core(this.infoBlock.node, 'div', '', gameData.year);
    this.btnPopup.node.onclick = () => {
      this.onClick(choice);
    };
  }

  show(): void {
    this.node.style.display = 'flex';
  }

  hide(): void {
    this.node.style.display = 'none';
    this.statusBlock.node.classList.remove('text-green-500');
    this.statusIcon.node.textContent = '';
    this.statusText.node.textContent = `Nope, that's wrong`;
    this.image.node.src = ``;
    this.infoBlock.node.textContent = '';
  }
}
