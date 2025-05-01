"use-strict";

import { buttonPress } from "./buttonPress.js";
import { initialiseGrid } from "./initialiseGrid.js";
import { shipPlacementHandler } from "./shipPlacement.js";
import { instructions } from "./instructions.js";


let gameStage = 0;
let sonar = false;

let currentStage = true;
const currentHandlers = [];
export const display = document.querySelector(".display > p");
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


// function shipPlacementListeners() {
// const playerAreaSquares = document.querySelectorAll(".player .player-area");

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

// }

function initialiseEventListeners(classSelector) {
  const playerAreaSquares = document.querySelectorAll(".player .player-area");

  const nodeList = document.querySelectorAll(classSelector)

  if (gameStage === 2) {
    nodeList.forEach((node) => {
      const handler = () => {
        currentStage = shipPlacementHandler(storedShips, node, playerAreaSquares);
      }
      node.addEventListener('click', handler);
      currentHandlers.push({ element: node, handler });
    })
  } else if (gameStage === 4) {
    nodeList.forEach((node) => {
      const handler = () => {
        attackFunction("We havent written this yet")
      }
      node.addEventListener('click', handler);
      currentHandlers.push({ element: node, handler });
    });
  }
}

function removeAllListeners() {
  currentHandlers.forEach(({ element, handler }) => {
    element.removeEventListener('click', handler);
  });
  currentHandlers.length = 0;
}

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
        if(currentStage) {
          gameStage++;
          currentStage = false
        }
        buttonPress(button);
        gameStageHandler();
      });

      break;

    case 1:
      currentStage=true;
      console.log(gameStage)
      display.innerHTML = instructions.shipPlacement.intro;

      break;

    case 2:
      console.log(gameStage)
    
      display.innerHTML = instructions.shipPlacement.selectShip;
      initialiseEventListeners(".player .player-area")
      initialiseEventListeners(".fleet-ship")
      
      break;

    case 3:
      display.innerHTML = "test"
      console.log(gameStage)
      removeAllListeners()
      
      break;
    default:
      break;
  }
}

window.onload = gameStageHandler;