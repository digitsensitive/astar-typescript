/**
 * @desc Utils for pathfinding.
 * @author Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright 2017-2019 Digitsensitive
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
  includeStartNode?: boolean,
  includeEndNode?: boolean
): number[][] {
  // Init boolean to include starting and ending node
  let iStartNode = includeStartNode || true;
  let iEndNode = includeEndNode || true;

  // Init empty path
  let path: number[][] = [];

  let currentNode;
  if (iEndNode) {
    // Attach the end node to be the current node
    currentNode = node;
  } else {
    currentNode = node.getParent();
  }

  // Loop as long the current node has a parent
  while (currentNode.getParent()) {
    path.push([currentNode.posX, currentNode.posY]);
    currentNode = currentNode.getParent();
  }

  // If true we will also include the starting node
  if (iStartNode) {
    path.push([currentNode.posX, currentNode.posY]);
  }

  return path.reverse();
}
