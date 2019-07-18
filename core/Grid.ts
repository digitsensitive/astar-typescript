/**
 * @desc Grid class
 * @author Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright 2017-2019 Digitsensitive
 * @license {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { Node } from './Node';
import { IGridConstructor } from '../interfaces/astar-interfaces';

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
   * @param x [x-position on the grid]
   * @param y [y-position on the grid]
   */
  public getNodeAt(x: number, y: number): Node {
    return this.grid[y][x];
  }

  /**
   * Check if specific node walkable.
   * @param x [x-position on the grid]
   * @param y [y-position on the grid]
   */
  public isWalkableAt(x: number, y: number): boolean {
    return this.grid[y][x].getIsWalkable();
  }

  /**
   * Check if specific node is on the grid.
   * @param x [x-position on the grid]
   * @param y [y-position on the grid]
   */
  private isOnTheGrid(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  /**
   * Get surround nodes.
   * @param  {number}  _currentXPos              [ the x-position on the grid ]
   * @param  {number}  _currentYPos              [ the y-position on the grid ]
   * @param  {boolean} _diagnonalMovementAllowed [ is diagnonal movement allowed? ]
   * @return {Node[]}                            [ the surround nodes ]
   */
  public getSurroundingNodes(
    _currentXPos: number,
    _currentYPos: number,
    _diagnonalMovementAllowed: boolean
  ): Node[] {
    /* Local variables */
    let surroundingNodes: Node[] = [];

    for (var y = _currentYPos - 1; y < _currentYPos + 2; y++) {
      for (var x = _currentXPos - 1; x < _currentXPos + 2; x++) {
        if (this.isOnTheGrid(x, y)) {
          if (this.isWalkableAt(x, y)) {
            if (_diagnonalMovementAllowed) {
              surroundingNodes.push(this.getNodeAt(x, y));
            } else {
              if (x == _currentXPos || y == _currentYPos) {
                surroundingNodes.push(this.getNodeAt(x, y));
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
   * Get the Grid
   * @return {Node[][]} [ the generated grid ]
   */
  public getGrid(): Node[][] {
    return this.grid;
  }

  /**
   * Clean the grid
   */
  public cleanGrid(): void {
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        this.grid[y][x].setIsOnClosedList(false);
        this.grid[y][x].setIsOnOpenList(false);
        this.grid[y][x].setParent(undefined);
      }
    }
  }
}
