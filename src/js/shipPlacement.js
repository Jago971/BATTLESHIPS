let selectedShip = "unselected";
let shipPlacementStage = 0;

/*  Ship Placement Stages:
*   0 = no selected ship, no hover square
*   1 = selected ship, green hover square
*   2 = selected ship, initial square, flashing option squares, no hovering
*/

const shipLengths = {
  carrier: 5,
  destroyer: 4,
  cruiser: 3,
  submarine: 3,
  scout: 2,
};

function removeShipPlacement(
  selectedShip,
  storedShips,
  playerAreaSquares
) {
  if (storedShips.player[selectedShip].x.length) { // only clears selected ship
    for (let index = 1; index < shipLengths[selectedShip]; index++) {
      const x = storedShips.player[selectedShip].x[index];
      const y = storedShips.player[selectedShip].y[index];
      const square = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
      console.log(selectedShip, storedShips.player[selectedShip])
      square.classList.remove("ship-placement");
    }
  } else { // clears everything except recorded ships
    playerAreaSquares.forEach((square) => {
      const x = Number(square.getAttribute("data-x"));
      const y = Number(square.getAttribute("data-y"));

      let isShipSquare = false;

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
              x === storedShips.player[ship].x[index] &&
              y === storedShips.player[ship].y[index]
            ) {
              isShipSquare = true;
              break;
              // break out of coord loop
            }
          }
        }
        if (isShipSquare) break;
        // break out of ship loop
      }

      if (!isShipSquare) {
        square.classList.remove("ship-placement");
      }
    });
  }
}

export function selectShip(
  playerAreaSquares,
  allShips,
  clickedShip,
  storedShips
) {
  const shipId = clickedShip.getAttribute("data-id");

  shipPlacementStage = 1;

  playerAreaSquares.forEach((square) => {
    square.classList.remove("option");
  });

  if (storedShips.player[shipId].x.length) {
    storedShips.player[shipId].x = [];
  }
  // Removes all pre-existing coords
  removeShipPlacement(shipId, storedShips, playerAreaSquares);

  if (selectedShip === shipId) {
    selectedShip = "unselected";
    clickedShip.classList.remove("selected");
    shipPlacementStage = 0;
    return;
  }

  selectedShip = shipId;

  allShips.forEach((ship) => {
    ship.classList.remove("selected");
  });

  clickedShip.classList.add("selected");
}

export function shipInitialHover(
  playerAreaSquares,
  hoveredSquare,
  storedShips
) {
  if (shipPlacementStage === 1) {
    removeShipPlacement(selectedShip, storedShips, playerAreaSquares);

    hoveredSquare.classList.add("ship-placement");
  }
}

export function shipInitialPlacement(
  playerAreaSquares,
  clickedSquare,
  storedShips
) {
  const x = Number(clickedSquare.getAttribute("data-x"));
  const y = Number(clickedSquare.getAttribute("data-y"));

  if (shipPlacementStage >= 1) {
    // Needs initial square click functionality in both stage 1 and stage 2
    // If placing first square, need to be able to click it
    // If initial square already placed but want to change location - still needs click functionality


    removeShipPlacement(selectedShip, storedShips, playerAreaSquares);

    if (checkCoordsInStoredShips(x, y, storedShips)) {
      alert("This co-ordinate is occupied");
      return
    }

    storedShips.player[selectedShip].x[0] = x;
    storedShips.player[selectedShip].y[0] = y;

    clickedSquare.classList.add("ship-placement");

    shipPlacementStage = 2;

    const length = shipLengths[selectedShip] - 1;

    const squareAbove = document.querySelector(
      `[data-x="${x}"][data-y="${y - length}"]`
    );
    const squareBelow = document.querySelector(
      `[data-x="${x}"][data-y="${y + length}"]`
    );
    const squareLeft = document.querySelector(
      `[data-x="${x - length}"][data-y="${y}"]`
    );
    const squareRight = document.querySelector(
      `[data-x="${x + length}"][data-y="${y}"]`
    );

    const availableSquares = [
      squareAbove,
      squareBelow,
      squareLeft,
      squareRight,
    ];
    // The following forEach overrides DOM batch functions to sync blinking.
    playerAreaSquares.forEach((square) => {
      void square.offsetWidth;
    });
    // We thought JS was almighty. No longer do we worship it. - MM

    availableSquares.forEach((square) => {
      if (square) {
        square.classList.add("option");
      }
    });
  }
}

export function shipLastPlacement(
  playerAreaSquares,
  clickedSquare,
  storedShips,
  allShips
) {
  const startX = storedShips.player[selectedShip].x[0];
  const startY = storedShips.player[selectedShip].y[0];
  const endX = Number(clickedSquare.getAttribute("data-x"));
  const endY = Number(clickedSquare.getAttribute("data-y"));

  playerAreaSquares.forEach((playerSquare) => {
    playerSquare.classList.remove("option");
  });

  addRemainingShipCoordinates(storedShips, startX, startY, endX, endY);

  for (let index = 1; index < shipLengths[selectedShip]; index++) {
    const x = storedShips.player[selectedShip].x[index];
    const y = storedShips.player[selectedShip].y[index];
    const square = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    square.classList.add("ship-placement");
  }
  allShips.forEach((ship) => {
    ship.classList.remove("selected");
  });
  selectedShip = "unselected";
  shipPlacementStage = 0;
}

function addRemainingShipCoordinates(storedShips, startX, startY, endX, endY) {
  const deltaX = startX - endX;
  const deltaY = startY - endY;

  storedShips.player[selectedShip].x = [];
  storedShips.player[selectedShip].y = [];

  for (let i = 0; i < shipLengths[selectedShip]; i++) {
    let x = startX + (deltaX === 0 ? 0 : deltaX < 0 ? i : -i);
    let y = startY + (deltaY === 0 ? 0 : deltaY < 0 ? i : -i);
    storedShips.player[selectedShip].x.push(x);
    storedShips.player[selectedShip].y.push(y);
  }
}

// S3T6 - no overlapping:
// ---functionality:
// ------new function to check if coords match any stored coords -> return boolean -> use in if statement to allow initial placement or option

function checkCoordsInStoredShips(x, y, storedShips) {

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
          x === storedShips.player[ship].x[index] &&
          y === storedShips.player[ship].y[index]
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

function getAllOptionsCoords(selectedShip, storedShips, length) {
  let optionsCoords =
  {
    left: { x: [], y: [] }, // SL x X-- , SL x Y
    right: { x: [], y: [] }, // SL x X++ , SL x Y
    top: { x: [], y: [] }, // SL x X, SL x Y--
    bottom: { x: [], y: [] } // SL x X , SL x Y++
  }

  const startX = storedShips.player[selectedShip].x[0];
  const startY = storedShips.player[selectedShip].y[0];

  for (direction in optionsCoords) {
    
    for (let i = 0; i < length - 1; i++) {
      const valueX = startX + (direction === "left" ? - 1 : direction === "right" ? 1 : 0);
      const valueY = startY + (direction === "top" ? 1 : direction === "bottom" ? - 1 : 0);

      optionsCoords[direction].x.push(valueX);
      optionsCoords[direction].y.push(valueY);

    }
    return optionsCoords;
  }
}

function getValidOptionsCoords(selectedShip, storedShips) {
  const length = shipLengths[selectedShip];
  const options = getOptionsCoords(selectedShip, storedShips, length)
  for (direction in options) {
    for (let i = 0; i < length; i++) {
      const x = storedShips.player[selectedShip].x[i];
      const y = storedShips.player[selectedShip].y[i];


    }
  }
}

// options:
// function that returns true or false when given an option square - use it to allow or disallow visual representation.
// simple function that can be reused for each option square. one job.
// function that returns a full array of all true/existing options and then displays all of those options.
// could be messy with lots going on inside - will make use of checking its true redundant

//  helper function params - length - 4 generic loop length-1 - iterate over x,y coords, increment or decrement x or y(for given direction) - 
//    return array of keyed arrays of coords for given direction and axis

//  parms - storedships(which contains x[0] and y[0]), selectedship(has ship length)
//    first check if start x/y + ship length over or under 10 or 0 - if true break
//    if first check passed - run check coords function - false continue, true break.