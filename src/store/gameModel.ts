import { IInitSetting } from './../utils/interfaces';
import { enableSound, settings } from './../utils/config';
import { settingState } from '../utils/config';
import { IEnableSound, ISetting } from '../utils/interfaces';
import Signal from '../utils/signal';

export class GameModel {
  private settingState: ISetting;
  private enableSound: Array<Array<IEnableSound>>;
  private initSetting: IInitSetting;
  public onMusicStatusChange: Signal<boolean> = new Signal<boolean>();
  public onSoundStatusChange: Signal<boolean> = new Signal<boolean>();

  constructor() {
    this.settingState = settingState;
    this.enableSound = enableSound;
    this.initSetting = settings;
  }

  getInitSettings():IInitSetting {
    return this.initSetting;
  }

  getSettingState(): ISetting {
    return this.settingState;
  }

  setSettingState(state: ISetting): void {
    this.settingState = state;
    console.log(this.settingState);
    
  }

  getEnableSound():Array<Array<IEnableSound>> {
    return this.enableSound;
  }

  changeMusicStatus(status:boolean) {
    this.onMusicStatusChange.emit(status);
  }

  changeSoundStatus(status:boolean) {
    this.onSoundStatusChange.emit(status);
  }

}