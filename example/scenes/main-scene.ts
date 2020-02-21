/**
 * @description Main and only scene, where we display our matrix and path.
 * @author Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright 2019 - 2020 Digitsensitive
 * @license {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { AStarFinder } from '../../lib/astar';
import { DatGuiService } from '../services/dat-gui.service';

export class MainScene extends Phaser.Scene {
  // variables
  private currentPathObject: number;
  private endPosition: { x: number; y: number };
  private gridHeight: number;
  private gridWidth: number;
  private startPosition: Phaser.Math.Vector2;
  private tileSize: number;
  private heuristic: any;
  private densityOfObstacles: number;

  // game objects
  private endObject: Phaser.GameObjects.Rectangle;
  private gridObject: Phaser.GameObjects.Grid;
  private pathwayAStarObjects: Phaser.GameObjects.Rectangle[];
  private startObject: Phaser.GameObjects.Rectangle;
  private wallObjects: Phaser.GameObjects.Rectangle[];

  // a-star
  private aStarInstance: AStarFinder;
  private pathwayAStar: number[][];

  // dat gui service
  private datGuiServiceInstance: DatGuiService;

  constructor() {
    super({
      key: 'MainScene'
    });
  }

  init(): void {
    // variables
    this.currentPathObject = 0;
    this.densityOfObstacles = 0.1;
    this.tileSize = 30;
    this.gridHeight = this.sys.canvas.height / this.tileSize;
    this.gridWidth = this.sys.canvas.width / this.tileSize;
    this.startPosition = new Phaser.Math.Vector2(
      Phaser.Math.RND.between(0, this.gridWidth - 1),
      Phaser.Math.RND.between(0, this.gridHeight - 1)
    );

    this.endPosition = {
      x: Phaser.Math.RND.between(0, this.gridWidth - 1),
      y: Phaser.Math.RND.between(0, this.gridHeight - 1)
    };
    this.heuristic = 'Manhatten';

    this.aStarInstance = new AStarFinder({
      grid: {
        width: this.gridWidth,
        height: this.gridHeight,
        densityOfObstacles: this.densityOfObstacles
      },
      heuristicFunction: this.heuristic,
      includeEndNode: false,
      includeStartNode: false
    });

    this.pathwayAStar = this.aStarInstance.findPath(
      this.startPosition,
      this.endPosition
    );

    // dat gui service
    this.datGuiServiceInstance = new DatGuiService();

    this.datGuiServiceInstance.addFolder('Start Position');
    this.datGuiServiceInstance.addNumberController(
      'X',
      this.startPosition,
      'x',
      true,
      { min: 0, max: this.gridWidth - 1, step: 1 },
      value => {
        this.startPosition.x = value;
        this.startObject.x = value * this.tileSize + 1;
        this.destroyPath();
        this.renewPath();
      }
    );
    this.datGuiServiceInstance.addNumberController(
      'Y',
      this.startPosition,
      'y',
      true,
      { min: 0, max: this.gridHeight - 1, step: 1 },
      value => {
        this.startPosition.y = value;
        this.startObject.y = value * this.tileSize + 1;
        this.destroyPath();
        this.renewPath();
      }
    );
    this.datGuiServiceInstance.addFolder('End Position');
    this.datGuiServiceInstance.addNumberController(
      'X',
      this.endPosition,
      'x',
      true,
      { min: 0, max: this.gridWidth - 1, step: 1 },
      value => {
        this.endPosition.x = value;
        this.endObject.x = value * this.tileSize + 1;
        this.destroyPath();
        this.renewPath();
      }
    );
    this.datGuiServiceInstance.addNumberController(
      'Y',
      this.endPosition,
      'y',
      true,
      { min: 0, max: this.gridHeight - 1, step: 1 },
      value => {
        this.endPosition.y = value;
        this.endObject.y = value * this.tileSize + 1;
        this.destroyPath();
        this.renewPath();
      }
    );
    this.datGuiServiceInstance.addFolder('A* Properties');
    this.datGuiServiceInstance.addNumberController(
      'Density',
      this,
      'densityOfObstacles',
      true,
      { min: 0, max: 10, step: 0.01 },
      value => {
        this.densityOfObstacles = value;
        this.destroyPath();
        this.resetAStarInstance();
        this.destroyAndResetObstacles();
        this.renewPath();
      }
    );
    this.datGuiServiceInstance.addController(
      'Heuristic',
      this,
      'heuristic',
      true,
      value => {
        this.heuristic = value;
        this.resetHeuristic();
        this.destroyPath();
        this.renewPath();
      },
      ['Manhatten', 'Euclidean', 'Chebyshev', 'Octile']
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
        0xc0dbe2,
        1,
        0xdbebef,
        1
      )
      .setOrigin(0, 0);

    // create the wall objects
    this.wallObjects = [];
    let mapArray = this.aStarInstance.getGridClone();

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
                0x2a96b5,
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
        0x262425,
        1
      )
      .setOrigin(0, 0);
    this.endObject = this.add
      .rectangle(
        this.endPosition.x * this.tileSize + 1,
        this.endPosition.y * this.tileSize + 1,
        this.tileSize - 2,
        this.tileSize - 2,
        0x262425,
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
  }

  update(): void {}

  private resetAStarInstance(): void {
    this.aStarInstance = new AStarFinder({
      grid: {
        width: this.gridWidth,
        height: this.gridHeight,
        densityOfObstacles: this.densityOfObstacles
      },
      heuristicFunction: this.heuristic,
      includeEndNode: false,
      includeStartNode: false
    });
  }

  private destroyPath(): void {
    for (let i = 0; i < this.pathwayAStarObjects.length; i++) {
      this.pathwayAStarObjects[i].destroy();
    }
    this.pathwayAStarObjects = [];
  }

  private renewPath(): void {
    this.pathwayAStar = this.aStarInstance.findPath(
      this.startPosition,
      this.endPosition
    );
    this.currentPathObject = 0;
  }

  private resetHeuristic(): void {
    this.aStarInstance.setHeuristic(this.heuristic);
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
            0x74e1e3,
            1
          )
          .setOrigin(0, 0)
      );
    }
    this.currentPathObject++;
  }

  private destroyAndResetObstacles(): void {
    for (let i = 0; i < this.wallObjects.length; i++) {
      this.wallObjects[i].destroy();
    }

    this.wallObjects = [];
    let mapArray = this.aStarInstance.getGridClone();

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
                0x2a96b5,
                1
              )
              .setOrigin(0, 0)
          );
        }
      }
    }
  }
}
