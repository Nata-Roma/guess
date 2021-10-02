import { Button } from './button';
import Core from './core';
import image from '../assets/101full.jpg';

export const btnHome = [
  {
    name: 'settings',
    content: 'Settings',
  },
  {
    name: 'artists',
    content: 'Artists',
  },
  {
    name: 'masterpieces',
    content: 'Masterpieces',
  },
];

export class HomePage extends Core {
  private btnArr: Array<Button>;
  public onClick: (btnName: string) => void;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div');
    this.node.classList.add('home-container');
    const title = new Core(this.node, 'h1');
    title.node.classList.add(
      'mx-auto',
      'text-5xl',
      'font-bold',
      'tracking-wide',
      'text-yellow-500',
      'uppercase',
      'my-3',
    );
    title.node.textContent = 'art quiz';
    const mainContainer = new Core(this.node, 'div');
    mainContainer.node.classList.add(
      'mx-auto',
      'flex',
      'flex-col',
      'md:flex-row',
    );
    const imgContainer = new Core(mainContainer.node, 'div');
    imgContainer.node.classList.add('w-full', 'md:w-3/4', 'p-8');
    const img = document.createElement('img');
    img.src = image;
    imgContainer.node.append(img);

    const btnContainer = new Core(mainContainer.node);
    btnContainer.node.classList.add('btn-container');
    this.btnArr = btnHome.map((btn) => {
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
  }
}
