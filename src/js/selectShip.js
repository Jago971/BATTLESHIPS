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

export function shipIniitialPlacement(playerAreaSquares, hoveredSquare) {
  if (shipPlacementStage === 1) {
    // checks correct stage
    playerAreaSquares.forEach((square) => {
      square.classList.remove("ship-placement"); // remove all green squares
    });
    hoveredSquare.classList.add("ship-placement"); // apply green to hovered square
  }
}

export function shipGridOptions(playerAreaSquares, clickedSquare) {
  const x = Number(clickedSquare.getAttribute("data-x"));
  const y = Number(clickedSquare.getAttribute("data-y"));

  if (shipPlacementStage >= 1) { // Needs to be 1 or more so that you can hover for first placement, then click square and stop hovering.

    playerAreaSquares.forEach((playerSquare) => {
      playerSquare.classList.remove("ship-placement", "option"); // removes all ship-placement and option squares
    });
    clickedSquare.classList.add("ship-placement"); // adds new shi-placement square

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

    availableSquares.forEach((square) => {
      if (square) {
        square.classList.add("ship-placement", "option");
      } // adds flashing sqaures to all possible palcement options
    });
  }
}
