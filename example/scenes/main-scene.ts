/**
 * @desc Main and only scene, where we display our matrix and path.
 * @author Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright 2019 Digitsensitive
 * @license {@link https://opensource.org/licenses/MIT|MIT License}
 */

import * as AStar from '../../main';
import * as dat from 'dat.gui';
import { IPoint } from '../../interfaces/astar-interfaces';

export class MainScene extends Phaser.Scene {
  // variables
  private currentPathObject: number;
  private endPosition: IPoint;
  private gridHeight: number;
  private gridWidth: number;
  private startPosition: IPoint;
  private tileSize: number;

  // game objects
  private endObject: Phaser.GameObjects.Rectangle;
  private gridObject: Phaser.GameObjects.Grid;
  private pathwayAStarObjects: Phaser.GameObjects.Rectangle[];
  private startObject: Phaser.GameObjects.Rectangle;
  private wallObjects: Phaser.GameObjects.Rectangle[];

  // a-star
  private aStarInstance: AStar.AStarFinder;
  private pathwayAStar: number[][];

  constructor() {
    super({
      key: 'MainScene'
    });
  }

  init(): void {
    // variables
    this.currentPathObject = 0;
    this.tileSize = 40;
    this.gridHeight = this.sys.canvas.height / this.tileSize;
    this.gridWidth = this.sys.canvas.width / this.tileSize;
    this.startPosition = {
      x: Phaser.Math.RND.between(0, this.gridWidth - 1),
      y: Phaser.Math.RND.between(0, this.gridHeight - 1)
    };
    this.endPosition = {
      x: Phaser.Math.RND.between(0, this.gridWidth - 1),
      y: Phaser.Math.RND.between(0, this.gridHeight - 1)
    };

    this.aStarInstance = new AStar.AStarFinder({
      grid: {
        width: this.gridWidth,
        height: this.gridHeight
      },
      includeEndNode: false,
      includeStartNode: false
    });

    this.pathwayAStar = this.aStarInstance.findPath(
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
        0x5cdb95,
        1,
        0x8ee4af,
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
                0x05386b,
                1
              )
              .setOrigin(0, 0)
          );
        }
      }
    }

    // create start and end object
    this.startObject = this.add
      .rectangle(
        this.startPosition.x * this.tileSize + 1,
        this.startPosition.y * this.tileSize + 1,
        this.tileSize - 2,
        this.tileSize - 2,
        0xd9a011,
        1
      )
      .setOrigin(0, 0);
    this.endObject = this.add
      .rectangle(
        this.endPosition.x * this.tileSize + 1,
        this.endPosition.y * this.tileSize + 1,
        this.tileSize - 2,
        this.tileSize - 2,
        0xd9a011,
        1
      )
      .setOrigin(0, 0);

    // create the astar path
    this.pathwayAStarObjects = [];
    this.time.addEvent({
      delay: 100,
      callback: this.drawNextObjectOfPath,
      callbackScope: this,
      loop: true
    });

    var gui = new dat.GUI();
    gui.add(this.endObject, 'fillColor');
  }

  private drawNextObjectOfPath(): void {
    if (this.currentPathObject < this.pathwayAStar.length) {
      this.pathwayAStarObjects.push(
        this.add
          .rectangle(
            this.pathwayAStar[this.currentPathObject][0] * this.tileSize + 1,
            this.pathwayAStar[this.currentPathObject][1] * this.tileSize + 1,
            this.tileSize - 2,
            this.tileSize - 2,
            0xedf5e1,
            1
          )
          .setOrigin(0, 0)
      );
    }
    this.currentPathObject++;
  }
}
