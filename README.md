AStar-Typescript
==============
[![GitHub Stars](https://img.shields.io/david/digitsensitive/astar-typescript.svg)](https://david-dm.org/digitsensitive/astar-typescript)
[![GitHub Stars](https://img.shields.io/github/stars/digitsensitive/astar-typescript.svg)](https://github.com/digitsensitive/astar-typescript/stargazers) [![GitHub Forks](https://img.shields.io/github/forks/digitsensitive/astar-typescript.svg)](https://github.com/digitsensitive/astar-typescript/network/members) [![GitHub Issues](https://img.shields.io/github/issues/digitsensitive/astar-typescript.svg)](https://github.com/digitsensitive/astar-typescript/issues) [![Current Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/digitsensitive/astar-typescript)

#### The A* search algorithm library in TypeScript. ####

AStar-TypeScript is an A* pathfinding API written in TypeScript to use for your HTML5 games or other browser-based projects.

This library was influenced and inspired by [@qioa - PathFinding.js](https://github.com/qiao/PathFinding.js), [@bgrins - javascript-astar](https://github.com/bgrins/javascript-astar), [@prettymuchbryce - easystarjs](https://github.com/prettymuchbryce/easystarjs) and [@redblobgames](https://www.redblobgames.com/pathfinding/a-star/introduction.html).

## Buy me a coffee

Whether you use this project, have learned something from it, or just like it, please consider supporting it by buying me a coffee.

<div align="center">
<a href="https://www.buymeacoffee.com/JZDVjsT26" target="blank">
<img src="https://www.buymeacoffee.com/assets/img/custom_images/black_img.png" alt="Buy Me A Coffee" style="height: auto !important; width: auto !important;"></a>
</div>

## Installation

```sh
npm install astar-typescript --save
yarn add astar-typescript
bower install astar-typescript --save
```

## Import

### TypeScript
```typescript
import { AStarFinder } from "astar-typescript";
```

### Javascript

```javascript
let AStarFinder = require("astar-typescript");
```

### AMD

```javascript
define(function(require,exports,module){
  let AStarFinder = require('astar-typescript');
});
```

## Usage

Create an astar instance:

```ts
private aStarInstance: AStarFinder;
```

Load grid data:

Using an **array** (hardcoded or from a Tilemap-Editor)
> 0 = walkable
> 1 = not walkable

``` ts
let myMatrix = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 1, 1, 0, 1, 1, 0],
  [0, 0, 1, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0],
  [1, 1, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 1, 0, 1, 0],
  [0, 0, 1, 0, 0, 0, 0, 0]
];

this.aStarInstance = new AStarFinder({
  grid: {
    width: 8,
    height: 8,
    matrix: myMatrix
  }
});
```

or randomly generated array **from width and height**

``` ts
this.aStarInstance = new AStarFinder({
  grid: {
    width: 8,
    height: 8
  }
});
```

Get the path:

```ts
let startPos = { x: 0, y: 0 };
let goalPos = { x: 4, y: 5 };

let myPathway = this.aStarInstance.findPath(startPos, goalPos);
```

license
-------

MIT
