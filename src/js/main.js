"use-strict";

import { buttonPress } from "./buttonPress.js";
import { createGrid } from "./CreateGrid.js";
import { shipPlacement } from "./shipPlacement.js";
import { instructions } from "./instruction.js";

let sonar = false;
const display = document.querySelector(".display > p");

const storedShips = {
  player: {
    carrier: { x: [], y: [] },
    destroyer: { x: [], y: [] },
    cruiser: { x: [], y: [] },
    submarine: { x: [], y: [] },
    scout: { x: [], y: [] },
  },
  opponent: {
    carrier: { x: [], y: [] },
    destroyer: { x: [], y: [] },
    cruiser: { x: [], y: [] },
    submarine: { x: [], y: [] },
    scout: { x: [], y: [] },
  }
};

function initialiseGrid() {
  createGrid();
  const playerAreaSquares = document.querySelectorAll(".player .player-area");
  return playerAreaSquares;
}

function initialiseSonar() {
  window.onclick = function () {
    if (!sonar) {
      const sonarEcho = new Audio("/assets/sounds/sonar-echo.mp3");
      sonarEcho.volume = 0.5;
      sonarEcho.loop = true;
      // sonarEcho.play(); ---- Ha lol!
      sonar = true;
    }
  };
}

function initialiseEventListeners(playerAreaSquares) {
  const button = document.querySelector(".button .inner");
  const fleetShips = document.querySelectorAll(".fleet-ship");

  button.addEventListener("click", () => {
    buttonPress(button);
  });

  fleetShips.forEach((ship) => {
    ship.addEventListener("click", () => {
      shipPlacement(storedShips, ship, playerAreaSquares)
    });
  });

  playerAreaSquares.forEach((square) => {
    square.addEventListener("click", () => {
      if (square.classList.contains("option")) {
        shipPlacement(storedShips, square, playerAreaSquares)
      } else {
        shipPlacement(storedShips, square, playerAreaSquares)
      }
    });
  });
}

function initialiseGame() {
  const playerAreaSquares = initialiseGrid();
  initialiseSonar();
  initialiseEventListeners(playerAreaSquares);
  display.innerHTML = instructions.welcome;
}

window.onload = initialiseGame;