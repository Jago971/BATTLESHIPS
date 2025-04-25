"use-strict";

import { buttonPress } from "./buttonPress.js";
import { createGrid } from "./CreateGrid.js";
import { shipPlacement } from "./shipPlacement.js";

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

const instructions = {
  playersPlacement: "Commander, deploy your fleet! Choose your ship, set its direction,\
   and position it wisely—our survival depends on it!",
  playersConfirmation: "All hands on deck! Hit the start button to confirm your fleet's\
   positions. The enemy is lurking beneath the waves!",
  playersTurn: "Fire the cannons! Select your target coordinates and let them have it.\
   A direct hit could turn the tide!",
  playerHits: "We've hit! Prepare to fire again!",
  opponentsTurn: "Brace for impact! The enemy is returning fire—watch for damage to our fleet!",
  outcome:
  {
    win: "The battle is won Either way, history will remember this day. Ready to fight again?",
    lose: "The battle is lost Either way, history will remember this day. Ready to fight again?"
  }
}

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

  // button.addEventListener("click", () => {
  //   buttonPress(button);
  //   toggleHover(playerAreaSquares);
  // });

  // fleetShips.forEach((ship) => {
  //   ship.addEventListener("click", () => {
  //     selectShip(playerAreaSquares, fleetShips, ship, storedShips); // might change
  //     // click ship action
  //   });
  // });

  // playerAreaSquares.forEach((square) => {
  //   square.addEventListener("mouseover", () => { // might get rid of - css approach(?)
  //     shipInitialHover(playerAreaSquares, square, storedShips);
  //   });

  //   square.addEventListener("click", () => {
  //     if (square.classList.contains("option")) {
  //       shipLastPlacement(playerAreaSquares, square, storedShips, fleetShips);
  //     } else {
  //       shipInitialPlacement(playerAreaSquares, square, storedShips);
  //     }
  //   });
  // });
}

function initialiseGame() {
  const playerAreaSquares = initialiseGrid();
  initialiseSonar();
  initialiseEventListeners(playerAreaSquares);
}

window.onload = initialiseGame;