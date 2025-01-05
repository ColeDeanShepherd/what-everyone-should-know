import { bookData, IBookNode } from './data.ts';
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
    '/mind-map',
    {
      title: 'Mind Map',
      renderHTMLFn: () => `<p>Test</p>`
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