AStar-Typescript
==============
[![GitHub Stars](https://img.shields.io/david/digitsensitive/astar-typescript.svg)](https://david-dm.org/digitsensitive/astar-typescript)
[![GitHub Stars](https://img.shields.io/github/stars/digitsensitive/astar-typescript.svg)](https://github.com/digitsensitive/astar-typescript/stargazers) [![GitHub Forks](https://img.shields.io/github/forks/digitsensitive/astar-typescript.svg)](https://github.com/digitsensitive/astar-typescript/network/members) [![GitHub Issues](https://img.shields.io/github/issues/digitsensitive/astar-typescript.svg)](https://github.com/digitsensitive/astar-typescript/issues) [![Current Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/digitsensitive/astar-typescript)

#### The A* search algorithm library in TypeScript. ####

AStar-TypeScript is an A* pathfinding API written in TypeScript to use for your HTML5 games or other browser-based projects.

This library was influenced and inspired by [@qioa - PathFinding.js](https://github.com/qiao/PathFinding.js) and [@redblobgames](https://www.redblobgames.com/pathfinding/a-star/introduction.html).

Buy me a coffee
---------------

Whether you use this project, have learned something from it, or just like it, please consider supporting it by buying me a coffee.

<div align="center">
<a href="https://www.buymeacoffee.com/JZDVjsT26" target="blank">
<img src="https://www.buymeacoffee.com/assets/img/custom_images/black_img.png" alt="Buy Me A Coffee" style="height: auto !important; width: auto !important;"></a>
</div>

Usage
-----

## import package

```
import * as AStar from './node_modules/astar-typescript/main';
```
## create an astar-finder and a grid instance

```
private m_aStarInstance: AStar.AStarFinder;
private m_grid: AStar.Grid;
```
## load data

Using an **array** (hardcoded or from a Tilemap-Editor)
> 0 = walkable
> 1 = not walkable

``` ts
let matrix = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 1, 1, 0, 1, 1, 0],
  [0, 0, 1, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0],
  [1, 1, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 1, 0, 1, 0],
  [0, 0, 1, 0, 0, 0, 0, 0]
];

this.m_grid = new AStar.Grid(matrix);
```

or randomly generated array **from width and height**

``` ts
let width = 10;
let height = 10;

this.m_grid = new AStar.Grid(width, height);
```
## set-up your instance

``` ts
let diagonalMovement = true;

this.m_aStarInstance = new AStar.AStarFinder(this.m_grid, diagonalMovement);
```
## return the path

``` ts
let startPos = [0, 0];
let goalPos = [4, 5];

this.m_pathway = this.m_aStarInstance.findPath(startPos, goalPos);

```

license
---------------

MIT
