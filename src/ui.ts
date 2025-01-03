import './style.css';

import { IBookNode } from "./data";
import { nodePathname } from './router';

export function renderBookNodeHTML(node: IBookNode): string {
  return `
    <div>
      <h1>${node.title}</h1>
      ${node.contents}
      ${node.children.map(renderBookNodeLinkHTML).join('')}
    </div>
  `;
}

export function renderBookNodeLinkHTML(node: IBookNode): string {
  const pathname = nodePathname(node);
  return `<a href="${pathname}">${node.title}</a>`;
}