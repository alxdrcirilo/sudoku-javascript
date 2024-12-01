/**
 * Shuffles an array in place using the Fisher-Yates algorithm.
 *
 * @param {Array} array - The array to shuffle.
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Prefills the diagonal 3x3 Sudoku subgrids.
 *
 * @param {Array<number>} grid - The Sudoku grid to print.
 */
function prefill(grid) {
  for (let i = 0; i < 3; i++) {
    const digits = Array.from({ length: 9 }, (_, i) => i + 1);
    shuffle(digits);

    let start = i * 3;
    let stop = start + 3;
    for (let row = start; row < stop; row++) {
      for (let col = start; col < stop; col++) {
        grid[row * 9 + col] = digits.pop();
      }
    }
  }
}

/**
 * Prints the Sudoku grid to the console.
 *
 * @param {Array<number>} grid - The Sudoku grid to print.
 * @returns {void}
 */
function printGrid(grid) {
  for (let i = 0; i < 9; i++) {
    let row = grid.slice(i * 9, (i + 1) * 9);
    console.log(row.join(" "));
  }
}

/**
 * Returns the allowed numbers for a given cell in the Sudoku grid.
 *
 * @param {number} row - The row index of the cell.
 * @param {number} col - The column index of the cell.
 * @param {Array<number>} grid - The Sudoku grid.
 * @returns {Array<number>} - An array of allowed numbers for the cell.
 */
function getAllowed(row, col, grid) {
  if (grid[row * 9 + col] == 0) {
    let digits = Array.from({ length: 9 }, (_, i) => i + 1);
    let rowSlice = grid.filter((x, i) => Math.floor(i / 9) == row && x != 0);
    let colSlice = grid.filter((x, i) => i % 9 == col && x != 0);

    let subgrid = [];
    let subgridRowStart = Math.floor(row / 3) * 3;
    let subgridColStart = Math.floor(col / 3) * 3;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        let value = grid[(subgridRowStart + r) * 9 + (subgridColStart + c)];
        if (value != 0) {
          subgrid.push(value);
        }
      }
    }

    let allowed = digits.filter(
      (x) =>
        !rowSlice.includes(x) && !colSlice.includes(x) && !subgrid.includes(x),
    );
    return allowed;
  }
}

/**
 * Fills a Sudoku grid using backtracking.
 *
 * @param {number[]} grid - A 1D array representing a 9x9 Sudoku grid, where 0 indicates an empty cell.
 * @returns {boolean} - Returns true if the grid is successfully filled, otherwise false.
 */
function fill(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row * 9 + col] == 0) {
        let allowed = getAllowed(row, col, grid);
        for (let i = 0; i < allowed.length; i++) {
          grid[row * 9 + col] = allowed[i];
          if (fill(grid)) {
            return true;
          } else {
            grid[row * 9 + col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

/**
 * Removes a specified number of cells from the Sudoku grid by setting them to 0.
 *
 * @param {number[]} grid - The Sudoku grid represented as a 1D array of 81 numbers.
 * @param {number} n - The number of cells to remove from the grid.
 */
function prune(grid, n) {
  let cells = Array.from({ length: 81 }, (_, i) => i);
  shuffle(cells);
  for (let i = 0; i < n; i++) {
    grid[cells[i]] = 0;
  }
}

let grid = Array.from({ length: 81 }, () => 0);
prefill(grid);
fill(grid);

let visible = grid.slice();
prune(visible, 55);

export { grid, visible };
