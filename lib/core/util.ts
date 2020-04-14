/**
 * @description Core Util
 * @author Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright 2017 - 2020 Digitsensitive
 * @license {@link https://opensource.org/licenses/MIT|MIT License}
 */

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
  let path: number[][] = [];

  let currentNode;
  if (includeEndNode) {
    // Attach the end node to be the current node
    currentNode = node;
  } else {
    currentNode = node.getParent();
  }

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
