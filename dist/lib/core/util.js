"use strict";
/**
 * @desc Utils for pathfinding.
 * @author Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright 2017-2019 Digitsensitive
 * @license {@link https://opensource.org/licenses/MIT|MIT License}
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Backtrace from end node through parents and return the path.
 * @param node
 * @param includeStartingNode
 */
function backtrace(node, includeStartNode, includeEndNode) {
    // Init empty path
    let path = [];
    let currentNode;
    if (includeEndNode) {
        // Attach the end node to be the current node
        currentNode = node;
    }
    else {
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
exports.backtrace = backtrace;
