// #region Data Variables

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

// #endregion Data Variables

// #region DOM-Fleet

function addSelectedShip(clickedShip) {
  const shipId = clickedShip.getAttribute("data-id");
  selectedShip = shipId;
  clickedShip.classList.add("selected");
}

function removeSelectedShipAll() {
  const ships = document.querySelectorAll(".fleet-ship")
  for (const ship of ships) {
    ship.classList.remove("selected");
  }
  selectedShip = "unselected";
}

// #endregion DOM-Fleet

// #region DOM-Placement

function removeShipPlacementAll(storedShips) {
  const loopLength = shipLengths[selectedShip];

  for (let index = 0; index < loopLength; index++) {
    const x = storedShips.player[selectedShip].x[index];
    const y = storedShips.player[selectedShip].y[index];
    const square = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    square.classList.remove("ship-placement");
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

function toggleShipPlacement(coordinates, boolean) {
  const square = document.querySelector(`[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`);
  if (boolean) {
    square.classList.add("ship-placement");
  } else {
    square.classList.remove("ship-placement");
  }
}

// #endregion DOM-Placement

// #region DOM-Options

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

// #endregion DOM-Options

// #region DOM-Utils

function redraw() {
  document.body.offsetHeight;
}

function checkClickedElement(clickedElement) {
  if (clickedElement.classList.contains("option")) return "option";
  if (clickedElement.classList.contains("fleet-ship")) return "fleet";
  return "square";
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

// #endregion DOM-Utils

// #region Data-Ships

function removeSelectedShipCoords(storedShips) {
  storedShips.player[selectedShip].x = [];
  storedShips.player[selectedShip].y = [];
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

// #endregion Data-Ships

// #region Data-Coords

function stageInitialCoords(coords) {
  stagedCoords = coords;
}

function getCoordinates(square) {
  const x = Number(square.getAttribute("data-x"));
  const y = Number(square.getAttribute("data-y"));
  return { x: x, y: y }
}

function getAllOptionsCoords(length) {
  let optionsCoords =
  {
    left: { x: [], y: [] },
    right: { x: [], y: [] },
    top: { x: [], y: [] },
    bottom: { x: [], y: [] }
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
      if (checkCoordsInStoredShips({ x, y }, storedShips)) {
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

// #endregion Data-Coords

// #region Data-Utils

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

function checkPlayerStoredShipsAll(storedShips) {
  
  for (const ship in storedShips.player) {
    
    if (storedShips.player[ship].x.length != shipLengths[ship]) {
      return false
    }
  }
  return true
}

function resetStage0(playerAreaSquares) {
  removeSelectedShipAll()
  toggleHover(playerAreaSquares, false)

  placementStage = 0
}

// #endregion Data-Utils

// #region Placement Handling

export function shipPlacement(storedShips, clickedElement, playerAreaSquares) {
  const element = checkClickedElement(clickedElement)
  
  switch (placementStage) {
    case 0:

      if (element === "fleet") {

        addSelectedShip(clickedElement)
        if (storedShips.player[selectedShip].x.length > 0
          || storedShips.player[selectedShip].y.length > 0) {
          removeShipPlacementAll(storedShips);
          removeSelectedShipCoords(storedShips);
        }

        toggleHover(playerAreaSquares, true);

        placementStage = 1;
      }
      break;

    case 1:
      if (element === "fleet") {

        if (clickedElement.getAttribute("data-id") === selectedShip) {
          resetStage0(playerAreaSquares);
        } else {
          removeSelectedShipAll(storedShips)
          addSelectedShip(clickedElement)
          if (storedShips.player[selectedShip].x.length > 0
            || storedShips.player[selectedShip].y.length > 0) {
            removeShipPlacementAll(storedShips);
            removeSelectedShipCoords(storedShips);
          }
        }

      } else if (element === "square") {
        const coords = getCoordinates(clickedElement);
        if (!checkCoordsInStoredShips(coords, storedShips)) {
          toggleShipPlacement(coords, true);
          stageInitialCoords(coords);
          addOptionSquares(selectedShip, storedShips);
          toggleHover(playerAreaSquares, false);

          placementStage = 2
        } else {
          alert("This co-ordinate is occupied");
        }
      }

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
        const coords = getCoordinates(clickedElement);

        if (!checkCoordsInStoredShips(coords, storedShips)) {

          removeOptionSquares(playerAreaSquares)
          toggleShipPlacement(stagedCoords, false)

          toggleShipPlacement(coords, true)
          stageInitialCoords(coords)
          addOptionSquares(selectedShip, storedShips)

        } else {
          alert("This co-ordinate is occupied");
        }


      } else if (element === "option") {

        addShipCoordsToStoredShips(clickedElement, storedShips);
        removeOptionSquares(playerAreaSquares);
        toggleShipPlacementAll(storedShips, true);
        removeSelectedShipAll();

        const placementComplete = checkPlayerStoredShipsAll(storedShips) ? placementStage = 3 : placementStage = 0
      }
      break;

    case 3:
      if (element === "fleet") {

        addSelectedShip(clickedElement)

        if (storedShips.player[selectedShip].x.length > 0
          || storedShips.player[selectedShip].y.length > 0) {
          removeShipPlacementAll(storedShips);
          removeSelectedShipCoords(storedShips);
        }

        toggleHover(playerAreaSquares, true);

        placementStage = 1;
        return false;
      }

      return true;

    default:
      break;
  }
}

// #endregion Placement Handling
