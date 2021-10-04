import { CategoryIcon } from './categoryIcon';
import Core from '../core';
import { IGameData } from '../../utils/interfaces';

export class CategoryCard extends Core {
  public onClick: (dataArr: Array<IGameData>) => void;

  constructor(parentNode: HTMLElement, image: string, cardNum: number, dataArr: Array<IGameData>) {
    super(parentNode, 'div');
    this.node.classList.add('category-card');
    this.node.style.backgroundImage = `url(${image})`;
    this.node.onclick = () => this.onClick(dataArr);
    const doneNumber = dataArr.reduce((acc, data) => acc + (data.rightAnswer ? 1 : 0), 0)

    const cardNumber = new Core(this.node);
    cardNumber.node.classList.add(
      'absolute',
      'left-2',
      'top-1',
      'text-white',
      'text-3xl',
      'font-bold',
      'text-shadow',
    );
    cardNumber.node.textContent =
      cardNum + 1 < 10 ? `0${cardNum + 1}` : `${cardNum + 1}`;

    doneNumber ? new CategoryIcon(this.node): null;

    const done = new Core(this.node);
    done.node.classList.add(
      'absolute',
      'right-2',
      'top-2',
      'text-white',
      'text-xl',
      'font-bold',
      'text-shadow',
    );
    
    done.node.textContent = `${doneNumber}/${dataArr.length}`;
  }
}
