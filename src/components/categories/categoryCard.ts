import { CategoryIcon } from './categoryIcon';
import Core from '../core';
import { IGameData } from '../../utils/interfaces';

export class CategoryCard extends Core {
  public onClick: (dataArr: Array<IGameData>) => void;
  private done: Core;

  constructor(
    parentNode: HTMLElement,
    image: string,
    private cardNum: number,
    private dataArr: Array<IGameData>,
  ) {
    super(parentNode, 'div');
    this.node.classList.add('category-card');
    this.node.style.backgroundImage = `url(${image})`;
    this.node.onclick = () => this.onClick(dataArr);
    

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
      this.cardNum + 1 < 10 ? `0${this.cardNum + 1}` : `${this.cardNum + 1}`;

    this.done = new Core(this.node);
    this.done.node.classList.add(
      'absolute',
      'right-2',
      'top-2',
      'text-white',
      'text-xl',
      'font-bold',
      'text-shadow',
    );

    this.checkAnswersDone();
  }

  getCardNumber(): number {
    return this.cardNum;
  }

  checkAnswersDone() {
    const doneNumber = this.dataArr.reduce(
      (acc, data) => acc + (data.rightAnswer ? 1 : 0),
      0,
    );
    doneNumber ? new CategoryIcon(this.node) : null;
    this.done.node.textContent = `${doneNumber}/${this.dataArr.length}`;
  }

  amendCardData(dataArr: Array<IGameData>): void {
    this.dataArr = dataArr;
    this.checkAnswersDone();
  }
}
