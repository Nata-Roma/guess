import {
  IBtnSetting,
  IGameData,
  IGameinitialData,
} from './../utils/interfaces';
import { btnHome, btnReturnHome, cardBg } from './../utils/config';
import gameData from '../utils/gameData';
import Signal from '../utils/signal';

export class GameModel {
  private categories: Array<IBtnSetting>;
  private btnReturnHome: IBtnSetting;
  private cardBgArr: Array<string>;
  private questionPool: Array<Array<IGameData>> = [];
  private questionPerCard: number = 10;
  public onCheckChoiceValidity: Signal<{ choice: string; status: boolean }> =
    new Signal<{ choice: string; status: boolean }>();
  public onChangeQuestion: Signal<{
    question: Array<IGameData>;
    questionNum: number;
  }> = new Signal<{ question: Array<IGameData>; questionNum: number }>();

  constructor() {
    this.categories = btnHome;
    this.btnReturnHome = btnReturnHome;
    this.cardBgArr = cardBg;
  }

  getCategoryName(name: string): string {
    const category = this.categories.find((item) => item.name === name);
    if (category) {
      return category.content;
    }
  }

  getBtnReturnHome(): IBtnSetting {
    return this.btnReturnHome;
  }

  getCardArr(): Array<string> {
    return this.cardBgArr;
  }

  getRandomArr(key: string, mandatory: string): Array<string> {
    const arr = [];
    arr.push(mandatory);
    for (let i = 0; i < 3; i++) {
      const random = Math.floor(Math.random() * 200 + 1);
      const aa = (gameData as Array<IGameinitialData>)[random][key];
      arr.push(aa);
    }
    return arr.sort(() => Math.random() - 0.5);
  }

  createQuestionPool(): void {
    let arr = [...gameData].map((item) => {
      const artistChoice = this.getRandomArr('artist', item.artist);
      const masterpieceChoice = this.getRandomArr(
        'masterpiece',
        item.masterpiece,
      );
      return {
        ...item,
        rightArtist: false,
        rightMasterpiece: false,
        artistChoice,
        masterpieceChoice,
      };
    });

    for (let i = 0; i < arr.length; i += this.questionPerCard) {
      this.questionPool.push(arr.slice(i, i + 10));
    }
  }

  getQuestionPool(): Array<Array<IGameData>> {
    if (!this.questionPool.length) {
      this.createQuestionPool();
    }
    return this.questionPool;
  }

  amendQuestionPool(
    question: Array<IGameData>,
    setNumber: number,
    questionNum: number
  ): void {
    this.questionPool[setNumber] = question;
    questionNum++;
    this.onChangeQuestion.emit({question, questionNum})
  }

  getQuestionCard(cardNumber: number): Array<IGameData> {
    if (!this.questionPool.length) {
      this.createQuestionPool();
    }
    return this.questionPool[cardNumber];
  }

  checkChoiceValidity(choice: string, status: boolean): void {
    this.onCheckChoiceValidity.emit({ choice, status });
  }
}
