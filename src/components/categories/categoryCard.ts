import Core from '../core';
// import image from '../../assets/cardBg/bg_card_1.png';

export class CategoryCard extends Core {
  constructor(parentNode: HTMLElement, image: string, cardNumber: number) {
    super(parentNode, 'div');
    this.node.classList.add('category-card');
    this.node.style.backgroundImage = `url(${image})`;
  }
}
