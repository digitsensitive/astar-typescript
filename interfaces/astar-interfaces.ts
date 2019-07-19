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
