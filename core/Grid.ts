/**
 * @desc Grid class
 * @author Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright 2017-2019 Digitsensitive
 * @license {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { Node } from './node';
import { IGridConstructor, IPoint } from '../interfaces/astar-interfaces';

export class Grid {
  // General properties
  readonly width: number;
  readonly height: number;
  readonly numberOfFields: number;

  // The node grid
  private grid: Node[][];

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

    // Create and generate the matrix
    this.grid = this.buildGridWithNodes(
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
    let newGrid: Node[][] = [];
    let id: number = 0;

    // Generate an empty matrix
    for (let y = 0; y < height; y++) {
      newGrid[y] = [];
      for (let x = 0; x < width; x++) {
        newGrid[y][x] = new Node({
          id: id,
          xPos: x,
          yPos: y
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
          let rndNumber = Math.floor(Math.random() * 10) + 1;
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
        if (matrix[y][x]) {
          newGrid[y][x].setIsWalkable(false);
        } else {
          newGrid[y][x].setIsWalkable(true);
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
    return this.grid[position.y][position.x];
  }

  /**
   * Check if specific node walkable.
   * @param position [position on the grid]
   */
  public isWalkableAt(position: IPoint): boolean {
    return this.grid[position.y][position.x].getIsWalkable();
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
    currentXPos: number,
    currentYPos: number,
    diagnonalMovementAllowed: boolean
  ): Node[] {
    let surroundingNodes: Node[] = [];

    for (var y = currentYPos - 1; y <= currentYPos + 1; y++) {
      for (var x = currentXPos - 1; x <= currentXPos + 1; x++) {
        if (this.isOnTheGrid({ x, y })) {
          if (this.isWalkableAt({ x, y })) {
            if (diagnonalMovementAllowed) {
              surroundingNodes.push(this.getNodeAt({ x, y }));
            } else {
              if (x == currentXPos || y == currentYPos) {
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

  /**
   * Get the current grid
   */
  public getGrid(): Node[][] {
    return this.grid;
  }

  /**
   * Reset the grid
   */
  public resetGrid(): void {
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        this.grid[y][x].setIsOnClosedList(false);
        this.grid[y][x].setIsOnOpenList(false);
        this.grid[y][x].setParent(undefined);
        this.grid[y][x].resetFGHValues();
      }
    }
  }
}
