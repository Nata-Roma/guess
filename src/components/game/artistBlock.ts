import { Dots } from './dots';
import { IGameData } from '../../utils/interfaces';
import Core from '../core';

export class ArtistBlock extends Core {
  private img: Core<HTMLImageElement>;
  private title: Core;
  private choiceBlock: Core;
  private imageBlock: Core;
  public onChoiceClick: (choice: string) => void;
  private dots: Dots;
  private choiceBtns: Core;

  constructor(
    parentNode: HTMLElement,
    gameData: IGameData,
    currentQuestion: number,
    category: string,
    gameDataRound: Array<IGameData>,
    questionsPerRound: number
  ) {
    super(parentNode, 'div', 'artist-container');

    this.title = new Core(this.node);
    this.title.node.classList.add('game-title');
    this.title.node.textContent = 'Who is an author?';

    this.imageBlock = new Core(this.node);
    this.imageBlock.node.classList.add('artist-image-block');
    
    this.img = new Core<HTMLImageElement>(this.imageBlock.node, 'img');
    this.img.node.src = `./public/img_full/${gameDataRound[currentQuestion].imageNum}full.jpg`;
    this.img.node.classList.add('artist-image');

    this.choiceBlock = new Core(this.node);
    this.choiceBlock.node.classList.add('choice-block');
    this.dots = new Dots(this.choiceBlock.node, questionsPerRound);

    this.choiceBtns = new Core(this.choiceBlock.node);
    this.choiceBtns.node.classList.add('artist-block');

    this.changeCurrentQuestion(gameDataRound, currentQuestion, category)
  }

  changeViewOnResize(nodeBox: number): void {
    const titleBox = this.title.node.getBoundingClientRect();
    const choiceBox = this.choiceBlock.node.getBoundingClientRect();
    // console.log('nodeBox', nodeBox.width, nodeBox.height);
    // console.log('titleBox', titleBox.width, titleBox.height);
    // console.log('choiceBox', choiceBox.width, choiceBox.height);

    this.imageBlock.node.style.height = `calc(100vh - ${
      nodeBox + choiceBox.height + titleBox.height + 16
    }px)`;
  }

  fillDots(
    questionArr: Array<IGameData>,
    category: string,
    currentIndex: number,
  ): void {
    this.dots.fillDots(questionArr, category, currentIndex);
  }

  createChoiceBtns(gameData: IGameData): void {
    this.choiceBtns.node.textContent = '';
    gameData.artistChoice.map((choice) => {
      const choiceBtn = new Core<HTMLButtonElement>(
        this.choiceBtns.node,
        'button',
        'artist-choice',
      );
      choiceBtn.node.textContent = choice;
      choiceBtn.node.onclick = () => {
        this.onChoiceClick(choice);
      };
    });
  }

  changeCurrentQuestion(
    gameData: Array<IGameData>,
    questionNum: number,
    category: string,
  ): void {
    gameData[questionNum].isPlayedArtist = true;
    this.img.node.src = `./public/img_full/${gameData[questionNum].imageNum}full.jpg`;
    this.fillDots(gameData, category, questionNum);
    this.createChoiceBtns(gameData[questionNum]);
  }
}
