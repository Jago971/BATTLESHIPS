"use-strict";

import { buttonPress } from "./buttonPress.js";
import { initialiseGrid } from "./initialiseGrid.js";
import { shipPlacementHandler } from "./shipPlacement.js";
import { instructions } from "./instruction.js";


let gameStage = 0;
let sonar = false;

const display = document.querySelector(".display > p");
const button = document.querySelector(".button .inner");
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

// function initialiseGrid() {
//   createGrid();
//   const playerAreaSquares = document.querySelectorAll(".player .player-area");
//   return playerAreaSquares;
// }

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

// fleetShips.forEach((ship) => {
//   ship.addEventListener("click", () => {
//     shipPlacementHandler(storedShips, ship, playerAreaSquares)
//   });
// });

// playerAreaSquares.forEach((square) => {
//   square.addEventListener("click", () => {
//     if (square.classList.contains("option")) {
//       shipPlacementHandler(storedShips, square, playerAreaSquares)
//     } else {
//       shipPlacementHandler(storedShips, square, playerAreaSquares)
//     }
//   });
// });








// function shipPlacementListeners(playerAreaSquares) {

// const fleetShips = document.querySelectorAll(".fleet-ship");
// }

// const handleFleetClick = function (event, param) {
//   console.log("Button clicked!", param);
// };

// const handlePlayerGirdClick = function (event, param) {
//   console.log("Button clicked!", param);
// };

// const handleOptionClick = function (event, param) {
//   console.log("Button clicked!", param);
// };

// const button = document.getElementById('myButton');

// const placementHandler = function (event) {
//   handleFleetClick(event, 'Some Param');
//   handlePlayerGirdClick(event, 'Some Param');
//   handleOptionClick(event, 'Some Param');
// };

// const PlayingGameHandler = function (event) {
//   handleFleetClick(event, 'Some Param');
//   handlePlayerGirdClick(event, 'Some Param');
//   handleOptionClick(event, 'Some Param');
// };

// button.addEventListener('click', placementHandler);

// button.removeEventListener('click', placementHandler);








// GAME STAGES
// 0 - welcome
// 1 - player placement
// 2 - opponent placement
// 3 - playing
// 4 - outcome && reset

function gameStageHandler() {
  switch (gameStage) {
    case 0:
      console.log(gameStage)
      initialiseGrid();
      initialiseSonar();
      display.innerHTML = instructions.welcome;
      button.addEventListener("click", () => {
        gameStage++;
        buttonPress(button);
        gameStageHandler();
      });

      break;

    case 1:
      console.log(gameStage)
      const playerAreaSquares = document.querySelectorAll(".player .player-area");
      shipPlacementListeners(playerAreaSquares);
      break;

    default:
      break;
  }
}

window.onload = gameStageHandler;