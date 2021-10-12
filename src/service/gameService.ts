import { GameModel } from './../store/gameModel';
export class GameService {
  constructor(private model: GameModel) {}

  amendQuestion(
    setNumber: number,
    questionNum: number,
    chosenChoice: string,
  ): void {
    const arr = [...this.model.getQuestionCard(setNumber)];
    if (arr[questionNum].artist === chosenChoice) {
      arr[questionNum].rightArtist = true;
    }
    if (arr[questionNum].masterpiece === chosenChoice) {
      arr[questionNum].rightMasterpiece = true;
    }
    this.model.amendQuestionPool(arr, setNumber, questionNum);
  }

  checkChoiceValidity(
    setNumber: number,
    questionNum: number,
    chosenChoice: string,
  ): void {
    const arr = [...this.model.getQuestionCard(setNumber)];
    if (arr[questionNum].artist === chosenChoice) {
      this.model.checkChoiceValidity(chosenChoice, true);
    } else {
      this.model.checkChoiceValidity(chosenChoice, false);
    }
    if (arr[questionNum].masterpiece === chosenChoice) {
    }
  }

  gameOverResult(setNumber: number, category: string): void {
    const arr = [...this.model.getQuestionCard(setNumber)];
    let right = [];
    let result = '';

    if (category === 'artist') {
      right = arr.filter((item) => item.rightArtist === true);
    } else {
      right = arr.filter((item) => item.rightArtist === true);
    }
    result = `${right.length} out of ${arr.length}`;
  }
}
