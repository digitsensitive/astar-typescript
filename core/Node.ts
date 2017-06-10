/**
* @author       Eric Kuhn <digit.sensitivee@gmail.com>
* @copyright    2017 Eric Kuhn
* @license      {@link https://opensource.org/licenses/MIT|MIT License}
*/


interface NodeConstructor {
  id: number;
  xPos: number;
  yPos: number;
  walkable?: boolean;
}


/**
 * The node class.
 * Each node has general properties like the id, the x and y position.
 * There are other more specific properties.
 * It is possible to define other properties as needed.
 */
export class Node {

  /*  General Properties */
  private m_id: number;
  private m_posX: number;
  private m_posY: number;

  /* Specific Properties */
  private m_fValue: number;
  private m_gValue: number;
  private m_hValue: number;
  private m_parent: Node;
  private m_isOnClosedList: boolean;
  private m_isOnOpenList: boolean;
  private m_isWalkable: boolean;

  /* Getter functions */
  public getId(): number { return this.m_id; }
  public getPositionX(): number { return this.m_posX; }
  public getPositionY(): number { return this.m_posY; }
  public getFValue(): number { return this.m_fValue; }
  public getGValue(): number { return this.m_gValue; }
  public getHValue(): number { return this.m_hValue; }
  public getParent(): Node { return this.m_parent; }
  public getIsOnClosedList(): boolean { return this.m_isOnClosedList; }
  public getIsOnOpenList(): boolean { return this.m_isOnOpenList; }
  public getIsWalkable(): boolean { return this.m_isWalkable; }

  /* Setter functions */
  public setFValue(): void { this.m_fValue = this.m_gValue + this.m_hValue; }
  public setGValue(_gValue: number): void { this.m_gValue = _gValue; }
  public setHValue(_hValue: number): void { this.m_hValue = _hValue; }
  public setParent(_parent: Node): void { this.m_parent = _parent; }
  public setIsOnClosedList(_isOnClosedList: boolean): void { this.m_isOnClosedList = _isOnClosedList; }
  public setIsOnOpenList(_isOnOpenList: boolean): void { this.m_isOnOpenList = _isOnOpenList; }
  public setIsWalkable(_isWalkable: boolean): void { this.m_isWalkable = _isWalkable; }

  constructor(aParams: NodeConstructor) {

    /* Set the general properties */
    this.m_id = aParams.id;
    this.m_posX = aParams.xPos;
    this.m_posY = aParams.yPos;

    /* Set the specific properties */
    this.m_hValue = 0;
    this.m_gValue = 0;
    this.m_fValue = 0;
    this.m_parent = undefined;
    this.m_isOnClosedList = false;
    this.m_isOnOpenList = false;
    this.m_isWalkable = aParams.walkable || true;

  }

}
