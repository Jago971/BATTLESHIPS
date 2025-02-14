export function createGrid() {
    const containers = document.querySelectorAll(".game-grid")

    containers.forEach(container => {
        for (let i = 0; i < 121; i++) {
            const gridSquare = document.createElement("div");
            gridSquare.classList.add("grid-square");
            container.append(gridSquare);
        }
    });
}