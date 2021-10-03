import { btnSettings, clearSettingName } from '../utils/settingConfig';
import { IInitSetting, IBtnSetting } from '../utils/interfaces';
import { settingState, enableSound, settings } from '../utils/settingConfig';
import { IEnableSound, ISetting } from '../utils/interfaces';
import Signal from '../utils/signal';

export class SettingModel {
  private settingState: ISetting;
  private enableSound: Array<Array<IEnableSound>>;
  private initSetting: IInitSetting;
  private homeBtnSettings: Array<IBtnSetting>;
  private clearSettingCommandName: string = clearSettingName;
  public onMusicStatusChange: Signal<boolean> = new Signal<boolean>();
  public onSoundStatusChange: Signal<boolean> = new Signal<boolean>();
  public onClearSettings: Signal<IInitSetting> = new Signal<IInitSetting>();

  constructor() {
    this.settingState = settingState;
    this.enableSound = enableSound;
    this.initSetting = settings;
    this.homeBtnSettings = btnSettings;
  }

  getInitSettings(): IInitSetting {
    return this.initSetting;
  }

  setInitSettings(): void {
    this.settingState = settingState;
    this.onClearSettings.emit(this.initSetting);
  }

  getHomeBtnSettings(): Array<IBtnSetting> {
    return this.homeBtnSettings;
  }

  getClearSettingCommandName(): string {
    return this.clearSettingCommandName;
  }

  getSettingState(): ISetting {
    return this.settingState;
  }

  setSettingState(state: ISetting): void {
    this.settingState = state;
  }

  getEnableSound(): Array<Array<IEnableSound>> {
    return this.enableSound;
  }

  changeMusicStatus(status: boolean) {
    this.onMusicStatusChange.emit(status);
  }

  changeSoundStatus(status: boolean) {
    this.onSoundStatusChange.emit(status);
  }
}
