/**
 * @desc Utils for pathfinding.
 * @author Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright 2017-2019 Digitsensitive
 * @license {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { Node } from './node';
/**
 * Backtrace from end node through parents and return the path.
 * @param node
 * @param includeStartingNode
 */
export declare function backtrace(node: Node, includeStartNode: boolean, includeEndNode: boolean): number[][];
