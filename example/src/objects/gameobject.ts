/**
 * @description Gameobject class
 * @author Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright 2019 - 2023 Digitsensitive
 * @license {@link https://opensource.org/licenses/MIT|MIT License}
 */

export class GameObject extends Phaser.GameObjects.Image {
  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    this.initImage(params.realSize, params.tint, params.alpha);

    this.scene.add.existing(this);
  }

  private initImage(realSize: number, tint: number, alpha: number): void {
    this.setOrigin(0, 0);
    this.setDisplaySize(realSize, realSize);
    this.setTint(tint);
    this.setAlpha(alpha);
  }
}
