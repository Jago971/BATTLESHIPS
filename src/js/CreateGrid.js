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
                label.textContent = `${i}`;
                gridSquare.append(label);
            }

            if (i && i % 11 === 0) {
                const label = document.createElement("p");
                const uniCodeLetter = String.fromCharCode(j + 65);
                label.textContent = uniCodeLetter;
                gridSquare.append(label);
                j++;
            }
        }
    });
}
