/**
 * @desc Dijkstra's algorithm for pathfinding
 * @author Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright 2019 Digitsensitive
 * @license {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { AStarFinder } from './AStarFinder';
import { IDijkstrasFinderConstructor } from '../interfaces/astar-interfaces';

/**
 * RANDOM COMMENTS:
 * Dijkstra's cannot evaluate negative edge weights
 */
export class DijkstrasFinder extends AStarFinder {
  constructor(aParams: IDijkstrasFinderConstructor) {
    super(aParams);
    this.weight = 0;
  }
}
