import { bookData, getOrderedNodes, IBookNode, interactiveMapHeightPx, interactiveMapWidthPx } from './data.ts';
import { renderBookNodePageHTML } from './ui.ts';
import { getRouteInfo, IRouteInfo, nodePathToPageTitle, nodePathToPathname } from './router.ts';

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
        renderHTMLFn: () => renderBookNodePageHTML(node)
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
      renderHTMLFn: () => {
        const container = document.createElement('div');
        container.className = 'interactive-map';
        container.style.width = `${interactiveMapWidthPx}px`;
        container.style.height = `${interactiveMapHeightPx}px`;

        getOrderedNodes(bookData).forEach(node => {
          if (node.renderInInteractiveMapFn) {
            container.innerHTML += node.renderInInteractiveMapFn(node);
          }
        });

        return container.outerHTML;
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
  appContainer.innerHTML = routeInfo.renderHTMLFn();
}

run();