import { GameOverPopup } from './gameOverPopup';
import { GamePopup } from './gamePopup';
import { GameService } from './../../service/gameService';
import { ArtistBlock } from './artistBlock';
import { BtnBack } from './btnBack';
import { CurrentRoundIcon } from './currentRoundIcon';
import { GameModel } from '../../store/gameModel';
import Core from '../core';
import { IGameData } from '../../utils/interfaces';

export class GamePage extends Core {
  private currentRoundHeader: CurrentRoundIcon;
  private questionArr: Array<IGameData>;
  private gameBlock: ArtistBlock;
  private gameHeader: Core;
  private currentQuestion: number = 0;
  private gameService: GameService;
  private gamePopup: GamePopup;
  private category: string;
  private gameOverPopup: GameOverPopup;

  constructor(
    parentNode: HTMLElement,
    category: string,
    setNumber: number,
    private model: GameModel,
    questionsPerRound: number,
  ) {
    super(parentNode, 'div');
    this.node.classList.add('game-container');

    this.gameService = new GameService(this.model);
    this.category = category;

    this.gamePopup = new GamePopup(this.node);
    this.gamePopup.onClick = (choice: string) => {
      this.gameService.amendQuestion(setNumber, this.currentQuestion, choice);
      this.gamePopup.hide();
    };
    this.gamePopup.hide();

    this.gameOverPopup = new GameOverPopup(this.node);
    this.gameOverPopup.onClick = () => {
      this.gameOverPopup.hide();
    }
    this.gameOverPopup.hide();

    this.questionArr = this.model.getQuestionCard(setNumber);

    this.gameHeader = new Core(this.node);
    this.gameHeader.node.classList.add('game-header');

    const btnBack = new BtnBack(this.gameHeader.node);
    btnBack.onClick = () => {
      console.log('Back clicked');
    };

    this.currentRoundHeader = new CurrentRoundIcon(this.gameHeader.node, 0);

    this.gameBlock = new ArtistBlock(
      this.node,
      this.questionArr[this.currentQuestion],
      this.currentQuestion,
      this.category,
      this.questionArr,
      questionsPerRound,
    );
    this.gameBlock.onChoiceClick = (choice: string) => {
      this.gameService.checkChoiceValidity(
        setNumber,
        this.currentQuestion,
        choice,
      );
    };

    window.onresize = () => {
      this.changeViewOnResize();
    };

    this.changeViewOnResize();
    this.model.onCheckChoiceValidity.add((data) =>
      this.choiceVerification(data),
    );
    this.model.onChangeQuestion.add((data) => this.changeCurrentQuestion(data));
    this.model.onGameOver.add((data) => this.gameOver(data));
  }

  changeCurrentQuestion(data: {
    question: Array<IGameData>;
    questionNum: number;
  }) {
    this.currentQuestion = data.questionNum;
    this.currentRoundHeader.changeRoundNumber(data.questionNum);
    console.log('changeCurrentQuestion', data.questionNum);
    this.gameBlock.changeCurrentQuestion(
      data.question,
      data.questionNum,
      this.category,
    );
  }

  changeViewOnResize(): void {
    const nodeBox = this.gameHeader.node.getBoundingClientRect();
    this.gameBlock.changeViewOnResize(nodeBox);
  }

  choiceVerification(data: { choice: string; status: boolean }) {
    this.gamePopup.showPopupInfo(
      data.status,
      data.choice,
      this.questionArr[this.currentQuestion],
    );
  }

  gameOver(result: string): void {
    this.gameOverPopup.show(result);
  }
}
