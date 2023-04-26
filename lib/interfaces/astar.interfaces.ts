import { Heuristic } from '../types/astar.types';

export interface IAStarFinderConstructor {
  grid: IGridConstructor;
  diagonalAllowed?: boolean;
  heuristic?: Heuristic;
  weight?: number;
  includeStartNode?: boolean;
  includeEndNode?: boolean;
  allowPathAsCloseAsPossible?: boolean;
}

export interface IGridConstructor {
  width?: number;
  height?: number;
  matrix?: number[][];
  densityOfObstacles?: number;
}

export interface INodeConstructor {
  id: number;
  position: IPoint;
  walkable?: boolean;
}

export interface IPoint {
  x: number;
  y: number;
}
