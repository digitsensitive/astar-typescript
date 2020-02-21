/**
 * @description Interfaces used for astar-typescript
 * @author Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright 2017 - 2020 Digitsensitive
 * @license {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { Heuristic } from '../types/astar.types';

export interface IAStarFinderConstructor {
  grid: IGridConstructor;
  diagonalAllowed?: boolean;
  heuristicFunction?: Heuristic;
  weight?: number;
  includeStartNode?: boolean;
  includeEndNode?: boolean;
}

export interface IDijkstrasFinderConstructor {
  grid: IGridConstructor;
  diagonalAllowed?: boolean;
  heuristicFunction?: Heuristic;
  includeStartNode?: boolean;
  includeEndNode?: boolean;
}

export interface IGridConstructor {
  width?: number;
  height?: number;
  matrix?: number[][];
  densityOfObstacles?: number;
}

export interface INodeConstructor {
  id: number;
  xPos: number;
  yPos: number;
  walkable?: boolean;
}

export interface IPoint {
  x: number;
  y: number;
}
