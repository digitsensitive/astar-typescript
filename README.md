# A* search algorithm

In computer science, A* (pronounced as "A star") is a computer algorithm that is widely used in pathfinding and graph traversal, the process of plotting an efficiently directed path between multiple points, called nodes. It enjoys widespread use due to its performance and accuracy (from Wikipedia).

# motivation

This library has been greatly influenced by PathFinding.js from qiao. My motivation was to write a comprehensive A* search algorithm in TypeScript.

# usage

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

## license

MIT
