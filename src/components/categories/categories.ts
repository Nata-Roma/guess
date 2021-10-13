import { CategoryCard } from './categoryCard';
import { GameModel } from '../../store/gameModel';
import { Button } from '../button';
import Core from '../core';
import { IGameData } from '../../utils/interfaces';

export class Categories extends Core {
  private cards: Array<CategoryCard> = [];
  public onCardClick: (cardNumber: number, category: string) => void;

  constructor(
    parentNode: HTMLElement,
    category: string,
    private model: GameModel,
  ) {
    super(parentNode, 'div');
    this.node.classList.add('category-container');
    const questionArr = this.model.getQuestionPool();

    const titleContainer = new Core(this.node);
    titleContainer.node.classList.add(
      'flex',
      'items-center',
      'justify-between',
      'p-4',
      'md:px-5',
      'mb-2',
    );
    const title = new Core(titleContainer.node);
    const categoryName = model.getCategoryName(category);
    title.node.classList.add(
      'my-2',
      'text-2xl',
      'md:text-3xl',
      'font-bold',
      'tracking-wide',
      'text-yellow-500',
    );
    title.node.textContent = categoryName;

    const btnReturn = new Button(
      titleContainer.node,
      'button-game',
      this.model.getBtnReturnHome().content,
      this.model.getBtnReturnHome().name,
    );
    btnReturn.onClick = () => {
      console.log('btnReturn click');
    };

    const cardContainer = new Core(this.node);
    cardContainer.node.classList.add(
      'flex',
      'px-4',
      'md:p-4',
      'bg-green-100',
      'justify-start',
      'items-center',
      'flex-wrap',
    );

    this.cards = this.randomSortCardBg().map((image, i) => {
      const card = new CategoryCard(
        cardContainer.node,
        image,
        i,
        questionArr[i],
      );
      card.onClick = () => {
        this.onCardClick(i, category.slice(0, category.length-1));
      };
      return card;
    });
  }

  randomSortCardBg() {
    return [...this.model.getCardArr()].sort((a, b) => Math.random() - 0.5);
  }
}
