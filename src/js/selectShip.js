let selectedShip;
let shipPlacementStage = 0;

const shipLengths = {
  carrier: 5,
  destroyer: 4,
  cruiser: 3,
  submarine: 3,
  scout: 2,
};

export function selectShip(playerAreaSquares, ships, ship) {
  const shipId = ship.getAttribute("data-id");

  shipPlacementStage = 1; // click ship sets placement stage to 1(hovering green square)
  playerAreaSquares.forEach((square) => {
    square.classList.remove("ship-placement", "option"); // removes pre-existing placement and flashing option squares
  });

  if (selectedShip === shipId) {
    // if clicked ship is currently selected, unselect it, remove green square, revert to stage 0(no hover green square)
    selectedShip = "unselected";
    ship.classList.remove("selected");
    shipPlacementStage = 0;
    return;
  }

  selectedShip = shipId;

  ships.forEach((ship) => {
    ship.classList.remove("selected"); // remove all ship selections
  });
  ship.classList.add("selected"); // before adding one selection to chosen ship
}

export function shipGridStart(playerAreaSquares, square) {
  if (shipPlacementStage === 1) {
    // checks correct stage
    playerAreaSquares.forEach((square) => {
      square.classList.remove("ship-placement"); // remove all green squares
    });
    square.classList.add("ship-placement"); // apply green to hovered square
  }
}

export function shipGridOptions(playerAreaSquares, square) {
  const x = Number(square.getAttribute("data-x"));
  const y = Number(square.getAttribute("data-y"));

  if (shipPlacementStage >= 1) {
    // checks correct stage

    playerAreaSquares.forEach(playerSquare => {
        playerSquare.classList.remove("ship-placement", "option") // removes all ship-placement and option squares
    });
    square.classList.add("ship-placement") // adds new shi-placement square

    shipPlacementStage = 2; // increases to stage 2(fixed green square, no hovering)
    const length = shipLengths[selectedShip] - 1; // length of ship minus starting square
    const squareAbove = document.querySelector(`[data-x="${x}"][data-y="${y - length}"]`)
    const squareBelow = document.querySelector(`[data-x="${x}"][data-y="${y + length}"]`)
    const squareLeft = document.querySelector(`[data-x="${x - length}"][data-y="${y}"]`)
    const squareRight = document.querySelector(`[data-x="${x + length}"][data-y="${y}"]`)
    const availableSquares = [squareAbove, squareBelow, squareLeft, squareRight]

    availableSquares.forEach(square => {
       if(square) {square.classList.add("ship-placement", "option")} // adds flashing sqaures to all possible palcement options
    });
  }
}
