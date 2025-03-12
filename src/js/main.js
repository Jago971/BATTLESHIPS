"use-strict";

import { buttonPress } from "./buttonPress.js";
import { createGrid } from "./CreateGrid.js";
import {
  selectShip,
  shipInitialPlacement,
  shipInitialHover,
  shipLastPlacement
} from "./shipPlacement.js";

let sonar = false;
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

// ---stage 3 do :
// ------event listener -> click grid option
// ------functionality:
// ---------remove all option,
// ---------add .ship-placement to start square, option square, and all in between -> make start, middle, end all green,
// ---------save coords to list of placedShips -> overwrite existing coordinates if present,
// ---------repeat from stage 0 (unselected ship) without option to click any of placedShips coords

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
      sonarEcho.play();
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
      selectShip(playerAreaSquares, fleetShips, ship, storedShips);
    });
  });

  playerAreaSquares.forEach((square) => {
    square.addEventListener("mouseover", () => {
      shipInitialHover(playerAreaSquares, square, storedShips);
    });

    square.addEventListener("click", () => {
      if(square.classList.contains("option")) {
        shipLastPlacement(playerAreaSquares, square, storedShips, fleetShips);
      } else {
        shipInitialPlacement(playerAreaSquares, square, storedShips);
      }
    });
  });
}

function initialiseGame() {
  const playerAreaSquares = initialiseGrid();
  initialiseSonar();
  initialiseEventListeners(playerAreaSquares);
}

window.onload = initialiseGame;