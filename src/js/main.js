"use-strict";

import { buttonPress } from "./buttonPress.js";
import { createGrid } from "./CreateGrid.js";
import {
  selectShip,
  shipInitialPlacement,
  shipInitialHover,
  shipLastPlacement
} from "./shipPlacement.js";

createGrid();

const playerAreaSquares = document.querySelectorAll(".player .player-area");
const button = document.querySelector(".button .inner");
const ships = document.querySelectorAll(".ship");
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
// COMMENTED OUT BECAUSE IT'S ANNOYING AFTER 8 HOURS.
// window.onclick = function () {
//   if (!sonar) {
//     const sonarEcho = new Audio("/assets/sounds/sonar-echo.mp3");
//     sonarEcho.volume = 0.5;
//     sonarEcho.loop = true;
//     sonarEcho.play();
//     sonar = true;
//   }
// };

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
    shipInitialHover(playerAreaSquares, square);
  });

  // ---stage 2 do:
  square.addEventListener("click", () => {
    if(square.classList.contains("option")) {
      shipLastPlacement(playerAreaSquares, square, storedShips);
    } else {
      shipInitialPlacement(playerAreaSquares, square, storedShips);
    }
  });
});

// ---stage 3 do :
// ------event listener -> click grid option
// ------functionality:
// ---------remove all option,
// ---------add .ship-placement to start square, option square, and all in between -> make start, middle, end all green,
// ---------save coords to list of placedShips -> overwrite existing coordinates if present,
// ---------repeat from stage 0 (unselected ship) without option to click any of placedShips coords
