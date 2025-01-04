import { bookData, IBookNode } from './data.ts';
import { renderBookNodePageHTML } from './ui.ts';
import { getRenderRouteFn, nodePathToPathname } from './router.ts';

export function generateRouteTable(bookData: IBookNode): Map<string, () => string> {
  const routeTable = new Map<string, () => string>();
  const ancestorNodes: IBookNode[] = [];

  function recurse(node: IBookNode) {
    ancestorNodes.push(node);
    const pathname = nodePathToPathname(ancestorNodes);
    routeTable.set(pathname, () => renderBookNodePageHTML(node));
    node.children.forEach(recurse);
    ancestorNodes.pop();
  }

  recurse(bookData);

  return routeTable;
}

function run() {
  const appContainer = document.querySelector<HTMLDivElement>('#app')!;

  const routeTable = generateRouteTable(bookData);
  const currentPathname = window.location.pathname;
  const renderRouteFn = getRenderRouteFn(routeTable, currentPathname);

  if (renderRouteFn === undefined) {
    appContainer.innerHTML = '<h1>404 Not Found</h1>';
    return;
  }
  
  appContainer.innerHTML = renderRouteFn();
}

run();