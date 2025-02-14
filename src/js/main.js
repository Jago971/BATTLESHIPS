"use-strict";

import { buttonPress } from "./buttonPress.js";
import { createGrid } from "./CreateGrid.js";
import { selectShip } from "./selectShip.js";

const button = document.querySelector(".button .inner");
const ships = document.querySelectorAll(".ship");

createGrid();

window.onload = function () {
  const sonarEcho = new Audio("/assets/sounds/sonar-echo.mp3");
  sonarEcho.volume = 0.5;
  sonarEcho.loop = true;
  sonarEcho.play();
};

button.addEventListener("click", () => {
  buttonPress(button);
});

ships.forEach((ship) => {
  ship.addEventListener("click", () => {
    selectShip(ship);
  });
});
