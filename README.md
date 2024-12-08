# Sudoku

[![bun](https://img.shields.io/badge/Bun-000?logo=bun&logoColor=fff)](https://bun.sh/)
[![license](https://img.shields.io/badge/license-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A simple [Sudoku](https://en.wikipedia.org/wiki/Sudoku) game written in JavaScript using the [`kaplay.js`](https://kaplayjs.com/) library.

<img src="https://raw.githubusercontent.com/alxdrcirilo/sudoku-javascript/main/assets/images/sudoku.png" alt="sudoku" width="480">

## Installation

### Setup instructions

To set up the project locally, follow these steps:

1. Clone the repository:  
   `git clone https://github.com/alxdrcirilo/sudoku-javascript.git`
2. Install dependencies:  
   `bun install`
3. Run the project locally:  
   `bun run dev`

> [!NOTE]
> Check the [`Makefile`](Makefile) for more commands. You can run `make help` to get a list of available commands.

## Settings

You can change the number of randomly-pruned cells in the Sudoku board in the [`prune`](src/board.js) method in `board.js`.

## Credits

### Fonts

This project uses the [Pixeloid](https://ggbot.itch.io/pixeloid-font) font. Retrieved Dec 8, 2024, from <https://ggbot.itch.io/pixeloid-font>.
