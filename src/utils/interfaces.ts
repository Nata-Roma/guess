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

export interface IEnableSound {
  name: string;
  status: boolean;
}
