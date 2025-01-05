import './style.css';

import { getPathToNode as getPathToNode, getPrevAndNextNodes, IBookNode } from "./data";
import { nodePathname } from './router';

export function renderBookNodePageHTML(node: IBookNode): string {
  const { prevNode, nextNode } = getPrevAndNextNodes(node);

  return `
    ${renderBreadcrumbsHTML(node)}
    ${renderBookNodeHTML(node)}
    ${(prevNode !== undefined) ? `<a href="${nodePathname(prevNode)}">Previous Topic</a>` : ''}
    ${(nextNode !== undefined) ? `<a href="${nodePathname(nextNode)}">Next Topic</a>` : ''}
  `;
}

export function renderBreadcrumbsHTML(node: IBookNode): string {
  const pathToNode = getPathToNode(node);

  if (pathToNode.length === 1) {
    return '<nav></nav>';
  }

  return `
    <nav>
      ${pathToNode
        .map(n => {
          if (n !== node) {
            return `<a href="${nodePathname(n)}">${n.title}</a>`;
          } else {
            return n.title;
          }
        })
        .join(' &gt; ')}
    </nav>
  `;
}

export function renderChildLinksHTML(node: IBookNode): string {
  return `
    <ul>
      ${node.children.map(c => `<li>${renderBookNodeLinkHTML(c)}</li>`).join('')}
    </ul>`;
}

export function renderBookNodeHTML(node: IBookNode): string {
  return `
    <div>
      <h1>${node.title}</h1>
      ${node.contents}
      ${renderChildLinksHTML(node)}
    </div>
  `;
}

export function renderBookNodeLinkHTML(node: IBookNode): string {
  const pathname = nodePathname(node);
  return `<a href="${pathname}">${node.title}</a>`;
}