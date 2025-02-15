let selectedShip = "unselected";
let shipPlacementMode = false;

const shipLengths = {
  carrier: 5,
  destroyer: 4,
  cruiser: 3,
  submarine: 3,
  scout: 2,
};

export function selectShip(ships, ship) {
  const shipId = ship.getAttribute("data-id"); // get the data-id attribute from the HTML e.g "subamrine"

  if (selectedShip === "unselected") {
    // activates when any ships is clicked
    shipPlacementMode = true;
  }

  if (selectedShip === shipId) {
    // if the selectedShip is already the same as the function's incoming ships[index] (clicked ship) then deselect ship and end ship selection mode
    ship.classList.remove("selected");
    selectedShip = "unselected";
    shipPlacementMode = false;
    return;
  }

  selectedShip = shipId;

  ships.forEach((ship) => {
    // remove selected class from all ships first
    ship.classList.remove("selected");
  });

  console.log(selectedShip, shipLengths[selectedShip]); // then console the newly selected ship and its length from shipLengths object
  ship.classList.add("selected"); // then add selected class to only the clicked ship
}

// S3T2:

// click ship selects it ✔️

// only one ship selected at a time ✔️

// clicking another ships deselects previous ship ✔️

// selected ship console logs name and length ✔️

// EXTRA - cannot click same ship multiple times

// function shipPlacementMode() {
//   const playerArea = document.querySelectorAll(".player-area");
//   playerArea.forEach((gridSquare) => {
//     gridSquare.classList.toggle("ship-placement-mode");
//   });
// }

export function shipPreview(playerAreaSquares, square) {
  const x = Number(square.getAttribute("data-x"));
  const y = Number(square.getAttribute("data-y"));

  if (shipPlacementMode) {
    const length = shipLengths[selectedShip];

    playerAreaSquares.forEach((square) => {
      square.classList.remove("ship-placement");
    });

    square.classList.add("ship-placement");

    for (let index = 1; index < length; index++) {
        const subsequentSquare = document.querySelector(`[data-x="${x}"][data-y="${y + index}"]`)
        console.log(`[data-x="${x}"][data-y="${y + index}"]`)
        subsequentSquare.classList.add("ship-placement")
    }
  }
}

// S3T3:

// whilst ship selected, hovering grid square shows hovered square in green ✔️

// shows next squares down in green according to length of selected ship

// squares will only light up green if there are enough squares below.

// squares will only light up green if no other ship occupies the squares below

// EXTRA - selecting same ship will deactivate ship selection mode
