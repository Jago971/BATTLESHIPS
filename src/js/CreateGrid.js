export function createGrid() {
    const containers = document.querySelectorAll(".game-grid")

    containers.forEach(container => {
        let j = 0;
        for (let i = 0; i < 121; i++) {
            const gridSquare = document.createElement("div");
            gridSquare.classList.add("grid-square");
            container.append(gridSquare);

            if (i && i < 11) {
                const label = document.createElement("p");
                label.textContent = i;
                gridSquare.append(label);
            } else if (i && i % 11 === 0) {
                const label = document.createElement("p");
                const uniCodeLetter = String.fromCharCode(j + 65);
                label.textContent = uniCodeLetter;
                gridSquare.append(label);
                j++;
            } else if (i != 0) {
                gridSquare.setAttribute("data-x", i % 11) // sets the x-axis coordinate per grid square not including axis label squares
                gridSquare.setAttribute("data-y", Math.floor(i / 11)) // sets the y-axis coordinate using numbers not letters - for easier data storage
                gridSquare.classList.add("player-area") // distinguishes general grid from playable part of it where ships can be placed and shots fired
            }
        }
    });
}
