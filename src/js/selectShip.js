let selectedShip;

const shipLengths = {
    carrier: 5,
    destroyer: 4,
    cruiser: 3,
    submarine: 3,
    scout: 2
}

export function selectShip(ships, index) {
    const shipId = ships[index].getAttribute("data-id"); // get the data-id attribute from the HTML e.g "subamrine"
    
    if(selectedShip === shipId) { // if the selectedShip is already the same as in the function's incoming ships[index] (clicked ship) then end function
        return;
    }

    selectedShip = shipId;

    ships.forEach(ship => { // remove selected class from all ships first
        ship.classList.remove("selected")
    });

    console.log(selectedShip, shipLengths[selectedShip]) // then console the newly selected ship and its length from shipLengths object
    ships[index].classList.add("selected"); // then add selected class to only the clicked ship
}

// click ship selects it ✔️

// only one ship selected at a time ✔️

// clicking another ships deselects previous ship ✔️

// selected ship console logs name and length ✔️

// EXTRA - cannot click same ship multiple times