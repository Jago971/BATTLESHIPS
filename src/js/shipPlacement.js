let selectedShip = "unselected";
let shipPlacementStage = 0;

const shipLengths = {
  carrier: 5,
  destroyer: 4,
  cruiser: 3,
  submarine: 3,
  scout: 2,
};

export function selectShip(playerAreaSquares, allShips, clickedShip) {
  const shipId = clickedShip.getAttribute("data-id");

  shipPlacementStage = 1; // click ship sets placement stage to 1(hovering green square)

  playerAreaSquares.forEach((square) => {
    square.classList.remove("ship-placement", "option"); // removes pre-existing placement and flashing option squares
  });

  if (selectedShip === shipId) {
    // if clicked ship is currently selected, unselect it, remove green square, revert to stage 0(no hover green square)
    selectedShip = "unselected";
    clickedShip.classList.remove("selected");
    shipPlacementStage = 0;
    return;
  }

  selectedShip = shipId;

  allShips.forEach((ship) => {
    ship.classList.remove("selected"); // remove all ship selections
  });
  clickedShip.classList.add("selected"); // before adding one selection to chosen ship
}

export function shipInitialHover(playerAreaSquares, hoveredSquare) {
  if (shipPlacementStage === 1) {
    // checks correct stage
    playerAreaSquares.forEach((square) => {
      square.classList.remove("ship-placement"); // remove all green squares
    });
    hoveredSquare.classList.add("ship-placement"); // apply green to hovered square
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
    // Needs to be 1 or more so that you can hover for first placement, then click square and stop hovering.
    storedShips.player[selectedShip].x[0] = x;
    storedShips.player[selectedShip].y[0] = y;

    playerAreaSquares.forEach((playerSquare) => {
      playerSquare.classList.remove("ship-placement", "option"); // removes all ship-placement and option squares
    });
    clickedSquare.classList.add("ship-placement"); // adds new ship-placement square

    shipPlacementStage = 2; // increases to stage 2(fixed green square, no hovering)

    const length = shipLengths[selectedShip] - 1; // length of ship minus starting square
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

    playerAreaSquares.forEach(square => {
      void square.offsetWidth;
    });

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
    ship.classList.remove("selected"); // remove all ship selections
  });
  selectedShip = "unselected";
  shipPlacementStage = 0;
}

// ---stage 3 do :
// ------event listener -> click grid option
// ------functionality:
// ---------remove all option, ✔️
// ---------add .ship-placement to start square, option square, and all in between -> make start, middle, end all green, ✔️
// ---------save coords to list of placedShips -> overwrite existing coordinates if present, ✔️
// ---------repeat from stage 0 (unselected ship) without option to click any of placedShips coords 🚩

// S3T5 - retain ship:
// ---functionality:
// ------new function to return all stored coords in storedShips
// ------new function to remove .ship-placement from all except stored coords

// S3T6 - no overlapping:
// ---functionality:
// ------new function to check if coords match any stored coords -> return boolean -> use in if statement to allow initial placement or option

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
