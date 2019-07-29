/**
 * @desc Grid class
 * @author Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright 2017-2019 Digitsensitive
 * @license {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { Node } from './node';
import { IGridConstructor, IPoint } from '../interfaces/astar-interfaces';
export declare class Grid {
    readonly width: number;
    readonly height: number;
    readonly numberOfFields: number;
    private grid;
    constructor(aParams: IGridConstructor);
    /**
     * Build grid, fill it with nodes and return it.
     * @param matrix [ 0 or 1: 0 = walkable; 1 = not walkable ]
     * @param width [grid width]
     * @param height [grid height]
     * @param densityOfObstacles [density of non walkable fields]
     */
    private buildGridWithNodes;
    /**
     * Return a specific node.
     * @param position [position on the grid]
     */
    getNodeAt(position: IPoint): Node;
    /**
     * Check if specific node walkable.
     * @param position [position on the grid]
     */
    isWalkableAt(position: IPoint): boolean;
    /**
     * Check if specific node is on the grid.
     * @param position [position on the grid]
     */
    private isOnTheGrid;
    /**
     * Get surrounding nodes.
     * @param currentXPos [x-position on the grid]
     * @param currentYPos [y-position on the grid]
     * @param diagnonalMovementAllowed [is diagnonal movement allowed?]
     */
    getSurroundingNodes(currentPosition: IPoint, diagnonalMovementAllowed: boolean): Node[];
    setGrid(newGrid: Node[][]): void;
    /**
     * Reset the grid
     */
    resetGrid(): void;
    clone(): Node[][];
}
