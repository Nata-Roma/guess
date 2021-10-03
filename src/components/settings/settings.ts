import { IInitSetting } from './../../utils/interfaces';
import { GameService } from './../../service/gameService';
import { GameModel } from './../../store/gameModel';
import { TimerSettings } from './timerSetting';
import { InputBox } from './inputBox';
import { MusicBox } from './musicBox';
import Core from '../core';
import { Button } from '../button';

export class Settings extends Core {
  private btnArr: Array<Button>;
  private inputMusicBox: InputBox;
  private inputSoundBox: InputBox;
  public onClick: (btnName: string) => void;
  private model: GameModel;
  private service: GameService;
  private timer: TimerSettings;
  private musicBox: MusicBox;
  private soundBox: MusicBox;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div');
    this.node.classList.add('settings-container');
    this.model = new GameModel();
    this.service = new GameService(this.model);
    const initSettings = this.model.getInitSettings();
    const btnSettings = this.model.getHomeBtnSettings();

    const innerContainer = new Core(this.node, 'div', 'inner-container');

    const soundBlock = new Core(innerContainer.node, 'div', 'sound-container');

    const musicContainer = new Core(soundBlock.node);
    musicContainer.node.classList.add('sound-settings');
    this.musicBox = new MusicBox(musicContainer.node, initSettings.music);
    this.musicBox.onClick = (name: string) => {
      this.service.changeMusicStatus(name);
    };

    this.inputMusicBox = new InputBox(
      musicContainer.node,
      initSettings.initVolume,
    );
    this.inputMusicBox.onInput = (volume: string) => {
      this.service.changeMusicVolume(volume);
    };

    const soundContainer = new Core(soundBlock.node);
    soundContainer.node.classList.add('sound-settings');

    this.soundBox = new MusicBox(soundContainer.node, initSettings.sound);
    this.soundBox.onClick = (name: string) => {
      this.service.changeSoundStatus(name);
    };

    this.inputSoundBox = new InputBox(
      soundContainer.node,
      initSettings.initVolume,
    );
    this.inputSoundBox.onInput = (volume: string) => {
      this.service.changeSoundVolume(volume);
    };

    this.timer = new TimerSettings(innerContainer.node);
    this.timer.onClick = (status: boolean) => {
      this.service.changeTimerStatus(status);
    };
    this.timer.onInput = (time: string) => {
      this.service.changeTimerTime(time);
    };

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
        this.service.clearSettings(btnName);
        this.onClick(btnName);
      };
      return btnItem;
    });
    this.model.onMusicStatusChange.add((status: boolean) =>
      this.changeMusicStatus(status),
    );
    this.model.onSoundStatusChange.add((status: boolean) =>
      this.changeSoundStatus(status),
    );
    this.model.onClearSettings.add((state: IInitSetting) =>
      this.clearSettings(state),
    );
  }

  show(): void {
    this.node.classList.remove('hidden');
  }

  hide(): void {
    this.node.classList.add('hidden');
  }

  changeMusicStatus(status: boolean): void {
    this.inputMusicBox.setEnable(status);
  }

  changeSoundStatus(status: boolean): void {
    this.inputSoundBox.setEnable(status);
  }

  clearSettings(settings: IInitSetting): void {
    this.timer.clearTimer();
    this.musicBox.changeIconStatus(settings.music.icons[0].name);
    this.soundBox.changeIconStatus(settings.sound.icons[0].name);
  }
}
