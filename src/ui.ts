import './style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { getPathToNode as getPathToNode, getPrevAndNextNodes, IBookNode } from "./data";
import { IRouteInfo, nodePathname } from './router';
import { div, elemsFromRawHtml, h1, text } from './lib/html-utils';

export interface IUIGlobals {
  routeContainer: HTMLElement | undefined;
  overlayContainer: HTMLElement | undefined;
}

export const uiGlobals: IUIGlobals = {
  routeContainer: undefined,
  overlayContainer: undefined
};

export function scaffoldUi() {
  const appContainer = div({ id: 'app' });
  document.body.appendChild(appContainer);

  const routeContainer = div();
  appContainer.appendChild(routeContainer);
  uiGlobals.routeContainer = routeContainer;
  
  const overlayContainer = div({
    onClick: e => {
      if ((e.target as HTMLElement) === overlayContainer) {
        closeOverlay();
      }
    },
    class: 'overlay hidden'
  });
  appContainer.appendChild(overlayContainer);
  uiGlobals.overlayContainer = overlayContainer;
}

export function activateRoute(routeInfo: IRouteInfo | undefined) {
  if (routeInfo === undefined) {
    document.title = 'Page Not Found - What Everyone Should Know';
    uiGlobals.routeContainer!.replaceChildren(
      h1([ text('Page Not Found') ])
    );
    return;
  }
  
  document.title = routeInfo.title;
  uiGlobals.routeContainer!.replaceChildren(routeInfo.renderFn());
}

export function unhideElement(element: HTMLElement): void {
  element.classList.remove('hidden');
}

export function hideElement(element: HTMLElement): void {
  element.classList.add('hidden');
}

export function openOverlay(element: HTMLElement): void {
  uiGlobals.overlayContainer!.replaceChildren(element);
  unhideElement(uiGlobals.overlayContainer!);
}

export function closeOverlay(): void {
  hideElement(uiGlobals.overlayContainer!);
}

export function renderBookNodePageHTML(node: IBookNode): Node {
  const { prevNode, nextNode } = getPrevAndNextNodes(node);

  return div(elemsFromRawHtml(`
    ${renderBreadcrumbsHTML(node)}
    ${renderBookNodeHTML(node)}
    <div class="prev-next-links">
      <div>${(prevNode !== undefined) ? `<a href="${nodePathname(prevNode)}"><i class="bi bi-chevron-left"></i> Previous (${prevNode.title})</a>` : ''}</div>
      <div>${(nextNode !== undefined) ? `<a href="${nodePathname(nextNode)}">Next (${nextNode.title}) <i class="bi bi-chevron-right"></i></a>` : ''}</div>
    </div>
  `));
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
    <ul class="child-links">
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