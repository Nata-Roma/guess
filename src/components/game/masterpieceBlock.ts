import { Dots } from './dots';
import { IGameData } from '../../utils/interfaces';
import Core from '../core';

export class MasterPieceBlock extends Core {
  private title: Core;
  private choiceBlock: Core;
  public onChoiceClick: (choice: string) => void;
  private dots: Dots;
  private imageContainer: Core;

  constructor(
    parentNode: HTMLElement,
    gameData: IGameData,
    currentQuestion: number,
    category: string,
    gameDataRound: Array<IGameData>,
    questionsPerRound: number,
  ) {
    super(parentNode, 'div', 'artist-container');

    this.title = new Core(this.node);
    this.title.node.classList.add('game-title');
    this.imageContainer = new Core(
      this.node,
      'div',
      'masterpiece-image-container',
    );
    
    this.choiceBlock = new Core(this.node);
    this.choiceBlock.node.classList.add('choice-block');
    this.dots = new Dots(this.choiceBlock.node, questionsPerRound);

    this.changeCurrentQuestion(gameDataRound, currentQuestion, category)
  }

  changeViewOnResize(nodeBox: number): void {
    const titleBox = this.title.node.getBoundingClientRect();
    const choiceBox = this.choiceBlock.node.getBoundingClientRect();
    // console.log('nodeBox', nodeBox.width, nodeBox.height);
    // console.log('titleBox', titleBox.width, titleBox.height);
    // console.log('choiceBox', choiceBox.width, choiceBox.height);

    // console.log(this.getHeaderSize());
    
    this.imageContainer.node.style.height = `calc(100vh - ${
      nodeBox + choiceBox.height + titleBox.height+16
    }px)`;
  }

  fillDots(
    questionArr: Array<IGameData>,
    category: string,
    currentIndex: number,
  ): void {
    this.dots.fillDots(questionArr, category, currentIndex);
  }

  createChoiceImgs(gameData: IGameData): void {
    this.imageContainer.node.textContent = '';
    gameData.masterpieceChoice.map((choice) => {
      const imgBox = new Core(
        this.imageContainer.node,
        'div',
        'masterpiece-image-block',
      );
      const img = new Core<HTMLImageElement>(imgBox.node, 'img');
      img.node.src = `./public/img_full/${choice.imageNum}full.jpg`;
      img.node.alt = choice.name;
      img.node.classList.add('masterpiece-image');
      imgBox.node.onclick = () => {
        this.onChoiceClick(choice.name);
      };
    });
  }

  changeCurrentQuestion(
    gameData: Array<IGameData>,
    questionNum: number,
    category: string,
  ): void {
    console.log('gameData', gameData);
    this.title.node.textContent = `Which masterpiece is painted by ${gameData[questionNum].artist}?`;

    this.fillDots(gameData, category, questionNum);
    this.createChoiceImgs(gameData[questionNum]);
  }
}
