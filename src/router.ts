import { getPathToNode, IBookNode } from "./data";

export interface IRouteInfo {
  title: string;
  renderFn: () => Node;
}

function titleToRoutePart(title: string): string {
  return encodeURIComponent(title.toLowerCase().replace(/ /g, '-'));
}

export function nodePathToPathname(nodePath: IBookNode[]): string {
  return '/' + nodePath
    .slice(1) // skip the root node, it's implicit
    .map(n => titleToRoutePart(n.title))
    .join('/')
}

export function nodePathname(node: IBookNode): string {
  return nodePathToPathname(getPathToNode(node));
}

export function nodePathToPageTitle(nodePath: IBookNode[]): string {
  return nodePath.slice().reverse().map(n => n.title).join(' - ');
}

export function getRouteInfo(
  routeTable: Map<string, IRouteInfo>,
  pathname: string
): IRouteInfo | undefined {
  return routeTable.get(pathname);
}