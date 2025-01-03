import './style.css';

import { getAncestorsStartFromRoot as getPathToNode, IBookNode } from "./data";
import { nodePathname } from './router';

export function renderBookNodePageHTML(node: IBookNode): string {
  return `
    ${renderBreadcrumbsHTML(node)}
    ${renderBookNodeHTML(node)}
  `;
}

export function renderBreadcrumbsHTML(node: IBookNode): string {
  const pathToNode = getPathToNode(node);
  const pathWithoutNode = pathToNode.slice(0, -1);

  return `
    <nav>
      <ul>
        ${pathWithoutNode.map(node => `
          <li>
            <a href="${nodePathname(node)}">${node.title}</a>
          </li>
        `).join('')}
      </ul>
    </nav>
  `;
}

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