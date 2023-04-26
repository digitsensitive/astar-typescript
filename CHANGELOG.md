# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.X.X] - 2020-XX-XX

### Added

### Changed

### Fixed

---

## [1.2.7] - 2023-04-26

### Added

- Implement `Get as close as possible` option when the path is blocked ([Issue #10, @sefabaser](https://github.com/digitsensitive/astar-typescript/issues/10))

### Changed

- Update most dependencies in `./` and `./example`
- Update Copyright to 2023 in different locations
- Small optimizations in `grid.ts` and `util.ts`
- Add `CopyPlugin` and `HtmlWebpackPlugin` to webpack

---

## [1.2.6] - 2023-01-31

### Changed

- Update all dependencies in `./` and `./example`
- Prettify `./example/index.html`, `README.md`, `CHANGELOG.md` and `CODE_OF_CONDUCT.md`
- Add 2023 in Copyright in `LICENSE`

### Fixed

- Remove `astar-typescript` as a `dependency` in the example `package.json`

---

## [1.2.5] - 2020-12-13

### Fixed

- Update `example/yarn.lock` file

---

## [1.2.4] - 2020-12-13

### Changed

- Update dependencies in example
- Remove NPM support: Remove `package-lock.json` in main project and example

---

## [1.2.3] - 2020-12-13

### Changed

- Update `loadash` from `4.17.19` to `4.17.20`
- Update `typescript` from `3.9.7` to `4.1.3`
- Update `package-lock.json` and `yarn.lock`

---

## [1.2.2] - 2020-08-06

### Changed

- Update astar-typescript version from 1.2.0 to 1.2.1 in example

### Fixed

- Fix misspelling: It is not manhatt**e**n, it is manhatt**a**n
  (Thank you @spassvogel)

---

## [1.2.1] - 2020-08-06

### Changed

- Update astar-typescript version from 1.1.9 to 1.2.0 in example

---

## [1.2.0] - 2020-08-06

### Added

- Add `yarn.lock` in root
- Add `yarn.lock` in example folder
- Add `package-lock.json` in example folder

### Changed

- Update `typescript` from `3.8.3` to `3.9.7`
- Update `loadash` from `4.17.15` to `4.17.19`
- Only import `minBy` and `remove` from lodash
- Update dependencies in example

### Fixed

- Remove `yarn.lock` from the `.gitignore` file list

---

## [1.1.9] - 2020-04-17

### Changed

- Introduce const for let where possible
- Small changes in LICENSE and README

### Fixed

- Fixes failing builds with a fresh install (Thank you @krazyjakee)

---

## [1.1.8] - 2020-04-15

### Changed

- Remove unnecessary `console.log` in `astar-finder.ts`
- Small changes of the prettier configuration
- Small changes in the README.md file
- Remove unnecesary code comments
- Update devDependencies and dependencies

---

## [1.1.6] - 2020-02-22

### Added

- Update `example`

---

## [1.1.4] - 2020-02-21

### Added

- Add `example` folder

### Changed

- Small changes in the `.gitignore` and `.npmignore` files
- Update `CHANGELOG.md`
- Small changes

---

## [1.1.3] - 2020-02-16

### Added

- Add `tsconfig.json`file
- Add `typescript 3.5.2` as `devDependencies`
- Add `.npmignore`

### Changed

- Add TimerEvent to path generation in example
- Remove `example` folder
- Move library files to folder `lib`
- Rename `main.ts` to `astar.ts`
- Adapt `README.md`
- Update `.gitignore`
- Move `astar.ts` to `lib`
- Update `lodash` to version 4.17.15
- Update `typescript` to version 3.7.5
- Small cahnges in the README.md

### Fixed

- Bug that empty array could go into the main while loop of the astar-finder
- Path could only be created once (https://github.com/digitsensitive/astar-typescript/issues/2)

---

## [1.0.0] - 2019-07-26

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
- Add interface `IPoint`

---

## [0.0.5] - 2019-07-17

### Added

- Add a `CHANGELOG.md` file
- Add [Prettier](https://github.com/prettier/prettier) configuration file `.prettierrc`
- Add `.gitignore` file

### Changed

- Format all \*.ts files with [Prettier](https://github.com/prettier/prettier)
- Edit top comments in all \*.ts files
- Update lodash version in package.json from 4.17.4 to 4.17.14
