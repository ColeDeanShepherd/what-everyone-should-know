import { getAncestorsStartFromRoot, IBookNode } from "./data";

function titleToRoutePart(title: string): string {
  return title.toLowerCase().replace(/ /g, '-');
}

export function nodePathToPathname(nodePath: IBookNode[]): string {
  return '/' + nodePath
    .slice(1) // skip the root node, it's implicit
    .map(n => titleToRoutePart(n.title))
    .join('/')
}

export function nodePathname(node: IBookNode): string {
  return nodePathToPathname(getAncestorsStartFromRoot(node));
}

export function getRenderRouteFn(routeTable: Map<string, () => string>, pathname: string): (() => string) | undefined {
  return routeTable.get(pathname);
}