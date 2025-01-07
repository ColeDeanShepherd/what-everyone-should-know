import { bookData, getOrderedNodes, IBookNode, interactiveMapHeightPx, interactiveMapWidthPx } from './data.ts';
import { renderBookNodePageHTML as renderBookNodePage } from './ui.ts';
import { getRouteInfo, IRouteInfo, nodePathToPageTitle, nodePathToPathname } from './router.ts';
import { div } from './ui-core.ts';

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
    appContainer.innerHTML = '<h1>Page Not Found</h1>';
    return;
  }
  
  document.title = routeInfo.title;
  appContainer.replaceChildren(routeInfo.renderFn());
}

run();