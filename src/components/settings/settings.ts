import { GameService } from './../../service/gameService';
import { GameModel } from './../../store/gameModel';
import { ISetting } from './../../utils/interfaces';
import { TimerSettings } from './timerSetting';
import { InputBox } from './inputBox';
import { MusicBox } from './musicBox';
import Core from '../core';
import { settings, enableSound, btnSettings } from '../../utils/config';
import { IEnableSound } from '../../utils/interfaces';
import { Button } from '../button';

export class Settings extends Core {
  private btnArr: Array<Button>;
  private inputMusicBox: InputBox;
  private inputSoundBox: InputBox;
  public onClick: (btnName: string) => void;
  private model: GameModel;
  private service: GameService;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div');
    this.node.classList.add('settings-container');
    this.model = new GameModel();
    this.service = new GameService(this.model);

    const initVolume = settings.initVolume;

    const innerContainer = new Core(this.node, 'div', 'inner-container');

    const soundBlock = new Core(innerContainer.node, 'div', 'sound-container');

    const musicContainer = new Core(soundBlock.node);
    musicContainer.node.classList.add('sound-settings');
    const musicBox = new MusicBox(musicContainer.node, settings.music);
    this.inputMusicBox = new InputBox(musicContainer.node, initVolume);
    musicBox.onClick = (name: string) => {
      this.service.changeMusicStatus(name);
    };

    const soundContainer = new Core(soundBlock.node);
    soundContainer.node.classList.add('sound-settings');
    const soundBox = new MusicBox(soundContainer.node, settings.sound);
    this.inputSoundBox = new InputBox(soundContainer.node, initVolume);
    soundBox.onClick = (name: string) => {
      this.service.changeSoundStatus(name);
    };

    const timer = new TimerSettings(innerContainer.node);
    timer.onClick = (status: boolean) => {
      this.service.changeTimerStatus(status)
    }
    timer.onInput = (time: string) => {
      this.service.changeTimerTime(time);
    }

    const btnContainer = new Core(innerContainer.node);
    btnContainer.node.classList.add('btn-settings-container');

    this.btnArr = btnSettings.map((btn) => {
      const btnItem = new Button(
        btnContainer.node,
        'button',
        btn.content,
        btn.name,
      );
      btnItem.onClick = (btnName: string) => {
        this.onClick(btnName);
      };
      return btnItem;
    });
    this.model.onMusicStatusChange.add((status: boolean) => this.changeMusicStatus(status));
    this.model.onSoundStatusChange.add((status: boolean) => this.changeSoundStatus(status));
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

  changeMusicStatus(status:boolean) {
    this.inputMusicBox.setEnable(status);
  }

  changeSoundStatus(status:boolean) {
    this.inputSoundBox.setEnable(status);
  }

}
