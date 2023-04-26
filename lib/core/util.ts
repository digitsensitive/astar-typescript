import { Node } from './node';

/**
 * Backtrace from end node through parents and return the path.
 * @param node
 * @param includeStartingNode
 */
export function backtrace(
  node: Node,
  includeStartNode: boolean,
  includeEndNode: boolean
): number[][] {
  // Init empty path
  const path: number[][] = [];

  // If `includeEndNode` is enabled, attach the end node to be the current node
  let currentNode: Node = includeEndNode ? node : node.getParent();

  // Loop as long the current node has a parent
  while (currentNode.getParent()) {
    path.push([currentNode.position.x, currentNode.position.y]);
    currentNode = currentNode.getParent();
  }

  // If true we will also include the starting node
  if (includeStartNode) {
    path.push([currentNode.position.x, currentNode.position.y]);
  }

  return path.reverse();
}
