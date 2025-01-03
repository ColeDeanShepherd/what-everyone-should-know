import './style.css';

import { IBookNode } from "./data";

export function renderBookNodeHTML(node: IBookNode): string {
  return `
    <div>
      <h1>${node.title}</h1>
      ${node.contents}
      ${node.children.map(renderBookNodeHTML).join('')}
    </div>
  `;
}