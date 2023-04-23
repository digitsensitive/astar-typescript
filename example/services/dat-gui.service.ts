/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2023 digitsensitive
 * @description  Dat.Gui Service
 *               dat.gui is a lightweight controller library for JavaScript.
 *               https://github.com/dataarts/dat.gui
 * @version      1.0.0
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import * as dat from 'dat.gui';

export class DatGuiService {
  private gui: dat.GUI;
  private controllers: dat.GUIController[];

  constructor() {
    this.gui = new dat.GUI();
    this.controllers = [];
  }

  public addFolder(folderName: string): void {
    this.gui.addFolder(folderName);
  }

  public addController(
    controllerName: string,
    target: Object,
    propName: string,
    hasController: boolean,
    controllerFunction?: (value) => void,
    items?: string[] | number[] | Object
  ): void {
    this.controllers.push(
      this.gui.add(target, propName, items).name(controllerName)
    );

    if (hasController) {
      this.addOnChangeToController(
        this.controllers[this.controllers.length - 1],
        controllerFunction
      );
    }
  }

  public addNumberController(
    controllerName: string,
    target: Object,
    propName: string,
    hasController: boolean,
    configNumber: { min: number; max: number; step: number },
    controllerFunction?: (value) => void
  ): void {
    this.controllers.push(
      this.gui
        .add(
          target,
          propName,
          configNumber.min,
          configNumber.max,
          configNumber.step
        )
        .name(controllerName)
    );

    if (hasController) {
      this.addOnChangeToController(
        this.controllers[this.controllers.length - 1],
        controllerFunction
      );
    }
  }

  private addOnChangeToController(
    controller: dat.GUIController,
    onChangeFunction?: (value) => void
  ): void {
    controller.onChange(onChangeFunction);
  }
}
