import { IGameData } from '../../utils/interfaces';
import Core from '../core';

export class Dots extends Core {
  private dots: Array<Core>;
  constructor(parentNode: HTMLElement) {
    super(parentNode);
    this.node.classList.add('flex', 'space-x-4', 'mb-7', 'mx-auto');

    this.dots = Array.from({ length: 10 }, () => {
      const dot = new Core(this.node, 'div');
      dot.node.classList.add(
        'w-3',
        'h-3',
        'rounded-full',
        'border',
        'border-yellow-600',
      );
      return dot;
    });
    this.currentDot(0);
  }

  currentDot(current: number) {
    this.dots[current].node.classList.remove('border-yellow-600');
    this.dots[current].node.classList.add('bg-yellow-400', 'border-yellow-400');
  }

  fillDot(index: number, classColor:string, classBorder:string): void {
    this.dots[index].node.classList.remove(
      'bg-yellow-400',
      'border-yellow-400',
    );
    this.dots[index].node.classList.add(classColor, classBorder);
  }

  fillDots(
    questionArr: Array<IGameData>,
    category: string,
    currentIndex: number,
  ) {
    console.log(category);
    console.log(currentIndex);
    
    
    
    if (category === 'artist') {
      for (let i = 0; i < currentIndex; i++) {
        questionArr[i].rightArtist
          ? this.fillDot(i, 'bg-green-400', 'border-green-400')
          : this.fillDot(i, 'bg-red-500', 'border-red-500');
      }
    } else if (category === 'masterpiece') {
      for (let i = 0; i < currentIndex; i++) {
        questionArr[i].rightMasterpiece
          ? this.fillDot(i, 'bg-green-400', 'border-green-400')
          : this.fillDot(i, 'bg-red-500', 'border-red-500');
      }
    }
    this.currentDot(currentIndex);
  }
}
