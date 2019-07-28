"use strict";
/**
 * @desc AStarFinder class
 * @author Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright 2017-2019 Digitsensitive
 * @license {@link https://opensource.org/licenses/MIT|MIT License}
 */
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const util_1 = require("../core/util");
const heuristic_1 = require("../core/heuristic");
const grid_1 = require("../core/grid");
class AStarFinder {
    constructor(aParams) {
        // Create grid
        this.grid = new grid_1.Grid({
            width: aParams.grid.width,
            height: aParams.grid.height,
            matrix: aParams.grid.matrix || undefined,
            densityOfObstacles: aParams.grid.densityOfObstacles || 0
        });
        // Init lists
        this.closedList = [];
        this.openList = [];
        // Init pathway variables
        this.diagonalAllowed =
            aParams.diagonalAllowed !== undefined ? aParams.diagonalAllowed : true;
        this.heuristicFunction =
            aParams.heuristicFunction !== undefined
                ? aParams.heuristicFunction
                : 'Manhatten';
        this.includeStartNode =
            aParams.includeStartNode !== undefined ? aParams.includeStartNode : true;
        this.includeEndNode =
            aParams.includeEndNode !== undefined ? aParams.includeEndNode : true;
        this.weight = aParams.weight || 1;
    }
    getMapArray() {
        return this.grid.getGrid();
    }
    findPath(startPosition, endPosition) {
        let startNode = this.grid.getNodeAt(startPosition);
        let endNode = this.grid.getNodeAt(endPosition);
        // Break if start and/or end position is/are not walkable
        if (!this.grid.isWalkableAt(endPosition) ||
            !this.grid.isWalkableAt(startPosition)) {
            throw new Error('Path could not be created because the start and/or end position is/are not walkable.');
            return [];
        }
        // Push start node into open list
        startNode.setIsOnOpenList(true);
        this.openList.push(startNode);
        // Loop through the grid
        // Set the FGH values of non walkable nodes to zero and push them on the closed list
        // Set the H value for walkable nodes
        for (let y = 0; y < this.grid.height; y++) {
            for (let x = 0; x < this.grid.width; x++) {
                let node = this.grid.getNodeAt({ x, y });
                if (!this.grid.isWalkableAt({ x, y })) {
                    // OK, this node is not walkable
                    // Set FGH values to zero
                    node.setFGHValuesToZero();
                    // Put on closed list
                    node.setIsOnClosedList(true);
                    this.closedList.push(node);
                }
                else {
                    // OK, this node is walkable
                    // Calculate the H value for it
                    node.setHValue(heuristic_1.heuristicFunction(this.heuristicFunction, node.position, endNode.position, this.weight));
                }
            }
        }
        // As long the open list is not empty, continue searching a path
        while (this.openList) {
            // Get node with lowest f value
            let currentNode = _.minBy(this.openList, function (o) {
                return o.getFValue();
            });
            // Move current node from open list to closed list
            currentNode.setIsOnOpenList(false);
            _.remove(this.openList, currentNode);
            currentNode.setIsOnClosedList(true);
            this.closedList.push(currentNode);
            // End of path is reached
            if (currentNode === endNode) {
                return util_1.backtrace(endNode, this.includeStartNode, this.includeEndNode);
            }
            // Get neighbors
            let neighbors = this.grid.getSurroundingNodes(currentNode.position, this.diagonalAllowed);
            // Loop through all the neighbors
            for (let i in neighbors) {
                let neightbor = neighbors[i];
                // Continue if node on closed list
                if (neightbor.getIsOnClosedList()) {
                    continue;
                }
                // Calculate the g value of the neightbor
                let nextGValue = currentNode.getGValue() +
                    (neightbor.position.x !== currentNode.position.x ||
                        neightbor.position.y == currentNode.position.y
                        ? this.weight
                        : this.weight * 1.41421);
                // Is the neighbor not on open list OR
                // can it be reached with lower g value from current position
                if (!neightbor.getIsOnOpenList() ||
                    nextGValue < neightbor.getGValue()) {
                    neightbor.setGValue(nextGValue);
                    neightbor.setParent(currentNode);
                    if (!neightbor.getIsOnOpenList()) {
                        neightbor.setIsOnOpenList(true);
                        this.openList.push(neightbor);
                    }
                    else {
                        // okay this is a better way, so change the parent
                        neightbor.setParent(currentNode);
                    }
                }
            }
        }
        throw new Error('Path could not be created. ');
        return [];
    }
}
exports.AStarFinder = AStarFinder;
