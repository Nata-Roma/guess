export default class Core<NodeType extends HTMLElement = HTMLElement> {
  public node: NodeType;

  constructor(
    parentNode: HTMLElement | null = null,
    tagName: keyof HTMLElementTagNameMap = 'div',
    className = '',
    textContent = ''
  ) {
    const element = document.createElement(tagName);
    element.className = className;
    element.innerHTML = textContent;
    parentNode && parentNode.append(element);
    this.node = element as NodeType;
  }

  destroy(): void {
    this.node.remove();
  }
}
