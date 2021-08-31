import { Node } from './node';
import { IGridConstructor, IPoint } from '../interfaces/astar.interfaces';

export class Grid {
  // General properties
  readonly width: number;
  readonly height: number;
  readonly numberOfFields: number;
  readonly maxCost: number;

  // The node grid
  private gridNodes: Node[][];

  constructor(aParams: IGridConstructor) {
    // Set the general properties
    if (aParams.width && aParams.height) {
      this.width = aParams.width;
      this.height = aParams.height;
      this.numberOfFields = this.width * this.height;
    } else if (aParams.matrix) {
      this.width = aParams.matrix[0].length;
      this.height = aParams.matrix.length;
      this.numberOfFields = this.width * this.height;
    }

    this.maxCost = aParams.maxCost || 0;

    // Create and generate the matrix
    this.gridNodes = this.buildGridWithNodes(
      aParams.matrix || undefined,
      this.width,
      this.height,
      aParams.densityOfObstacles || 0
    );
  }

  /**
   * Build grid, fill it with nodes and return it.
   * @param matrix [ 0 or 1: 0 = walkable; 1 = not walkable ]
   * @param width [grid width]
   * @param height [grid height]
   * @param densityOfObstacles [density of non walkable fields]
   */
  private buildGridWithNodes(
    matrix: number[][],
    width: number,
    height: number,
    densityOfObstacles?: number
  ): Node[][] {
    const newGrid: Node[][] = [];
    let id: number = 0;

    // Generate an empty matrix
    for (let y = 0; y < height; y++) {
      newGrid[y] = [];
      for (let x = 0; x < width; x++) {
        newGrid[y][x] = new Node({
          id: id,
          position: { x: x, y: y }
        });

        id++;
      }
    }

    /**
     * If we have not loaded a predefined matrix,
     * loop through our grid and set random obstacles.
     */
    if (matrix === undefined) {
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const rndNumber = Math.floor(Math.random() * 10) + 1;
          if (rndNumber > 10 - densityOfObstacles) {
            newGrid[y][x].setIsWalkable(false);
          } else {
            newGrid[y][x].setIsWalkable(true);
          }
        }
      }

      return newGrid;
    }

    /**
     * In case we have a matrix loaded.
     * Load up the informations of the matrix.
     */
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (this.maxCost) {
          newGrid[y][x].setIsWalkable(matrix[y][x] < this.maxCost);
          newGrid[y][x].setCost(matrix[y][x]);
        } else {
          if (matrix[y][x]) {
            newGrid[y][x].setIsWalkable(false);
          } else {
            newGrid[y][x].setIsWalkable(true);
          }
        }
      }
    }

    return newGrid;
  }

  /**
   * Return a specific node.
   * @param position [position on the grid]
   */
  public getNodeAt(position: IPoint): Node {
    return this.gridNodes[position.y][position.x];
  }

  /**
   * Check if specific node walkable.
   * @param position [position on the grid]
   */
  public isWalkableAt(position: IPoint): boolean {
    return this.gridNodes[position.y][position.x].getIsWalkable();
  }

  /**
   * Check if specific node is on the grid.
   * @param position [position on the grid]
   */
  private isOnTheGrid(position: IPoint): boolean {
    return (
      position.x >= 0 &&
      position.x < this.width &&
      position.y >= 0 &&
      position.y < this.height
    );
  }

  /**
   * Get surrounding nodes.
   * @param currentXPos [x-position on the grid]
   * @param currentYPos [y-position on the grid]
   * @param diagnonalMovementAllowed [is diagnonal movement allowed?]
   */
  public getSurroundingNodes(
    currentPosition: IPoint,
    diagnonalMovementAllowed: boolean
  ): Node[] {
    const surroundingNodes: Node[] = [];

    for (var y = currentPosition.y - 1; y <= currentPosition.y + 1; y++) {
      for (var x = currentPosition.x - 1; x <= currentPosition.x + 1; x++) {
        if (this.isOnTheGrid({ x, y })) {
          if (this.isWalkableAt({ x, y })) {
            if (diagnonalMovementAllowed) {
              surroundingNodes.push(this.getNodeAt({ x, y }));
            } else {
              if (x == currentPosition.x || y == currentPosition.y) {
                surroundingNodes.push(this.getNodeAt({ x, y }));
              }
            }
          } else {
            continue;
          }
        } else {
          continue;
        }
      }
    }

    return surroundingNodes;
  }

  public setGrid(newGrid: Node[][]): void {
    this.gridNodes = newGrid;
  }

  /**
   * Reset the grid
   */
  public resetGrid(): void {
    for (let y = 0; y < this.gridNodes.length; y++) {
      for (let x = 0; x < this.gridNodes[y].length; x++) {
        this.gridNodes[y][x].setIsOnClosedList(false);
        this.gridNodes[y][x].setIsOnOpenList(false);
        this.gridNodes[y][x].setParent(undefined);
        this.gridNodes[y][x].setFGHValuesToZero();
      }
    }
  }

  /**
   * Get all the nodes of the grid.
   */
  public getGridNodes(): Node[][] {
    return this.gridNodes;
  }

  /**
   * Get a clone of the grid
   */
  public clone(): Node[][] {
    const cloneGrid: Node[][] = [];
    let id: number = 0;

    for (let y = 0; y < this.height; y++) {
      cloneGrid[y] = [];
      for (let x = 0; x < this.width; x++) {
        cloneGrid[y][x] = new Node({
          id: id,
          position: { x: x, y: y },
          walkable: this.gridNodes[y][x].getIsWalkable(),
          cost: this.gridNodes[y][x].getCost(),
        });

        id++;
      }
    }
    return cloneGrid;
  }
}
