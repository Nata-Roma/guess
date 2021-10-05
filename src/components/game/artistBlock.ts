import { IGameData } from '../../utils/interfaces';
import Core from '../core';
import image from '../../assets/101full.jpg';

export class ArtistBlock extends Core {
  private img: Core<HTMLImageElement>;

  constructor(parentNode: HTMLElement, gameData: IGameData) {
    super(parentNode, 'div', 'artist-container');

    const imageBlock = new Core(this.node);
    imageBlock.node.classList.add('image-block');
    this.img = new Core<HTMLImageElement>(imageBlock.node, 'img');
    this.img.node.src = image;
    this.img.node.classList.add('border-2', 'border-yellow-400', 'rounded-md');

    const choiceBlock = new Core(this.node);
    choiceBlock.node.classList.add('choice-block', 'mb-auto', 'xl:mt-auto');
    const artists = new Core(choiceBlock.node);
    artists.node.classList.add('artist-block');
    gameData.artistChoice.map(choice => {
      const artist = new Core<HTMLButtonElement>(artists.node, 'button', 'artist-choice');
      artist.node.textContent = choice;

    })
  }
}
