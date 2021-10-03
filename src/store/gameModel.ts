import { IBtnSetting } from './../utils/interfaces';
import { btnHome, btnReturnHome, cardBg } from './../utils/config';
export class GameModel {
  private categories: Array<IBtnSetting>;
  private btnReturnHome: IBtnSetting;
  private cardBgArr: Array<string>

  constructor() {
    this.categories = btnHome;
    this.btnReturnHome = btnReturnHome;
    this.cardBgArr = cardBg
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
}
