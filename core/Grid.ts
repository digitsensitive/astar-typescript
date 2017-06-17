/**
* @author       Eric Kuhn <digit.sensitivee@gmail.com>
* @copyright    2017 Eric Kuhn
* @license      {@link https://opensource.org/licenses/MIT|MIT License}
*/


import { Node } from './Node'


export class Grid {

  /*  General Properties */
  private m_gridWidth: number;
  private m_gridHeight: number;
  private m_totalFields: number;
  private m_matrix: number[][];

  /* The node grid */
  private m_grid: Node[][];

  constructor(_width: number, _height: number);
  constructor(_width: number, _height: number, _densityOfObstacles: number);
  constructor(_matrix: number[][]);
  constructor(_widthOrMatrix: any, _height?: number, _densityOfObstacles?: number) {

    /* Set the general properties */
    if (typeof _widthOrMatrix === "number") {
      this.m_gridWidth = _widthOrMatrix;
      this.m_gridHeight = _height;
      this.m_totalFields = this.m_gridWidth * this.m_gridHeight;
      this.m_matrix = undefined;
    }

    else {
      this.m_gridWidth = _widthOrMatrix[0].length;
      this.m_gridHeight = _widthOrMatrix.length;
      this.m_totalFields = this.m_gridWidth * this.m_gridHeight;
      this.m_matrix = _widthOrMatrix;
    }

    /* Create and generate the matrix */
    this.m_grid = this.buildGridWithNodes(this.m_matrix, this.m_gridWidth, this.m_gridHeight, _densityOfObstacles);

  }

  /**
   * Builds the grid with the nodes and return it.
   * @param  {number[][]} _matrix [ 0 and 1: 0 = walkable; 1 = not walkable ]
   * @param  {number}     _width  [ the width of the matrix ]
   * @param  {number}     _height [ the height of the matrix ]
   * @return {Node[][]}           [ the grid with its nodes ]
   */
  private buildGridWithNodes(_matrix: number[][], _width: number, _height: number, _densityOfObstacles?: number): Node[][] {

    /* Local variables */
    let matrix: Node[][] = [];
    let id: number = 0;

    /* Generate the matrix */
    for (let y = 0; y < _height; y++) {
      matrix[y] = [];
      for (let x = 0; x < _width; x++) {

        matrix[y][x] = new Node({
          id: id,
          xPos: x,
          yPos: y
        });

        id++;

      }
    }

    /**
     * In case we do not have a matrix loaded.
     * Return the matrix now.
     * We do not have to load up more informations.
     */
    if (_matrix === undefined) {

      for (let y = 1; y < _height - 1; y++) {
        for (let x = 1; x < _width - 1; x++) {

        let randNumber = Math.floor(Math.random() * 10) + 1;
          if (randNumber > (10 - _densityOfObstacles)) {
            matrix[y][x].setIsWalkable(false);
          }

          else {
            matrix[y][x].setIsWalkable(true);
          }

        }
      }

      return matrix;
    }

    /**
     * In case we have a matrix loaded.
     * Load up the informations of the matrix.
     */
     for (let y = 0; y < _height; y++) {
       for (let x = 0; x < _width; x++) {

         if (_matrix[y][x]) {
           matrix[y][x].setIsWalkable(false);
         }

         else {
           matrix[y][x].setIsWalkable(true);
         }

       }
     }

    return matrix;

  }

  /**
   * Return a specific node.
   * @param  {number} _x [ the x-position on the grid ]
   * @param  {number} _y [ the y-position on the grid ]
   * @return {Node}      [ the node ]
   */
  public getNodeAt(_x: number, _y: number): Node {
    return this.m_grid[_y][_x];
  }

  /**
   * Check if specific node walkable.
   * @param  {number} _x [ the x-position on the grid ]
   * @param  {number} _y [ the y-position on the grid ]
   * @return {boolean}   [ walkable (true) or not walkable (false) ]
   */
  public isWalkableAt(_x: number, _y: number): boolean {
    return this.m_grid[_y][_x].getIsWalkable();
  }

  /**
   * Check if specific node is on the grid.
   * @param  {number}  _x [ the x-position on the grid ]
   * @param  {number}  _y [ the y-position on the grid ]
   * @return {boolean}    [ on the grid (true) or not on the grid (false) ]
   */
  private isOnTheGrid(_x: number, _y: number): boolean {
    return (_x >= 0 && _x < this.m_gridWidth) && (_y >= 0 && _y < this.m_gridHeight);
  }

  /**
   * Get surround nodes.
   * @param  {number}  _currentXPos              [ the x-position on the grid ]
   * @param  {number}  _currentYPos              [ the y-position on the grid ]
   * @param  {boolean} _diagnonalMovementAllowed [ is diagnonal movement allowed? ]
   * @return {Node[]}                            [ the surround nodes ]
   */
  public getSurroundingNodes(_currentXPos: number, _currentYPos: number, _diagnonalMovementAllowed: boolean): Node[] {

    /* Local variables */
    let surroundingNodes: Node[] = [];


    for (var y = (_currentYPos - 1); y < (_currentYPos + 2); y++) {
      for (var x = (_currentXPos - 1); x < (_currentXPos + 2); x++) {

        if (this.isOnTheGrid(x, y)) {

          if (this.isWalkableAt(x, y)) {

            if (_diagnonalMovementAllowed) {
              surroundingNodes.push(this.getNodeAt(x, y));
            }

            else {
              if (x == _currentXPos || y == _currentYPos) {
                surroundingNodes.push(this.getNodeAt(x, y));
              }
            }

          }

          else {
            continue;
          }

        }

        else {
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
  public getGrid(): Node[][] { return this.m_grid; }

  /**
   * Get the grid width
   * @return {number} [ width ]
   */
  public getGridWidth(): number { return this.m_gridWidth; }

  /**
   * Get the grid height
   * @return {number} [ height ]
   */
  public getGridHeight(): number { return this.m_gridHeight; }

  /**
   * Clean the grid
   */
  public cleanGrid(): void {
    for (let y = 0; y < this.m_grid.length; y++) {
      for (let x = 0; x < this.m_grid[y].length; x++) {
        this.m_grid[y][x].setIsOnClosedList(false);
        this.m_grid[y][x].setIsOnOpenList(false);
        this.m_grid[y][x].setParent(undefined);
      }
    }
  }

}
