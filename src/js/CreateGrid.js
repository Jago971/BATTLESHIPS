export function createGrid() {
    const containers = document.querySelectorAll(".game-grid")

    containers.forEach(container => {
        let j = 0;
        for (let i = 0; i < 121; i++) {
            const gridSquare = document.createElement("div");
            gridSquare.classList.add("grid-square");
            container.append(gridSquare);
            
            if (i % 11 === 0 && i != 0) {
                const label = document.createElement("p");
                const uniCodeLetter = String.fromCharCode(j + 65);
                label.innerText = uniCodeLetter;
                gridSquare.append(label);
                j++;
            }

            if (i > 0 && i < 11) {
                const label = document.createElement("p");
                label.innerText = `${i}`;
                gridSquare.append(label);
            }
        }
    });
}
