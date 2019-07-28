"use strict";
/**
 * @desc A basic node class for pathfinding.
 * @author Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright 2017-2019 Digitsensitive
 * @license {@link https://opensource.org/licenses/MIT|MIT License}
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Node {
    constructor(aParams) {
        // Set general properties
        this.id = aParams.id;
        this.position = { x: aParams.xPos, y: aParams.yPos };
        // Set specific properties
        this.hValue = 0;
        this.gValue = 0;
        this.fValue = 0;
        this.parentNode = undefined;
        this.isOnClosedList = false;
        this.isOnOpenList = false;
        this.isWalkable = aParams.walkable || true;
    }
    /**
     * Calculate or Recalculate the F value
     * This is a private function
     */
    calculateFValue() {
        this.fValue = this.gValue + this.hValue;
    }
    /**
     * Set the g value of the node
     */
    setGValue(gValue) {
        this.gValue = gValue;
        // The G value has changed, so recalculate the f value
        this.calculateFValue();
    }
    /**
     * Set the h value of the node
     */
    setHValue(hValue) {
        this.hValue = hValue;
        // The H value has changed, so recalculate the f value
        this.calculateFValue();
    }
    /**
     * Reset the FGH values to zero
     */
    setFGHValuesToZero() {
        this.fValue = this.gValue = this.hValue = 0;
    }
    getFValue() {
        return this.fValue;
    }
    getGValue() {
        return this.gValue;
    }
    getHValue() {
        return this.hValue;
    }
    getParent() {
        return this.parentNode;
    }
    getIsOnClosedList() {
        return this.isOnClosedList;
    }
    getIsOnOpenList() {
        return this.isOnOpenList;
    }
    getIsWalkable() {
        return this.isWalkable;
    }
    setParent(_parent) {
        this.parentNode = _parent;
    }
    setIsOnClosedList(isOnClosedList) {
        this.isOnClosedList = isOnClosedList;
    }
    setIsOnOpenList(isOnOpenList) {
        this.isOnOpenList = isOnOpenList;
    }
    setIsWalkable(isWalkable) {
        this.isWalkable = isWalkable;
    }
}
exports.Node = Node;
