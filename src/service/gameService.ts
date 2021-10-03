import { SettingModel } from '../store/settingModel';
import { IEnableSound } from '../utils/interfaces';

export class GameService {
  constructor(private model: SettingModel) {}

  enableSound(inputName: string): IEnableSound {
    const enableSound = this.model.getEnableSound();
    const found = enableSound.findIndex((sound) =>
      sound.find((item) => item.name === inputName),
    );
    return enableSound[found].find((item) => item.name === inputName);
  }

  changeMusicStatus(name: string): void {
    const enable = this.enableSound(name);
    let state = this.model.getSettingState();
    state = { ...state, music: { ...state.music, isMusic: !enable.status } };
    this.model.setSettingState(state);
    this.model.changeMusicStatus(enable.status);
  }

  changeSoundStatus(name: string): void {
    const enable = this.enableSound(name);
    let state = this.model.getSettingState();
    state = { ...state, sound: { ...state.sound, isSound: !enable.status } };
    this.model.setSettingState(state);
    this.model.changeSoundStatus(enable.status);
  }

  changeTimerStatus(status: boolean): void {
    let state = this.model.getSettingState();
    state = { ...state, timer: { ...state.timer, isTimer: status } };
    if (!status) {
      state = {
        ...state,
        timer: { ...state.timer, time: this.model.getInitSettings().initTime },
      };
    }
    this.model.setSettingState(state);
  }

  changeTimerTime(time: string): void {
    let state = this.model.getSettingState();
    state = { ...state, timer: { ...state.timer, time: time } };
    this.model.setSettingState(state);
  }

  changeMusicVolume(volume: string): void {
    let state = this.model.getSettingState();
    state = { ...state, music: { ...state.music, volume: volume } };
    this.model.setSettingState(state);
  }
  changeSoundVolume(volume: string): void {
    let state = this.model.getSettingState();
    state = { ...state, sound: { ...state.sound, volume: volume } };
    this.model.setSettingState(state);
  }

  clearSettings(name: string): void {
    if (name === this.model.getClearSettingCommandName()) {
      this.model.setInitSettings();
    }
  }
}
