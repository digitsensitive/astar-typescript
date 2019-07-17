/**
 * @desc Heuristic
 * @author Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright 2017-2019 Digitsensitive
 * @license {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Calculate the manhatten distance.
 * @param  {number} _dx           [ Horizontal change ]
 * @param  {number} _dy           [ Vertical change ]
 * @return {number}               [ The calculated distance ]
 */
export function getManhattenDistance(_dx: number, _dy: number): number {
  return _dx + _dy;
}
