/**
 * @desc AStarFinder class
 * @author Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright 2017-2019 Digitsensitive
 * @license {@link https://opensource.org/licenses/MIT|MIT License}
 */

import * as _ from 'lodash';

import { Node } from '../core/node';
import { Grid } from '../core/grid';
import { getManhattenDistance } from '../core/heuristic';
import { backtrace } from '../core/util';

export class AStarFinder {
  // Grid and grid relevant data
  private grid: Grid;

  // AStar-Finder Lists
  private openList: Node[];
  private closedList: Node[];
  private m_pathwayList: Node[];

  // Pathway variables
  private m_diagonalAllowed: boolean;
  private m_heuristic: number;
  private movementCostNotDiagonal: number;
  private movementCostDiagonal: number;
  private m_fieldWithLowestFCost: number[];

  public getMapArray(): Node[][] {
    return this.grid.getGrid();
  }

  constructor(grid, _diagonalAllowed?: boolean) {
    /* Get grid with grid relevant data */
    this.grid = grid;

    /* Init AStar-Finder Lists */
    this.openList = [];
    this.closedList = [];
    this.m_pathwayList = [];

    /* Init pathway variables */
    if (_diagonalAllowed != null) {
      this.m_diagonalAllowed = _diagonalAllowed;
    } else {
      this.m_diagonalAllowed = true;
    }
    this.m_heuristic = 1;
    this.movementCostNotDiagonal = 10;
    this.movementCostDiagonal = 14;
    this.m_fieldWithLowestFCost = [];
  }

  public findPath(startPosition: number[], endPosition: number[]): number[][] {
    let startX = startPosition[0];
    let startY = startPosition[1];
    let endX = endPosition[0];
    let endY = endPosition[1];

    let neighbors: Node[] = [];
    let nodePositionWithLowestFValue: number[] = [];

    let startNode = this.grid.getNodeAt(startX, startY);
    let endNode = this.grid.getNodeAt(endX, endY);
    let currentNode: Node = startNode;
    let abs = Math.abs;

    // Break if start and/or end position is/are not walkable
    if (
      !this.grid.isWalkableAt(endX, endY) ||
      !this.grid.isWalkableAt(startX, startY)
    ) {
      throw new Error(
        'Path could not be created because the start and/or end position is/are not walkable.'
      );
      return [];
    }

    // Set FGH values from start node to zero
    startNode.setGValue(0);
    startNode.setHValue(0);
    startNode.setFValue();

    // Push start node into open list
    startNode.setIsOnOpenList(true);
    this.openList.push(startNode);

    // Loop through the grid, set the FGH values of non walkable nodes to zero
    // and push them on the closed list
    for (let y = 0; y < this.grid.height; y++) {
      for (let x = 0; x < this.grid.width; x++) {
        // If not walkable
        if (!this.grid.isWalkableAt(x, y)) {
          // Set FGH values to zero
          this.grid.getNodeAt(x, y).setGValue(0);
          this.grid.getNodeAt(x, y).setHValue(0);
          this.grid.getNodeAt(x, y).setFValue();

          // Put on closed list
          this.grid.getNodeAt(x, y).setIsOnClosedList(true);
          this.closedList.push(this.grid.getNodeAt(x, y));
        }
      }
    }

    // As long the open list is not empty, continue searching a path
    while (this.openList) {
      // Get node with lowest f value
      let currentNode = _.minBy(this.openList, function(o) {
        return o.getFValue();
      });

      // Remove new field from open list and put into closed list
      currentNode.setIsOnOpenList(false);
      currentNode.setIsOnClosedList(true);
      _.remove(this.openList, currentNode);
      this.closedList.push(currentNode);

      // End of path is reached
      if (currentNode === endNode) {
        console.log('Path created. ');
        return backtrace(endNode);
      }

      // Get neighbors
      let neighbors = this.grid.getSurroundingNodes(
        currentNode.getPositionX(),
        currentNode.getPositionY(),
        this.m_diagonalAllowed
      );

      for (let i in neighbors) {
        let neightbor = neighbors[i];

        // Continue if node on closed list
        if (neightbor.getIsOnClosedList()) {
          continue;
        }

        let xPos = neightbor.getPositionX();
        let yPos = neightbor.getPositionY();

        let xEndPos = endNode.getPositionX();
        let yEndPos = endNode.getPositionY();

        // Calculate the g value of the neightbor
        let nextGValue =
          currentNode.getGValue() +
          (xPos - currentNode.getPositionX() === 0 ||
          yPos - currentNode.getPositionY() === 0
            ? this.movementCostNotDiagonal
            : this.movementCostDiagonal);

        // Is the neighbor not on open list OR
        // can it be reached with lower g value from current position
        if (
          !neightbor.getIsOnOpenList() ||
          nextGValue < neightbor.getGValue()
        ) {
          neightbor.setGValue(nextGValue);
          neightbor.setHValue(
            getManhattenDistance(abs(xPos - xEndPos), abs(yPos - yEndPos))
          );
          neightbor.setFValue();
          neightbor.setParent(currentNode);

          if (!neightbor.getIsOnOpenList()) {
            neightbor.setIsOnOpenList(true);
            this.openList.push(neightbor);
          } else {
            /* okay this is a better way, so change the parent */
            neightbor.setParent(currentNode);
          }
        }
      }
    }

    console.log('ERROR: Path could not be created. ');
    return [];
  }
}
