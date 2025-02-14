'use-strict'

import { buttonPress } from "./buttonPress.js";
import { createGrid } from "./CreateGrid.js";
import { selectShip } from "./selectShip.js";

const button = document.querySelector(".button .inner")
const ships = document.querySelectorAll(".ship")

createGrid();

button.addEventListener("click", () => {
    buttonPress(button)
})

ships.forEach(ship => {
    ship.addEventListener("click", () => {
        selectShip(ship)
    })
});