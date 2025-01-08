import { bookData, getOrderedNodes, IBookNode, interactiveMapHeightPx, interactiveMapWidthPx } from './data.ts';
import { activateRoute, renderBookNodePageHTML as renderBookNodePage, scaffoldUi } from './ui.ts';
import { getRouteInfo, IRouteInfo, nodePathToPageTitle, nodePathToPathname } from './router.ts';
import { div } from './lib/html-utils.ts';

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
  
  scaffoldUi();
  
  const currentPathname = window.location.pathname;
  const routeInfo = getRouteInfo(routeTable, currentPathname);

  activateRoute(routeInfo);
}

run();