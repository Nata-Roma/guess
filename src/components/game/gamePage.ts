import { ArtistBlock } from './artistBlock';
import { BtnBack } from './btnBack';
import { CurrentRoundIcon } from './currentRoundIcon';
import { GameModel } from '../../store/gameModel';
import Core from '../core';
import { IGameData } from '../../utils/interfaces';

export class GamePage extends Core {
  private currentRoundHeader: CurrentRoundIcon;
  questionArr: Array<IGameData>;

  constructor(
    parentNode: HTMLElement,
    category: string,
    cardNumber: number,
    private model: GameModel,
  ) {
    super(parentNode, 'div');
    this.node.classList.add('game-container');
    
    this.questionArr = this.model.getQuestionCard(cardNumber);


    const gameHeader = new Core(this.node);
    gameHeader.node.classList.add('game-header');

    const btnBack = new BtnBack(gameHeader.node);
    btnBack.onClick = () => {
      console.log('Back clicked');
    };

    this.currentRoundHeader = new CurrentRoundIcon(gameHeader.node, 0);
    console.log('arr', this.questionArr[0]);
    
    new ArtistBlock(this.node, this.questionArr[0])
  }

  showCurrentRound(round: number) {

  }
}
