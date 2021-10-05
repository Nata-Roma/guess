import { GameModel } from './../store/gameModel';
export class GameService {
  constructor(private model: GameModel) {}

  amendQuestion(
    cardNumber: number,
    questionNum: number,
    chosenChoice: string,
  ): void {
    const arr = [...this.model.getQuestionCard(cardNumber)];
    if (arr[questionNum].artist === chosenChoice) {
      arr[questionNum].rightArtist = true;
    }
    if (arr[questionNum].masterpiece === chosenChoice) {
      arr[questionNum].rightMasterpiece = true;
    }
  }
}
