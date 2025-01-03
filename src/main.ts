import { bookData } from './data.ts';
import { renderBookNodePageHTML } from './ui.ts';
import { findNodeByPathname, generateRouteTable } from './router.ts';

function run() {
  const appContainer = document.querySelector<HTMLDivElement>('#app')!;

  const routeTable = generateRouteTable(bookData);
  const currentPathname = window.location.pathname;
  const currentNode = findNodeByPathname(routeTable, currentPathname);

  if (currentNode === undefined) {
    appContainer.innerHTML = '<h1>404 Not Found</h1>';
    return;
  }
  
  appContainer.innerHTML = renderBookNodePageHTML(currentNode);
}

run();