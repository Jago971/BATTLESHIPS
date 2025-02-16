"use-strict";

import { buttonPress } from "./buttonPress.js";
import { createGrid } from "./CreateGrid.js";
import { selectShip, shipGridOptions, shipGridStart } from "./selectShip.js";

createGrid();

const playerAreaSquares = document.querySelectorAll(".player-area")
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

ships.forEach((ship) => { // now handing all ships and the index of the chosen ship so that function can wipe ".selected" class from all of them before applying to clicked ship
  ship.addEventListener("click", () => {
    selectShip(playerAreaSquares, ships, ship);
  });
});


playerAreaSquares.forEach((square) => {
  square.addEventListener("mouseover", () => {
    shipGridStart(playerAreaSquares, square);
  });
  square.addEventListener("click", () => {
    shipGridOptions(playerAreaSquares, square)
  })
});