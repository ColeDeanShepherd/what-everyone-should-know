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

export function generateRouteTable(bookData: IBookNode): Map<string, IBookNode> {
  const routeTable = new Map<string, IBookNode>();
  const ancestorNodes: IBookNode[] = [];

  function recurse(node: IBookNode) {
    ancestorNodes.push(node);
    const pathname = nodePathToPathname(ancestorNodes);
    routeTable.set(pathname, node);
    node.children.forEach(recurse);
    ancestorNodes.pop();
  }

  recurse(bookData);

  return routeTable;
}

export function findNodeByPathname(routeTable: Map<string, IBookNode>, pathname: string): IBookNode | undefined {
  return routeTable.get(pathname);
}