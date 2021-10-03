import { Settings } from './components/settings/settings';
import Core from './components/core';
import { HomePage } from './components/homePage';
import './style.css';

class Main extends Core {
  homePage: HomePage;
  settings: Settings = new Settings(this.node);

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div');

    this.node.classList.add('relative');
    this.closeSettings();
    this.homePage = new HomePage(this.node);
    
    const choiceBtn = [
      {
        name: 'settings',
        method: this.openSettings,
      }
    ];

    this.homePage.onClick = (btnName: string) => {
      const element = choiceBtn.find(choice => choice.name === btnName);
      element ? this.openSettings() : null
      // element.method();
      
    }

    this.settings.onClick = (btnName: string) => {
      console.log(btnName);
      this.closeSettings();
    }

  }

  openSettings(): void {
    this.settings.show();
  }

  closeSettings(): void {
    this.settings.hide();
  }
}

const root = document.body as HTMLElement;

new Main(root);
