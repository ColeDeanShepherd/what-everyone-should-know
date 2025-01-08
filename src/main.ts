import { bookData, getOrderedNodes, IBookNode, interactiveMapHeightPx, interactiveMapWidthPx } from './data.ts';
import { hideElement, renderBookNodePageHTML as renderBookNodePage, uiGlobals } from './ui.ts';
import { getRouteInfo, IRouteInfo, nodePathToPageTitle, nodePathToPathname } from './router.ts';
import { div, h1, text } from './ui-core.ts';

export function generateRouteTable(bookData: IBookNode): Map<string, IRouteInfo> {
  const routeTable = new Map<string, IRouteInfo>();
  const ancestorNodes: IBookNode[] = [];

  function recurse(node: IBookNode) {
    ancestorNodes.push(node);
    const pathname = nodePathToPathname(ancestorNodes);
    routeTable.set(
      pathname,
      {
        title: nodePathToPageTitle(ancestorNodes),
        renderFn: () => renderBookNodePage(node)
      }
    );
    node.children.forEach(recurse);
    ancestorNodes.pop();
  }

  recurse(bookData);

  return routeTable;
}

function run() {
  const appContainer = document.querySelector<HTMLDivElement>('#app')!;

  const routeContainer = div();
  appContainer.appendChild(routeContainer);
  
  const overlayContainer = div({ onClick: () => hideElement(uiGlobals.overlayContainer!), class: 'overlay hidden' });
  appContainer.appendChild(overlayContainer);

  uiGlobals.overlayContainer = overlayContainer;

  const routeTable = generateRouteTable(bookData);
  routeTable.set(
    '/interactive-map',
    {
      title: 'Interactive Map - What Everyone Should Know',
      renderFn: () => {
        const container = div({
          class: 'interactive-map',
          style: `width: ${interactiveMapWidthPx}px; height: ${interactiveMapHeightPx}px;`
        });

        const orderedNodes = getOrderedNodes(bookData);
        orderedNodes.forEach(node => {
          if (node.renderInInteractiveMapFn) {
            container.appendChild(node.renderInInteractiveMapFn(node));
          }
        });

        return container;
      }
    });
  const currentPathname = window.location.pathname;
  const routeInfo = getRouteInfo(routeTable, currentPathname);

  if (routeInfo === undefined) {
    document.title = 'Page Not Found - What Everyone Should Know';
    routeContainer.replaceChildren(
      h1([ text('Page Not Found') ])
    );
    return;
  }
  
  document.title = routeInfo.title;
  routeContainer.replaceChildren(routeInfo.renderFn());
}

run();