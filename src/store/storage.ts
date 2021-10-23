import { IGameData } from "../utils/interfaces";

class Storage {
  private storageKey: string;
  constructor() {
    this.storageKey = 'guessArtGameQuestionPool';
  }

  setDataBase(dataPool: Array<Array<IGameData>>): void {
    window.localStorage.setItem(this.storageKey, JSON.stringify(dataPool));
  }

  getDataBase(): Array<Array<IGameData>> {
    return JSON.parse(window.localStorage.getItem(this.storageKey));
  }

  removeDataBase(): void {
    window.localStorage.removeItem(this.storageKey);
  }
}

const appStorage = new Storage();
export default appStorage;
