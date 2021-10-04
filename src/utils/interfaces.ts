import { Icon } from './../components/settings/icon';

export interface IIconComponent {
  icon: Icon;
  iconName: string;
}

export interface ISettingIcon {
  name: string;
  status: boolean;
  order: string;
}

export interface ISettingSound {
  name: string;
  icons: Array<ISettingIcon>;
}

export interface ISettingMusic {
  music: ISettingSound;
}

export interface IInitSetting {
  initVolume: string;
  initTime: string;
  music: ISettingSound;
  sound: ISettingSound;
}

export interface IEnableSound {
  name: string;
  status: boolean;
}

export interface ISetting {
  music: {
    isMusic: boolean;
    volume: string;
  };
  sound: {
    isSound: boolean;
    volume: string;
  };
  timer: {
    isTimer: boolean;
    time: string;
  };
}

export interface IBtnSetting {
  name: string;
  content: string;
}

export interface IGameData {
  artist: string;
  masterpiece: string;
  year: string;
  imageNum: string;
  rightAnswer: boolean;
}
