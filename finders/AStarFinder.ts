/**
 * @desc AStarFinder class
 * @author Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright 2017-2019 Digitsensitive
 * @license {@link https://opensource.org/licenses/MIT|MIT License}
 */

import * as _ from 'lodash';

import { backtrace } from '../core/util';
import { heuristicFunction } from '../core/heuristic';
import { Grid } from '../core/grid';
import {
  IAStarFinderConstructor,
  IPoint
} from '../interfaces/astar-interfaces';
import { Node } from '../core/node';
import { Heuristic } from '../types/astar-types';

export class AStarFinder {
  // Grid and grid relevant data
  private grid: Grid;

  // AStar-Finder Lists
  private openList: Node[];
  private closedList: Node[];
  private m_pathwayList: Node[];

  // Pathway variables
  private diagonalAllowed: boolean;
  protected weight: number;
  protected heuristicFunction: Heuristic;
  private movementCostNotDiagonal: number;
  private movementCostDiagonal: number;
  private m_fieldWithLowestFCost: number[];
  private includeStartNode: boolean;
  private includeEndNode: boolean;

  public getMapArray(): Node[][] {
    return this.grid.getGrid();
  }

  constructor(aParams: IAStarFinderConstructor) {
    // Get grid with grid relevant data
    this.grid = new Grid({
      width: aParams.grid.width,
      height: aParams.grid.height,
      matrix: aParams.grid.matrix || undefined,
      densityOfObstacles: aParams.grid.densityOfObstacles || 0
    });

    // Init AStar-Finder Lists
    this.openList = [];
    this.closedList = [];
    this.m_pathwayList = [];

    // Init pathway variables
    this.diagonalAllowed =
      aParams.diagonalAllowed !== undefined ? aParams.diagonalAllowed : true;
    this.weight = aParams.weight || 1;
    this.movementCostNotDiagonal = 10;
    this.movementCostDiagonal = 14;
    this.m_fieldWithLowestFCost = [];
    this.includeStartNode =
      aParams.includeStartNode !== undefined ? aParams.includeStartNode : true;
    this.includeEndNode =
      aParams.includeEndNode !== undefined ? aParams.includeEndNode : true;
    this.heuristicFunction =
      aParams.heuristicFunction !== undefined
        ? aParams.heuristicFunction
        : 'Manhatten';
  }

  public findPath(startPosition: IPoint, endPosition: IPoint): number[][] {
    let startNode = this.grid.getNodeAt(startPosition);
    let endNode = this.grid.getNodeAt(endPosition);

    // Break if start and/or end position is/are not walkable
    if (
      !this.grid.isWalkableAt(endPosition) ||
      !this.grid.isWalkableAt(startPosition)
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
        if (!this.grid.isWalkableAt({ x, y })) {
          // Set FGH values to zero
          this.grid.getNodeAt({ x, y }).setGValue(0);
          this.grid.getNodeAt({ x, y }).setHValue(0);
          this.grid.getNodeAt({ x, y }).setFValue();

          // Put on closed list
          this.grid.getNodeAt({ x, y }).setIsOnClosedList(true);
          this.closedList.push(this.grid.getNodeAt({ x, y }));
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
        return backtrace(endNode, this.includeStartNode, this.includeEndNode);
      }

      // Get neighbors
      let neighbors = this.grid.getSurroundingNodes(
        currentNode.position.x,
        currentNode.position.y,
        this.diagonalAllowed
      );

      for (let i in neighbors) {
        let neightbor = neighbors[i];

        // Continue if node on closed list
        if (neightbor.getIsOnClosedList()) {
          continue;
        }

        let startPos = neightbor.position;
        let endPos = endNode.position;

        // Calculate the g value of the neightbor
        let nextGValue =
          currentNode.getGValue() +
          (neightbor.position.x !== currentNode.posX ||
          neightbor.position.y! == currentNode.posY
            ? this.weight
            : this.weight * 1.41421);

        // Is the neighbor not on open list OR
        // can it be reached with lower g value from current position
        if (
          !neightbor.getIsOnOpenList() ||
          nextGValue < neightbor.getGValue()
        ) {
          neightbor.setGValue(nextGValue);
          neightbor.setHValue(
            heuristicFunction(
              this.heuristicFunction,
              neightbor.position,
              endNode.position,
              this.weight
            )
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
