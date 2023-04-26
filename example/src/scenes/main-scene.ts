/**
 * @description Main Scene
 * @author Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright 2019 - 2023 Digitsensitive
 * @license {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { AStarFinder } from '../../../dist/astar';
import { DatGuiService } from '../services/dat-gui.service';
import { GameObject } from '../objects/gameobject';

export class MainScene extends Phaser.Scene {
  // variables
  private currentPathObject: number;
  private goalPosition: Phaser.Math.Vector2;
  private gridHeight: number;
  private gridWidth: number;
  private startPosition: Phaser.Math.Vector2;
  private tileSize: number;

  // game objects
  private endObject: GameObject;
  private gameGrid: Phaser.GameObjects.Grid;
  private aStarPathwayObjects: GameObject[];
  private startObject: GameObject;
  private surroundingNodes: GameObject[];
  private wallObjects: GameObject[];

  // astar
  private aMatrix: number[][];
  private aStarInstance: AStarFinder;
  private diagonalMovement: boolean;
  private heuristic: any;
  private weight: number;
  private aStarPathway: number[][];

  // dat gui service
  private datGuiServiceInstance: DatGuiService;

  constructor() {
    super({
      key: 'MainScene'
    });
  }

  init(): void {
    // init variables
    this.currentPathObject = 0;
    this.tileSize = 60;
    this.gridHeight = Math.floor(this.sys.canvas.height / this.tileSize);
    this.gridWidth = Math.floor(this.sys.canvas.width / this.tileSize);
    this.startPosition = new Phaser.Math.Vector2(
      Phaser.Math.RND.between(0, this.gridWidth - 1),
      Phaser.Math.RND.between(0, this.gridHeight - 1)
    );

    this.goalPosition = new Phaser.Math.Vector2(
      Phaser.Math.RND.between(0, this.gridWidth - 1),
      Phaser.Math.RND.between(0, this.gridHeight - 1)
    );

    // init astar variables
    this.aMatrix = [];
    for (let i = 0; i < this.gridHeight; i++) {
      this.aMatrix[i] = Array<number>(this.gridWidth).fill(0);
    }
    this.diagonalMovement = false;
    this.heuristic = 'Manhattan';
    this.weight = 1;
    this.aStarInstance = new AStarFinder({
      grid: {
        matrix: this.aMatrix
      },
      heuristic: this.heuristic,
      weight: this.weight,
      diagonalAllowed: this.diagonalMovement,
      includeEndNode: false,
      includeStartNode: false
    });

    this.aStarPathway = this.aStarInstance.findPath(
      this.startPosition,
      this.goalPosition
    );

    this.initDatGui();
    this.initInput();
  }

  private initDatGui(): void {
    // dat gui service
    this.datGuiServiceInstance = new DatGuiService();

    this.datGuiServiceInstance.addFolder('Start Position');
    this.datGuiServiceInstance.addNumberController(
      'X',
      this.startPosition,
      'x',
      true,
      { min: 0, max: this.gridWidth - 1, step: 1 },
      (value) => {
        this.startPosition.x = value;
        this.startObject.x = value * this.tileSize + 1;
        this.destroyPathAndSurroundingNodes();
        this.resetAStarInstance();
      }
    );
    this.datGuiServiceInstance.addNumberController(
      'Y',
      this.startPosition,
      'y',
      true,
      { min: 0, max: this.gridHeight - 1, step: 1 },
      (value) => {
        this.startPosition.y = value;
        this.startObject.y = value * this.tileSize + 1;
        this.destroyPathAndSurroundingNodes();
        this.resetAStarInstance();
      }
    );
    this.datGuiServiceInstance.addFolder('End Position');
    this.datGuiServiceInstance.addNumberController(
      'X',
      this.goalPosition,
      'x',
      true,
      { min: 0, max: this.gridWidth - 1, step: 1 },
      (value) => {
        this.goalPosition.x = value;
        this.endObject.x = value * this.tileSize + 1;
        this.destroyPathAndSurroundingNodes();
        this.resetAStarInstance();
      }
    );
    this.datGuiServiceInstance.addNumberController(
      'Y',
      this.goalPosition,
      'y',
      true,
      { min: 0, max: this.gridHeight - 1, step: 1 },
      (value) => {
        this.goalPosition.y = value;
        this.endObject.y = value * this.tileSize + 1;
        this.destroyPathAndSurroundingNodes();
        this.resetAStarInstance();
      }
    );
    this.datGuiServiceInstance.addFolder('A* Properties');

    this.datGuiServiceInstance.addController(
      'Heuristic',
      this,
      'heuristic',
      true,
      (value) => {
        this.heuristic = value;
        this.aStarInstance.setHeuristic(this.heuristic);
        this.destroyPathAndSurroundingNodes();
        this.resetAStarInstance();
      },
      ['Manhattan', 'Euclidean', 'Chebyshev', 'Octile']
    );

    this.datGuiServiceInstance.addNumberController(
      'Weight',
      this,
      'weight',
      true,
      { min: 0, max: 1, step: 0.01 },
      (value) => {
        this.weight = value;
        this.aStarInstance.setWeight(this.weight);
        this.destroyPathAndSurroundingNodes();
        this.resetAStarInstance();
      }
    );
  }

  private initInput(): void {
    this.input.on(
      'pointerdown',
      (pointer) => {
        let x = Math.floor(pointer.x / this.tileSize);
        let y = Math.floor(pointer.y / this.tileSize);

        if (this.aMatrix[y][x] === 1) {
          this.aMatrix[y][x] = 0;
        } else {
          this.aMatrix[y][x] = 1;
          this.wallObjects.push(
            new GameObject({
              scene: this,
              x: x * this.tileSize + 1,
              y: y * this.tileSize + 1,
              key: 'node',
              realSize: this.tileSize - 2,
              tint: 0x156c9e
            }).setInteractive()
          );
        }

        this.destroyPathAndSurroundingNodes();
        this.resetAStarInstance();
      },
      this
    );

    this.input.on('gameobjectdown', (pointer, gameObject) => {
      let x = Math.floor(pointer.x / this.tileSize);
      let y = Math.floor(pointer.y / this.tileSize);
      this.aMatrix[y][x] = 0;
      gameObject.destroy();
      this.destroyPathAndSurroundingNodes();
      this.resetAStarInstance();
    });
  }

  /**
   * This function will create all our game objects.
   */
  create(): void {
    // Create our game grid
    this.gameGrid = this.add
      .grid(
        0,
        0,
        this.sys.canvas.width,
        this.sys.canvas.height,
        this.tileSize,
        this.tileSize,
        0xdff0f5,
        1,
        0xebf8fc,
        1
      )
      .setOrigin(0, 0);

    // Create start and end object
    this.startObject = new GameObject({
      scene: this,
      x: this.startPosition.x * this.tileSize + 1,
      y: this.startPosition.y * this.tileSize + 1,
      key: 'node',
      realSize: this.tileSize - 2,
      tint: 0x9e156e
    });

    this.endObject = new GameObject({
      scene: this,
      x: this.goalPosition.x * this.tileSize + 1,
      y: this.goalPosition.y * this.tileSize + 1,
      key: 'node',
      realSize: this.tileSize - 2,
      tint: 0x159e70
    });

    this.surroundingNodes = [];

    // Create the astar path
    this.aStarPathwayObjects = [];
    this.time.addEvent({
      delay: 0,
      callback: this.drawNextObjectOfPath,
      callbackScope: this,
      loop: true
    });

    this.wallObjects = [];
  }

  private destroyPathAndSurroundingNodes(): void {
    // Destroy path objects
    for (let i = 0; i < this.aStarPathwayObjects.length; i++) {
      this.aStarPathwayObjects[i].destroy();
    }
    this.aStarPathwayObjects = [];

    // Destroy surrounding nodes
    for (let i = 0; i < this.surroundingNodes.length; i++) {
      this.surroundingNodes[i].destroy();
    }
    this.surroundingNodes = [];
  }

  private resetAStarInstance(): void {
    this.aStarInstance = new AStarFinder({
      grid: {
        matrix: this.aMatrix
      },
      heuristic: this.heuristic,
      diagonalAllowed: this.diagonalMovement,
      includeEndNode: false,
      includeStartNode: false
    });

    this.aStarPathway = this.aStarInstance.findPath(
      this.startPosition,
      this.goalPosition
    );

    this.currentPathObject = 0;
  }

  private drawNextObjectOfPath(): void {
    if (this.currentPathObject < this.aStarPathway.length) {
      // get surround nodes
      let getNodes = this.aStarInstance.getGrid().getSurroundingNodes(
        {
          x: this.aStarPathway[this.currentPathObject][0],
          y: this.aStarPathway[this.currentPathObject][1]
        },
        false
      );

      for (let node of getNodes) {
        this.surroundingNodes.push(
          new GameObject({
            scene: this,
            x: node.position.x * this.tileSize + 1,
            y: node.position.y * this.tileSize + 1,
            key: 'node',
            realSize: this.tileSize - 2,
            tint: 0x24e1e3,
            alpha: node.getGValue() / 100
          })
        );
      }

      this.aStarPathwayObjects.push(
        new GameObject({
          scene: this,
          x: this.aStarPathway[this.currentPathObject][0] * this.tileSize + 1,
          y: this.aStarPathway[this.currentPathObject][1] * this.tileSize + 1,
          key: 'node',
          realSize: this.tileSize - 2,
          tint: 0xffffff
        })
      );
    }

    this.currentPathObject++;
  }
}
