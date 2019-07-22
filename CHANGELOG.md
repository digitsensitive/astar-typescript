# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.0.0] - 2019-XX-XX
### Added
- Example folder with an integration of this library into [Phaser 3](https://phaser.io/phaser3)
- Separate interfaces into own file `astar-inferfaces.ts`
- Add `Dijkstra's Finder`

### Changed
- New scripts in the `package.json` file
- Update `.gitignore` with `yarn.lock`
- Multiple optimizations in `Grid.ts` and `AStarFinder.ts`
- Update `Heuristics`
- New functionality to include or exclude start and end node when backtracing

## [0.0.5] - 2019-07-17
### Added
- Add a `CHANGELOG.md` file
- Add [Prettier](https://github.com/prettier/prettier) configuration file `.prettierrc`
- Add `.gitignore` file

### Changed
- Format all *.ts files with [Prettier](https://github.com/prettier/prettier)
- Edit top comments in all *.ts files
- Update lodash version in package.json from 4.17.4 to 4.17.14