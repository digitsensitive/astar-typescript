/**
 * @desc A basic node class for pathfinding.
 * @author Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright 2017-2019 Digitsensitive
 * @license {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { INodeConstructor } from '../interfaces/astar-interfaces';

export class Node {
  //  General properties
  readonly id: number;
  readonly posX: number;
  readonly posY: number;

  // Specific properties
  private fValue: number;
  private gValue: number;
  private hValue: number;
  private parentNode: Node;
  private isOnClosedList: boolean;
  private isOnOpenList: boolean;
  private isWalkable: boolean;

  constructor(aParams: INodeConstructor) {
    // Set general properties
    this.id = aParams.id;
    this.posX = aParams.xPos;
    this.posY = aParams.yPos;

    // Set specific properties
    this.hValue = 0;
    this.gValue = 0;
    this.fValue = 0;
    this.parentNode = undefined;
    this.isOnClosedList = false;
    this.isOnOpenList = false;
    this.isWalkable = aParams.walkable || true;
  }

  // Getter functions
  public getFValue(): number {
    return this.fValue;
  }
  public getGValue(): number {
    return this.gValue;
  }
  public getHValue(): number {
    return this.hValue;
  }
  public getParent(): Node {
    return this.parentNode;
  }
  public getIsOnClosedList(): boolean {
    return this.isOnClosedList;
  }
  public getIsOnOpenList(): boolean {
    return this.isOnOpenList;
  }
  public getIsWalkable(): boolean {
    return this.isWalkable;
  }

  // Setter functions
  public setFValue(): void {
    this.fValue = this.gValue + this.hValue;
  }
  public setGValue(_gValue: number): void {
    this.gValue = _gValue;
  }
  public setHValue(_hValue: number): void {
    this.hValue = _hValue;
  }
  public setParent(_parent: Node): void {
    this.parentNode = _parent;
  }
  public setIsOnClosedList(isOnClosedList: boolean): void {
    this.isOnClosedList = isOnClosedList;
  }
  public setIsOnOpenList(isOnOpenList: boolean): void {
    this.isOnOpenList = isOnOpenList;
  }
  public setIsWalkable(isWalkable: boolean): void {
    this.isWalkable = isWalkable;
  }
}
