/**
 * @desc Main and only scene, where we display our matrix and path.
 * @author Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright 2019 Digitsensitive
 * @license {@link https://opensource.org/licenses/MIT|MIT License}
 */

import * as AStar from '../../main';
import * as dat from 'dat.gui';

export class MainScene extends Phaser.Scene {
  // variables
  private endPosition: number[];
  private gridHeight: number;
  private gridWidth: number;
  private startPosition: number[];
  private tileSize: number;

  // game objects
  private endObject: Phaser.GameObjects.Rectangle;
  private gridObject: Phaser.GameObjects.Grid;
  private pathwayObjects: Phaser.GameObjects.Rectangle[];
  private startObject: Phaser.GameObjects.Rectangle;
  private wallObjects: Phaser.GameObjects.Rectangle[];

  // a-star
  private aStarInstance: AStar.AStarFinder;
  private grid: AStar.Grid;
  private pathway: number[][];

  constructor() {
    super({
      key: 'MainScene'
    });
  }

  init(): void {
    // variables
    this.tileSize = 25;
    this.gridHeight = this.sys.canvas.height / this.tileSize;
    this.gridWidth = this.sys.canvas.width / this.tileSize;
    this.startPosition = [
      Phaser.Math.RND.between(0, this.gridWidth - 1),
      Phaser.Math.RND.between(0, this.gridHeight - 1)
    ];
    this.endPosition = [
      Phaser.Math.RND.between(0, this.gridWidth - 1),
      Phaser.Math.RND.between(0, this.gridHeight - 1)
    ];

    // a-star
    this.grid = new AStar.Grid({
      width: this.gridWidth,
      height: this.gridHeight,
      densityOfObstacles: 2
    });
    let diagonalMovement = true;
    this.aStarInstance = new AStar.AStarFinder(this.grid, diagonalMovement);

    this.pathway = this.aStarInstance.findPath(
      this.startPosition,
      this.endPosition
    );
  }

  create(): void {
    // game objects
    // create the grid
    this.gridObject = this.add
      .grid(
        0,
        0,
        this.sys.canvas.width,
        this.sys.canvas.height,
        this.tileSize,
        this.tileSize,
        0xddd5d5,
        1,
        0xffffff,
        1
      )
      .setOrigin(0, 0);

    // create the wall objects
    this.wallObjects = [];
    let mapArray = this.aStarInstance.getMapArray();

    for (let y = 0; y < mapArray.length; y++) {
      for (let x = 0; x < mapArray[y].length; x++) {
        if (!mapArray[y][x].getIsWalkable()) {
          this.wallObjects.push(
            this.add
              .rectangle(
                x * this.tileSize + 1,
                y * this.tileSize + 1,
                this.tileSize - 2,
                this.tileSize - 2,
                0xa5595a,
                1
              )
              .setOrigin(0, 0)
          );
        }
      }
    }

    // create the path
    this.pathwayObjects = [];
    for (let p of this.pathway) {
      this.pathwayObjects.push(
        this.add
          .rectangle(
            p[0] * this.tileSize,
            p[1] * this.tileSize,
            this.tileSize - 1,
            this.tileSize - 1,
            0xccb0b0,
            1
          )
          .setOrigin(0, 0)
      );
    }

    // create start and end object
    this.startObject = this.add
      .rectangle(
        this.startPosition[0] * this.tileSize,
        this.startPosition[1] * this.tileSize,
        this.tileSize,
        this.tileSize,
        0xbd4143,
        1
      )
      .setOrigin(0, 0);
    this.endObject = this.add
      .rectangle(
        this.endPosition[0] * this.tileSize,
        this.endPosition[1] * this.tileSize,
        this.tileSize,
        this.tileSize,
        0xbd4143,
        1
      )
      .setOrigin(0, 0);

    var gui = new dat.GUI();
    gui.add(this.endObject, 'fillColor');
  }
}
