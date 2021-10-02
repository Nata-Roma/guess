import { InputBox } from './inputBox';
import { MusicBox } from './musicBox';
import Core from '../core';
import { settings, enableSound } from '../../utils/config';
import { IEnableSound } from '../../utils/interfaces';

export class Settings extends Core {
  private inputMusicBox: InputBox;
  private inputSoundBox: InputBox;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div');
    this.node.classList.add('settings-container');
    const initVolume = '15';

    const innerContainer = new Core(this.node, 'div', 'inner-container');

    const musicContainer = new Core(innerContainer.node);
    musicContainer.node.classList.add('inner-settings');
    const musicBox = new MusicBox(musicContainer.node, settings.music);
    this.inputMusicBox = new InputBox(musicContainer.node, initVolume);
    musicBox.onClick = (name: string) => {
      const enable = this.enableSound(name);
      this.inputMusicBox.setEnable(enable.status);
    };

    const soundContainer = new Core(innerContainer.node);
    soundContainer.node.classList.add('inner-settings');
    const soundBox = new MusicBox(soundContainer.node, settings.sound);
    this.inputSoundBox = new InputBox(soundContainer.node, initVolume);
    soundBox.onClick = (name: string) => {
      const enable = this.enableSound(name);
      this.inputSoundBox.setEnable(enable.status);
    };
  }

  show(): void {
    this.node.classList.remove('hidden');
  }

  hide(): void {
    this.node.classList.add('hidden');
  }

  enableSound(inputName: string): IEnableSound {
    const found = enableSound.findIndex((sound) =>
      sound.find((item) => item.name === inputName),
    );
    return enableSound[found].find((item) => item.name === inputName);
  }
}
