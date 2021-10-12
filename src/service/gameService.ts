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
    this.model.amendQuestionPool(arr, setNumber, questionNum)
  }

  checkChoiceValidity(
    cardNumber: number,
    questionNum: number,
    chosenChoice: string,
  ): void {
    const arr = [...this.model.getQuestionCard(cardNumber)];
    if (arr[questionNum].artist === chosenChoice) {
      this.model.checkChoiceValidity(chosenChoice, true);
    } else {
      this.model.checkChoiceValidity(chosenChoice, false);
    }
    if (arr[questionNum].masterpiece === chosenChoice) {
      
    }
  }
}
