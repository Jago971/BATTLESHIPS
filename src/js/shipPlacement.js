let selectedShip = "unselected";
let placementStage = 0;
let stagedCoords;

const shipLengths = {
  carrier: 5,
  destroyer: 4,
  cruiser: 3,
  submarine: 3,
  scout: 2,
};

/*  Ship Placement Stages:
*   0 = no selected ship, no hover square
*   1 = selected ship, green hover square
*   2 = selected ship, initial square, flashing option squares, no hovering
*/

// #region UTILS

function redraw() {
  document.body.offsetHeight;
}

function checkClickedElement(clickedElement) {
  if (clickedElement.classList.contains("option")) return "option";
  if (clickedElement.classList.contains("fleet-ship")) return "fleet";
  return "square";
}

function removeShipPlacementAll(storedShips) {
  const loopLength = shipLengths[selectedShip];

  for (let index = 0; index < loopLength; index++) {
    const x = storedShips.player[selectedShip].x[index];
    const y = storedShips.player[selectedShip].y[index];
    const square = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    square.classList.remove("ship-placement");
  }
}

function removeSelectedShipCoords(storedShips) {
  storedShips.player[selectedShip].x = [];
  storedShips.player[selectedShip].y = [];
}

function removeSelectedShipAll() {
  const ships = document.querySelectorAll(".fleet-ship")
  for (const ship of ships) {
    ship.classList.remove("selected");
  }
  selectedShip = "unselected";
}

function addSelectedShip(clickedShip) {
  const shipId = clickedShip.getAttribute("data-id");
  selectedShip = shipId;
  clickedShip.classList.add("selected");
}

function toggleHover(playerAreaSquares, boolean) {
  playerAreaSquares.forEach(square => {
    if (boolean) {
      square.classList.add("hover")
    } else {
      square.classList.remove("hover")
    }
  });
}

function getCoordinates(square) {
  const x = Number(square.getAttribute("data-x"));
  const y = Number(square.getAttribute("data-y"));
  return { x: x, y: y }
  // nuts
}

function stageInitialCoords(coords) {
  stagedCoords = coords;
}

function toggleShipPlacement(coordinates, boolean) {
  const square = document.querySelector(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`);
  if (boolean) {
    square.classList.add("ship-placement");
  } else {
    square.classList.remove("ship-placement");
  }
}

function checkCoordsInStoredShips(coordinates, storedShips) {

  let match = false;

  for (const ship in storedShips.player) {
    // ship loop
    if (storedShips.player[ship].x.length) {
      for (
        let index = 0;
        index < storedShips.player[ship].x.length;
        index++
      ) {
        // coord loop
        if (
          coordinates.x === storedShips.player[ship].x[index] &&
          coordinates.y === storedShips.player[ship].y[index]
        ) {
          match = true;
          break;
          // break out of coord loop
        }
      }
    }
    if (match) break;
    // break out of ship loop
  }

  return match;
}

function getAllOptionsCoords(length) {
  let optionsCoords =
  {
    left: { x: [], y: [] }, // SL x X-- , SL x Y
    right: { x: [], y: [] }, // SL x X++ , SL x Y
    top: { x: [], y: [] }, // SL x X, SL x Y--
    bottom: { x: [], y: [] } // SL x X , SL x Y++
  }

  const startX = stagedCoords.x;
  const startY = stagedCoords.y;

  for (let direction in optionsCoords) {
    for (let i = 1; i < length; i++) {
      const valueX = startX + (direction === "left" ? -i : direction === "right" ? i : 0);
      const valueY = startY + (direction === "top" ? -i : direction === "bottom" ? i : 0);
      optionsCoords[direction].x.push(valueX);
      optionsCoords[direction].y.push(valueY);
    }
  }
  return optionsCoords;
}

function getValidOptionsCoords(selectedShip, storedShips) {
  const length = shipLengths[selectedShip];
  const options = getAllOptionsCoords(length);

  for (let direction in options) {

    let isValid = true;

    for (let i = 0; i < length - 1; i++) {
      const x = options[direction].x[i];
      const y = options[direction].y[i];
      // check if out of bounds
      if (!(0 < x && x < 11) || !(0 < y && y < 11)) {
        isValid = false;
        break;
      }
      // check if already occupied
      if (checkCoordsInStoredShips({x, y}, storedShips)) {
        isValid = false;
        break;
      }

    }

    if (!isValid) {
      delete options[direction];
    }
  }
  return options;
}

function addOptionSquares(selectedShip, storedShips) {
  const validOptionsCoords = getValidOptionsCoords(selectedShip, storedShips)

  for (const option in validOptionsCoords) {
    const length = validOptionsCoords[option].x.length - 1;
    const optionSquare = document.querySelector(
      `[data-x="${validOptionsCoords[option].x[length]}"][data-y="${validOptionsCoords[option].y[length]}"]`
    );
    optionSquare.classList.add("option");
  }
}

function removeOptionSquares(playerAreaSquares) {
  playerAreaSquares.forEach(square => {
    square.classList.remove("option")
  });
}

function addShipCoordsToStoredShips(clickedOption, storedShips) {
  const startX = stagedCoords.x;
  const startY = stagedCoords.y;

  const endCoordinates = getCoordinates(clickedOption)
  const endX = endCoordinates.x
  const endY = endCoordinates.y

  const deltaX = startX - endX;
  const deltaY = startY - endY;

  for (let i = 0; i < shipLengths[selectedShip]; i++) {
    let x = startX + (deltaX === 0 ? 0 : deltaX < 0 ? i : -i);
    let y = startY + (deltaY === 0 ? 0 : deltaY < 0 ? i : -i);
    storedShips.player[selectedShip].x.push(x);
    storedShips.player[selectedShip].y.push(y);
  }
}

function toggleShipPlacementAll(storedShips, boolean) {

  for (const ship in storedShips.player) {
    if (storedShips.player[ship].x.length > 0) {
      for (let i = 0; i < shipLengths[ship]; i++) {
        const coordinates = { x: storedShips.player[ship].x[i], y: storedShips.player[ship].y[i] }
        toggleShipPlacement(coordinates, boolean)
      }
    }
  }
}

function checkPlayerStoredShipsAll(storedShips) {

  for (const ship in storedShips.player) {

    if (storedShips.player[ship].x.length != shipLengths[ship]) {
      return false
    }
  }
  return true
}

// #region flow regressions

function resetStage0(playerAreaSquares) {
  removeSelectedShipAll()
  toggleHover(playerAreaSquares, false)

  placementStage = 0
}

// #endregion

// #endregion

export function shipPlacement(storedShips, clickedElement, playerAreaSquares) {
  const element = checkClickedElement(clickedElement)

  switch (placementStage) {
    case 0:

      if (element === "fleet") {
        // console.log("stage0", placementStage)
        // Only needed if doing a re-loop from later in the process

        // if (selectedShip !== "unselected"  
        //   && (storedShips.player[selectedShip].x.length > 0
        //     || storedShips.player[selectedShip].y.length > 0)) { 
        //   removeShipPlacementAll();         
        //   removeSelectedShipCoords(storedShips);

        // }

        addSelectedShip(clickedElement)
        console.log("selectedShip", selectedShip)
        if (storedShips.player[selectedShip].x.length > 0
          || storedShips.player[selectedShip].y.length > 0) {
          removeShipPlacementAll(storedShips);
          removeSelectedShipCoords(storedShips);
        }
        // check if clicked ship has coordinates - if it does, wipe them. Also remove visual squares

        toggleHover(playerAreaSquares, true);

        placementStage = 1;
        // console.log("stage0", placementStage)
      }
      break;

    case 1:
      console.log("selected", selectedShip)
      if (element === "fleet") {

        if (clickedElement.getAttribute("data-id") === selectedShip) {
          resetStage0(playerAreaSquares);
        } else {
          removeSelectedShipAll(storedShips)
          addSelectedShip(clickedElement)
        }

      } else if (element === "square") {
        const coords = getCoordinates(clickedElement);
        if (!checkCoordsInStoredShips(coords, storedShips)) {
          toggleShipPlacement(coords, true);
          stageInitialCoords(coords);
          addOptionSquares(selectedShip, storedShips);
          toggleHover(playerAreaSquares, false);
  
          placementStage = 2
        }
      }

      // console.log("stage0", placementStage)
      break;

    case 2:

      if (element === "fleet") {

        if (clickedElement.getAttribute("data-id") === selectedShip) {
          toggleShipPlacement(stagedCoords, false)
          removeOptionSquares(playerAreaSquares)

          resetStage0(playerAreaSquares);
        } else {
          toggleShipPlacement(stagedCoords, false)
          removeOptionSquares(playerAreaSquares)
          toggleHover(playerAreaSquares, true)

          
          removeSelectedShipAll(storedShips)
          addSelectedShip(clickedElement)

          placementStage = 1
        }

      } else if (element === "square") {
          
        removeOptionSquares(playerAreaSquares)
        toggleShipPlacement(stagedCoords, false)

        toggleShipPlacement(coords, true) 
        stageInitialCoords(coords)
        addOptionSquares(selectedShip, storedShips)

      } else if (element === "option") {

        addShipCoordsToStoredShips(clickedElement, storedShips);
        removeOptionSquares(playerAreaSquares);
        toggleShipPlacementAll(storedShips, true);
        removeSelectedShipAll();

        const placementComplete = checkPlayerStoredShipsAll(storedShips) ? placementStage = 3 : placementStage = 0
      }
      break;

    case 3:
      return true;

    default:
      break;
  }
}

// function removeShipPlacement(
//   selectedShip,
//   storedShips,
//   playerAreaSquares
// ) {
//   if (storedShips.player[selectedShip].x.length) { // only clears selected ship
//     for (let index = 0; index < storedShips.player[selectedShip].x.length; index++) { // this needs to loop for the length of the coords not the length of the ship
//       const x = storedShips.player[selectedShip].x[index];            // sometimes the coords will only be initial square, sometimes it will be the full length of the ship
//       const y = storedShips.player[selectedShip].y[index];
//       const square = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
//       playerAreaSquares.forEach((square) => {
//         square.classList.remove("option");
//       });
//       square.classList.remove("ship-placement");
//     }
//   } else { // clears everything except recorded ships
//     playerAreaSquares.forEach((square) => {
//       const x = Number(square.getAttribute("data-x"));
//       const y = Number(square.getAttribute("data-y"));

//       let isShipSquare = false;

//       for (const ship in storedShips.player) {
//         // ship loop
//         if (storedShips.player[ship].x.length) {
//           for (
//             let index = 0;
//             index < storedShips.player[ship].x.length;
//             index++
//           ) {
//             // coord loop
//             if (
//               x === storedShips.player[ship].x[index] &&
//               y === storedShips.player[ship].y[index]
//             ) {
//               isShipSquare = true;
//               break;
//               // break out of coord loop
//             }
//           }
//         }
//         if (isShipSquare) break;
//         // break out of ship loop
//       }

//       if (!isShipSquare) {
//         square.classList.remove("ship-placement");
//       }
//     });
//   }
// }

// export function selectShip(
//   playerAreaSquares,
//   allShips,
//   clickedShip,
//   storedShips
// ) {
//   const shipId = clickedShip.getAttribute("data-id");

//   shipPlacementStage = 1;

//   playerAreaSquares.forEach((square) => {
//     square.classList.remove("option");
//   });

//   if (storedShips.player[shipId].x.length) {
//     storedShips.player[shipId].x = [];
//   }
//   // Removes all pre-existing coords
//   removeShipPlacement(shipId, storedShips, playerAreaSquares);

//   if (selectedShip === shipId) {
//     selectedShip = "unselected";
//     clickedShip.classList.remove("selected");
//     shipPlacementStage = 0;
//     return;
//   }

//   selectedShip = shipId;

//   allShips.forEach((ship) => {
//     ship.classList.remove("selected");
//   });

//   clickedShip.classList.add("selected");
// }

// export function shipInitialHover(
//   playerAreaSquares,
//   hoveredSquare,
//   storedShips
// ) {
//   if (shipPlacementStage === 1) {
//     removeShipPlacement(selectedShip, storedShips, playerAreaSquares);

//     hoveredSquare.classList.add("ship-placement");
//   }
// }

// export function shipInitialPlacement(
//   playerAreaSquares,
//   clickedSquare,
//   storedShips
// ) {
//   const x = Number(clickedSquare.getAttribute("data-x"));
//   const y = Number(clickedSquare.getAttribute("data-y"));

//   if (shipPlacementStage >= 1) {
//     // Needs initial square click functionality in both stage 1 and stage 2
//     // If placing first square, need to be able to click it
//     // If initial square already placed but want to change location - still needs click functionality

//     // If not a valid option square, needs to allow user to pick new initial square - has lost this functionality

//     removeShipPlacement(selectedShip, storedShips, playerAreaSquares);

//     if (checkCoordsInStoredShips(x, y, storedShips)) {
//       alert("This co-ordinate is occupied");
//       return
//     }

//     storedShips.player[selectedShip].x[0] = x;
//     storedShips.player[selectedShip].y[0] = y;

//     clickedSquare.classList.add("ship-placement");

//     shipPlacementStage = 2;

//     const validOptionsCoords = getValidOptionsCoords(selectedShip, storedShips)

//     for (const option in validOptionsCoords) {
//       const length = validOptionsCoords[option].x.length - 1;
//       const optionSquare = document.querySelector(
//         `[data-x="${validOptionsCoords[option].x[length]}"][data-y="${validOptionsCoords[option].y[length]}"]`
//       );
//       optionSquare.classList.add("option");
//     }
//   }
// }

// export function shipLastPlacement(
//   playerAreaSquares,
//   clickedSquare,
//   storedShips,
//   allShips
// ) {
//   const startX = storedShips.player[selectedShip].x[0];
//   const startY = storedShips.player[selectedShip].y[0];
//   const endX = Number(clickedSquare.getAttribute("data-x"));
//   const endY = Number(clickedSquare.getAttribute("data-y"));

//   playerAreaSquares.forEach((playerSquare) => {
//     playerSquare.classList.remove("option");
//   });

//   addRemainingShipCoordinates(storedShips, startX, startY, endX, endY);

//   for (let index = 1; index < shipLengths[selectedShip]; index++) {
//     const x = storedShips.player[selectedShip].x[index];
//     const y = storedShips.player[selectedShip].y[index];
//     const square = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
//     square.classList.add("ship-placement");
//   }
//   allShips.forEach((ship) => {
//     ship.classList.remove("selected");
//   });
//   selectedShip = "unselected";
//   shipPlacementStage = 0;
// }

// function addRemainingShipCoordinates(storedShips, startX, startY, endX, endY) {
//   const deltaX = startX - endX;
//   const deltaY = startY - endY;

//   storedShips.player[selectedShip].x = [];
//   storedShips.player[selectedShip].y = [];

//   for (let i = 0; i < shipLengths[selectedShip]; i++) {
//     let x = startX + (deltaX === 0 ? 0 : deltaX < 0 ? i : -i);
//     let y = startY + (deltaY === 0 ? 0 : deltaY < 0 ? i : -i);
//     storedShips.player[selectedShip].x.push(x);
//     storedShips.player[selectedShip].y.push(y);
//   }
// }

// // S3T6 - no overlapping:
// // ---functionality:
// // ------new function to check if coords match any stored coords -> return boolean -> use in if statement to allow initial placement or option


// // options:
// // function that returns true or false when given an option square - use it to allow or disallow visual representation.
// // simple function that can be reused for each option square. one job.
// // function that returns a full array of all true/existing options and then displays all of those options.
// // could be messy with lots going on inside - will make use of checking its true redundant

// //  helper function params - length - 4 generic loop length-1 - iterate over x,y coords, increment or decrement x or y(for given direction) - 
// //    return array of keyed arrays of coords for given direction and axis

// //  parms - storedships(which contains x[0] and y[0]), selectedship(has ship length)
// //    first check if start x/y + ship length over or under 10 or 0 - if true break
// //    if first check passed - run check coords function - false continue, true break.