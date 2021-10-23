import {
  IBtnSetting,
  IGameData,
  IGameinitialData,
  IMasterpieceChoice,
} from './../utils/interfaces';
import {
  btnHome,
  btnReturnHome,
  cardBg,
  questionsPerRound,
} from './../utils/config';
import gameData from '../utils/gameData';
import Signal from '../utils/signal';
import appStorage from './storage';

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
  private questionsPerRound: number;
  public onGameOver: Signal<string> = new Signal<string>();

  constructor() {
    this.categories = btnHome;
    this.btnReturnHome = btnReturnHome;
    this.cardBgArr = cardBg;
    this.questionsPerRound = questionsPerRound;
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

  getRandomArtistArr(key: string, mandatory: string): Array<string> {
    const arr = [];
    arr.push(mandatory);
    for (let i = 0; i < 3; i++) {
      const random = Math.floor(Math.random() * 200 + 1);
      const aa = (gameData as Array<IGameinitialData>)[random][key];
      arr.push(aa);
    }
    return arr.sort(() => Math.random() - 0.5);
  }

  getRandomMasrterPieceArr(
    keyName: string,
    keyImg: string,
    mandatoryName: string,
    mandatoryImg: string,
  ): Array<IMasterpieceChoice> {
    const arr = [];
    arr.push({ name: mandatoryName, imageNum: mandatoryImg });
    for (let i = 0; i < 3; i++) {
      const random = Math.floor(Math.random() * 200 + 1);
      const item = {
        name: (gameData as Array<IGameinitialData>)[random][keyName],
        imageNum: (gameData as Array<IGameinitialData>)[random][keyImg],
      };
      arr.push(item);
    }
    return arr.sort(() => Math.random() - 0.5);
  }

  createQuestionPool(): void {
    let arr = [...gameData].map((item) => {
      const artistChoice = this.getRandomArtistArr('artist', item.artist);
      const masterpieceChoice = this.getRandomMasrterPieceArr(
        'masterpiece',
        'imageNum',
        item.masterpiece,
        item.imageNum,
      );
      return {
        ...item,
        rightArtist: false,
        rightMasterpiece: false,
        artistChoice,
        masterpieceChoice,
        isPlayedArtist: false,
        isPlayedMasterpiece: false,
      };
    });

    for (let i = 0; i < arr.length; i += this.questionPerCard) {
      this.questionPool.push(arr.slice(i, i + questionsPerRound));
    }
    appStorage.setDataBase(this.questionPool);
  }

  getQuestionPool(): Array<Array<IGameData>> {
    console.log('local storage', appStorage.getDataBase());
    const dbGameData = appStorage.getDataBase();
    if (dbGameData === null) {
      this.createQuestionPool();
    } else {
      this.questionPool = dbGameData;
    }
    return this.questionPool;
  }

  amendQuestionPool(
    question: Array<IGameData>,
    setNumber: number,
    questionNum: number,
  ): void {
    this.questionPool[setNumber] = question;
    appStorage.setDataBase(this.questionPool);
    questionNum++;
    if (questionNum < this.questionsPerRound) {
      this.onChangeQuestion.emit({ question, questionNum });
    }
  }

  checkGameOver(questionNum: number): boolean {
    return ++questionNum < this.questionsPerRound;
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

  gameOver(result: string): void {
    this.onGameOver.emit(result);
  }
}
