/**
* @author       Eric Kuhn <digit.sensitivee@gmail.com>
* @copyright    2017 Eric Kuhn
* @license      {@link https://opensource.org/licenses/MIT|MIT License}
*/


  /**
 * Backtrace according to the parent records and return the path.
 * (including both start and end nodes)
 * @param  {Node[]} _node [ the goal node ]
 * @return {number[][]}     [ the path ]
 */
export function backtrace(_node): number[][] {
  let path: number[][] = [];
  let currentNode = _node;

  while (currentNode.getParent()) {
    path.push([currentNode.getPositionX(), currentNode.getPositionY()]);
    currentNode = currentNode.getParent();
  }

  path.push([currentNode.getPositionX(), currentNode.getPositionY()]);

  return path.reverse();
}
