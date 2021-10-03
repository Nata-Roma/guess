import { IIconComponent, ISettingSound } from './../../utils/interfaces';
import Core from '../core';
import { Icon } from './icon';

export class MusicBox extends Core {
  private musicIconArr: Array<IIconComponent> = [];
  public onClick: (name: string) => void;

  constructor(parentNode: HTMLElement, settings: ISettingSound) {
    super(parentNode, 'div');
    this.node.classList.add('flex', 'space-x-3', 'md:space-x-8', 'items-center');
    this.musicIconArr = settings.icons.map((icon) => {
      const musicIcon = new Icon(this.node, icon.name, icon.status, icon.order);
      musicIcon.onClick = (iconName: string) => this.changeIconStatus(iconName);
      return { icon: musicIcon, iconName: icon.name };
    });
    const musicTitle = new Core(this.node);
    musicTitle.node.classList.add('text-red-400', 'text-2xl', 'order-2');
    musicTitle.node.textContent = settings.name;
  }

  changeIconStatus(iconName: string) {
    const iconClicked = this.musicIconArr.findIndex(
      (icon) => icon.iconName === iconName,
    );
    this.musicIconArr.forEach((icon) => {
      icon.icon.setDisabledStatus(true);
    });
    this.musicIconArr[iconClicked].icon.setDisabledStatus(false);
    this.onClick(this.musicIconArr[iconClicked].iconName);
  }
}
