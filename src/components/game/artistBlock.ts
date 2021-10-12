import { Dots } from './dots';
import { IGameData } from '../../utils/interfaces';
import Core from '../core';
import image from '../../assets/101full.jpg';

export class ArtistBlock extends Core {
  private img: Core<HTMLImageElement>;
  private title: Core;
  private choiceBlock: Core;
  private imageBlock: Core;
  public onChoiceClick: (choice: string) => void;
  private dots: Dots;

  constructor(
    parentNode: HTMLElement,
    gameData: IGameData,
    currentQuestion: number,
    category: string,
    gameDataRound: Array<IGameData>,
  ) {
    super(parentNode, 'div', 'artist-container');

    this.title = new Core(this.node);
    this.title.node.classList.add('game-title');
    this.title.node.textContent = 'Who is an author?';

    this.imageBlock = new Core(this.node);
    this.imageBlock.node.classList.add('image-block');
    this.img = new Core<HTMLImageElement>(this.imageBlock.node, 'img');
    this.img.node.src = image;
    this.img.node.classList.add('artist-image');

    this.choiceBlock = new Core(this.node);
    this.choiceBlock.node.classList.add('choice-block');
    this.dots = new Dots(this.choiceBlock.node);

    const artists = new Core(this.choiceBlock.node);
    artists.node.classList.add('artist-block');
    gameData.artistChoice.map((choice) => {
      const artist = new Core<HTMLButtonElement>(
        artists.node,
        'button',
        'artist-choice',
      );
      artist.node.textContent = choice;
      artist.node.onclick = () => {
        this.onChoiceClick(choice);
      };
    });

    this.fillDots(gameDataRound, category, currentQuestion);
  }

  changeViewOnResize(nodeBox: DOMRect): void {
    const titleBox = this.title.node.getBoundingClientRect();
    const choiceBox = this.choiceBlock.node.getBoundingClientRect();
    // console.log('nodeBox', nodeBox.width, nodeBox.height);
    // console.log('titleBox', titleBox.width, titleBox.height);
    // console.log('choiceBox', choiceBox.width, choiceBox.height);

    this.imageBlock.node.style.height = `calc(100vh - ${
      nodeBox.height + choiceBox.height + titleBox.height
    }px)`;
  }

  fillDots(
    questionArr: Array<IGameData>,
    category: string,
    currentIndex: number,
  ): void {
    this.dots.fillDots(questionArr, category, currentIndex);
  }

  changeCurrentQuestion(question: Array<IGameData>, questionNum: number, category: string) {
    this.fillDots(question, category, questionNum)
  }
}
