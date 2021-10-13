import { GamePage } from './components/game/gamePage';
import { GameModel } from './store/gameModel';
import { Categories } from './components/categories/categories';
import { SettingModel } from './store/settingsModel';
import { Settings } from './components/settings/settings';
import Core from './components/core';
import { HomePage } from './components/homePage';
import './style.css';
import { questionsPerRound } from './utils/config';

class Main extends Core {
  homePage: HomePage;
  private settings: Settings;
  private settingsModel: SettingModel;
  private gameModel: GameModel;
  private categories: Categories = null;
  private gamePage: GamePage = null;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div');
    this.node.classList.add('relative');
    this.settingsModel = new SettingModel();
    this.gameModel = new GameModel();
    this.settings = new Settings(this.node, this.settingsModel);
    this.closeSettings();
    this.createHomePage();
    this.categories = null;

    this.settings.onClick = (btnName: string) => {
      console.log(btnName);
      this.closeSettings();
    };
  }

  openSettings(): void {
    this.settings.show();
  }

  closeSettings(): void {
    this.settings.hide();
  }

  createHomePage() {
    this.homePage = new HomePage(this.node);
    this.homePage.onClick = (btnName: string) => {
      if (btnName === 'artists' || btnName === 'masterpieces') {
        this.homePage.destroy();
        this.homePage = null;
        this.categories = new Categories(this.node, btnName, this.gameModel);
        this.categories.onCardClick = (
          cardNumber: number,
          category: string,
        ) => {
          this.categories.destroy();
          this.categories = null;
          this.gamePage = new GamePage(
            this.node,
            category,
            cardNumber,
            this.gameModel,
            questionsPerRound,
          );
          this.gamePage.onGameOver = () => {
            this.gamePage.destroy();
            this.gamePage = null;
            this.createHomePage();
          };
        };
      } else if (btnName === 'settings') {
        this.openSettings();
      }
    };
  }
}

const root = document.body as HTMLElement;

new Main(root);
