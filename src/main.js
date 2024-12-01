import kaplay from "kaplay";
import { grid, visible } from "./board.js";

// Screen
const WIDTH = 495;
const HEIGHT = 495;
const CELL = WIDTH / 9;
const OFFSET = 10;

// Colors
const BCKGD = [51, 51, 51];
const BEIGE = [250, 240, 230];
const BLACK = [0, 0, 0];
const CORAL = [255, 127, 80];
const GREEN = [100, 255, 100];
const WHITE = [255, 255, 255];

// Timer
let startTime = Date.now();
let elapsedTime = 0;

/**
 * Updates the timer and returns the elapsed time in the format "MM:SS".
 *
 * @returns {string} The formatted elapsed time.
 */
function updateTimer() {
  elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

/**
 * Draws the current time on the screen.
 *
 * This function updates the timer and displays the current time
 * at a specified position on the screen with a specified text size and color.
 */
function drawTime() {
  time = updateTimer();
  add([rect(120, 20), pos(10, 495 + 25), color(BCKGD)]);
  add([
    text(`Time: ${time}`, { size: 18 }),
    pos(10, 495 + 25),
    color(WHITE),
    "time",
  ]);
}

// Update the timer every second
const drawTimeInterval = setInterval(drawTime, 1000);

// Game
let lives = 5;
let click = -1;

kaplay({
  width: WIDTH + OFFSET * 2,
  height: HEIGHT + OFFSET * 2 + 40,
  canvas: document.querySelector("#mycanvas"),
  background: "#333333",
  letterbox: false,
  debug: false,
  pixelDensity: 5,
});

// Fonts
loadFont("salmon", "assets/fonts/Salmon Typewriter 9 Regular.ttf");

// Sounds
loadSound("correct", "assets/sounds/Misc 1.wav");
loadSound("wrong", "assets/sounds/Misc 2.wav");

// Function to create a cell
function createCell(row, col) {
  let digit = visible[row * 9 + col];
  const cell = add([
    rect(CELL, CELL),
    pos(CELL * row + OFFSET, CELL * col + OFFSET),
    digit != 0 ? color(BEIGE) : color(WHITE),
    area(),
    outline(1),
  ]);

  // Digit
  add([
    text(`${digit != 0 ? digit : ""}`, { size: 26 }),
    pos(CELL * row + 30, CELL * col + 26),
    color(BLACK),
  ]);

  if (digit == 0) {
    cell.onHover(() => {
      if (click === -1) {
        cell.color = rgb(GREEN);
      }
    });

    cell.onHoverEnd(() => {
      if (click === -1) {
        cell.color = rgb(WHITE);
      }
    });

    cell.onClick(() => {
      if (click == -1) {
        click = row * 9 + col;
        cell.color = rgb(CORAL);
        document.addEventListener(
          "keydown",
          (event) => {
            if (event.key >= "1" && event.key <= "9") {
              digit = parseInt(event.key);
              if (digit == grid[row * 9 + col]) {
                // Correct digit
                play("correct");
                visible[row * 9 + col] = digit;
                click = -1;
                destroyAll();
                DrawSudokuBoard();

                // Game won
                if (!visible.includes(0)) {
                  clearInterval(drawTimeInterval);
                  destroyAll();
                  add([rect(200, 50), pos(150, 220), color(BCKGD)]);
                  add([
                    text("You Won!", { size: 32 }),
                    pos(180, 230),
                    color(WHITE),
                  ]);
                  add([
                    text(`Time: ${updateTimer()}`, { size: 24 }),
                    pos(180, 270),
                    color(WHITE),
                  ]);
                }
              } else {
                // Wrong digit
                play("wrong");
                lives--;
                click = -1;
                destroyAll();
                DrawSudokuBoard();

                // Game over
                if (lives == 0) {
                  clearInterval(drawTimeInterval);
                  destroyAll();
                  add([rect(200, 50), pos(150, 220), color(BCKGD)]);
                  add([
                    text("Game Over!", { size: 32 }),
                    pos(180, 230),
                    color(WHITE),
                  ]);
                  add([
                    text(`Time: ${updateTimer()}`, { size: 24 }),
                    pos(180, 270),
                    color(WHITE),
                  ]);
                }
              }
            }
          },
          { once: true },
        );
      }
    });
  }
  return cell;
}

// Create grid cells
function DrawSudokuBoard() {
  drawTime();
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      createCell(row, col);
    }
  }

  // Subgrids (3x3)
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      add([
        rect(CELL * 3, CELL * 3, { radius: 4, fill: false }),
        pos(CELL * 3 * i + OFFSET, CELL * 3 * j + OFFSET),
        outline(6),
      ]);
    }
  }
}

DrawSudokuBoard();
