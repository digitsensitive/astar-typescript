/**
 * @desc AStarFinder class
 * @author Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright 2017-2019 Digitsensitive
 * @license {@link https://opensource.org/licenses/MIT|MIT License}
 */

import * as _ from 'lodash';

import { Node } from '../core/Node';
import { Grid } from '../core/Grid';
import { getManhattenDistance } from '../core/Heuristic';
import { backtrace } from '../core/Util';

export class AStarFinder {
  /* Grid and grid relevant data */
  private m_grid: Grid;
  private m_mapWidth: number;
  private m_mapHeight: number;
  private m_totalFields: number;

  /* AStar-Finder Lists */
  private m_openList: Node[];
  private m_closedList: Node[];
  private m_pathwayList: Node[];

  /* Pathway variables */
  private m_diagonalAllowed: boolean;
  private m_heuristic: number;
  private m_movementCostNotDiagonal: number;
  private m_movementCostDiagonal: number;
  private m_fieldWithLowestFCost: number[];

  public getMapArray(): Node[][] {
    return this.m_grid.getGrid();
  }

  constructor(_grid, _diagonalAllowed?: boolean) {
    /* Get grid with grid relevant data */
    this.m_grid = _grid;
    this.m_mapWidth = _grid.getGridWidth();
    this.m_mapHeight = _grid.getGridHeight();
    this.m_totalFields = this.m_mapWidth * this.m_mapHeight;

    /* Init AStar-Finder Lists */
    this.m_openList = [];
    this.m_closedList = [];
    this.m_pathwayList = [];

    /* Init pathway variables */
    if (_diagonalAllowed != null) {
      this.m_diagonalAllowed = _diagonalAllowed;
    } else {
      this.m_diagonalAllowed = true;
    }
    this.m_heuristic = 1;
    this.m_movementCostNotDiagonal = 10;
    this.m_movementCostDiagonal = 14;
    this.m_fieldWithLowestFCost = [];
  }

  public findPath(startPosition: number[], endPosition: number[]): number[][] {
    let _startX = startPosition[0];
    let _startY = startPosition[1];
    let _endX = endPosition[0];
    let _endY = endPosition[1];

    let neighbors: Node[] = [];
    let nodePositionWithLowestFValue: number[] = [];

    let startNode = this.m_grid.getNodeAt(_startX, _startY);
    let endNode = this.m_grid.getNodeAt(_endX, _endY);
    let currentNode: Node = startNode;
    let abs = Math.abs;

    /* START NODE */
    /* Set FGH-Value to zero */
    startNode.setGValue(0);
    startNode.setHValue(0);
    startNode.setFValue();

    /* Push start node into open list */
    startNode.setIsOnOpenList(true);
    this.m_openList.push(startNode);

    /* Break if start and/or goal position is/are not walkable */
    if (
      !this.m_grid.isWalkableAt(_endX, _endY) ||
      !this.m_grid.isWalkableAt(_startX, _startY)
    ) {
      console.log(
        'ERROR: Path could not be created. Start and/or Goal position is not walkable. '
      );
      return [];
    }

    for (let y: number = 0; y < this.m_mapHeight; y++) {
      for (let x: number = 0; x < this.m_mapWidth; x++) {
        /* If NOT walkable */
        if (!this.m_grid.isWalkableAt(x, y)) {
          /* Set FGH-Values to zero */
          this.m_grid.getNodeAt(x, y).setGValue(0);
          this.m_grid.getNodeAt(x, y).setHValue(0);
          this.m_grid.getNodeAt(x, y).setFValue();

          /* Put on closed list */
          this.m_grid.getNodeAt(x, y).setIsOnClosedList(true);
          this.m_closedList.push(this.m_grid.getNodeAt(x, y));
        }
      }
    }

    while (!_.isEmpty(this.m_openList)) {
      /* get node with lowest f value */
      nodePositionWithLowestFValue = [
        _.minBy(this.m_openList, function(o) {
          return o.getFValue();
        }).getPositionX(),
        _.minBy(this.m_openList, function(o) {
          return o.getFValue();
        }).getPositionY()
      ];
      currentNode = this.m_grid.getNodeAt(
        nodePositionWithLowestFValue[0],
        nodePositionWithLowestFValue[1]
      );

      /* Remove new field from open list and put into closed list */
      currentNode.setIsOnOpenList(false);
      currentNode.setIsOnClosedList(true);

      _.remove(this.m_openList, currentNode);
      this.m_closedList.push(currentNode);

      /* end of path is reached */
      if (currentNode === endNode) {
        console.log('Path created. ');
        return backtrace(endNode);
      }

      /* get neighbors */
      neighbors = this.m_grid.getSurroundingNodes(
        currentNode.getPositionX(),
        currentNode.getPositionY(),
        this.m_diagonalAllowed
      );

      for (let i in neighbors) {
        let neightbor = neighbors[i];

        /* continue if node on closed list */
        if (neightbor.getIsOnClosedList()) {
          continue;
        }

        let xPos = neightbor.getPositionX();
        let yPos = neightbor.getPositionY();

        let xEndPos = endNode.getPositionX();
        let yEndPos = endNode.getPositionY();

        /* calculate the g score of the neightbor */
        let nextGValue =
          currentNode.getGValue() +
          (xPos - currentNode.getPositionX() === 0 ||
          yPos - currentNode.getPositionY() === 0
            ? this.m_movementCostNotDiagonal
            : this.m_movementCostDiagonal);

        /* is the neighbor not on open list OR */
        /* can it be reached with lower g value from current position */
        if (
          !neightbor.getIsOnOpenList() ||
          nextGValue < neightbor.getGValue()
        ) {
          neightbor.setGValue(nextGValue);
          neightbor.setHValue(
            getManhattenDistance(abs(xPos - xEndPos), abs(yPos - yEndPos)) *
              this.m_movementCostNotDiagonal
          );
          neightbor.setFValue();
          neightbor.setParent(currentNode);

          if (!neightbor.getIsOnOpenList()) {
            neightbor.setIsOnOpenList(true);
            this.m_openList.push(neightbor);
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
