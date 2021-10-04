import { IBtnSetting, IGameData } from './../utils/interfaces';
import { btnHome, btnReturnHome, cardBg } from './../utils/config';
import gameDataRu from '../utils/gameData';
export class GameModel {
  private categories: Array<IBtnSetting>;
  private btnReturnHome: IBtnSetting;
  private cardBgArr: Array<string>;
  private questionPool: Array<Array<IGameData>> = [];
  private questionPerCard: number = 10;

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

  createQuestionPool(): void {
    let arr = [...gameDataRu].map((item) => ({ ...item, rightAnswer: false }));
    arr.sort(() => Math.random() - 0.5);
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
}
