/**
 * @desc AStarFinder class
 * @author Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright 2017-2019 Digitsensitive
 * @license {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { IAStarFinderConstructor, IPoint } from '../interfaces/astar-interfaces';
import { Node } from '../core/node';
import { Heuristic } from '../types/astar-types';
export declare class AStarFinder {
    private grid;
    private closedList;
    private openList;
    readonly diagonalAllowed: boolean;
    readonly heuristicFunction: Heuristic;
    readonly includeStartNode: boolean;
    readonly includeEndNode: boolean;
    protected weight: number;
    constructor(aParams: IAStarFinderConstructor);
    getMapArray(): Node[][];
    findPath(startPosition: IPoint, endPosition: IPoint): number[][];
}
