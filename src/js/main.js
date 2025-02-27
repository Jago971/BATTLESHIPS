"use-strict";

import { buttonPress } from "./buttonPress.js";
import { createGrid } from "./CreateGrid.js";
import {
  selectShip,
  shipGridOptions,
  shipIniitialPlacement as shipInitialPlacement,
} from "./selectShip.js";

createGrid();

const playerAreaSquares = document.querySelectorAll(".player .player-area");
const button = document.querySelector(".button .inner");
const ships = document.querySelectorAll(".ship");
let sonar = false;

window.onclick = function () {
  if (!sonar) {
    const sonarEcho = new Audio("/assets/sounds/sonar-echo.mp3");
    sonarEcho.volume = 0.5;
    sonarEcho.loop = true;
    sonarEcho.play();
    sonar = true;
  }
};

button.addEventListener("click", () => {
  buttonPress(button);
});

ships.forEach((ship) => {
  // now handing all ships and the index of the chosen ship so that function can wipe ".selected" class from all of them before applying to clicked ship
  ship.addEventListener("click", () => {
    selectShip(playerAreaSquares, ships, ship);
  });
});

// ship placement:
// ---stage 1 do:

playerAreaSquares.forEach((square) => {
  square.addEventListener("mouseover", () => {
    shipInitialPlacement(playerAreaSquares, square);
  });

// ---stage 2 do:
  square.addEventListener("click", () => {
    shipGridOptions(playerAreaSquares, square);
  });
});


// ---stage 3 do :
// ------event listener -> click grid option
// ------functionality:
// ---------remove all option,
// ---------add .ship-placement to start square, option square, and all in between -> make start, middle, end all green,
// ---------save coords to list of placedShips -> overwrite existing coordinates if present,
// ---------repeat from stage 0 (unselected ship) without option to click any of placedShips coords

const storedShip = {
  Player: {
    carrier: {
      x: [1, 2, 3],
      y: [1, 1, 1]
    },
  },
  opponent: {}
}