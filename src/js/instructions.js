export const instructions = {
    welcome: `
        <span class="bold">Welcome aboard, Admiral</span>.<br>
        Set sail on a classic game of 
        strategy and sea-bound warfare.<br><br>
        By Darren Baldwin & Matt Mannings<br>
        Repository: <span class="bold"><a href="https://github.com/Jago971/BATTLESHIPS" target="_blank">BATTLESHIPS</a></span><br><br>
        <span class="bold">Press the RED BUTTON to START!</span>
        `,
    shipPlacement: {
        intro: `
        <span class="bold">Admiral</span>,<br><br> Deploy your fleet!<br>
        Choose your ship, set its direction, and position it wisely — our
        survival depends on it!<br><br>
        <span class="bold">Press the RED BUTTON to take COMMAND!</span>
        `,
        selectShip:`
        <span class="bold">Admiral</span>,<br><br>
        Choose a ship to place!<br><br>
        <span class="bold">CLICK</span> on your choice from the fleet panel.
        `,
        selectInitial: (selectedShip) => `
        <span class="bold">Admiral</span>,<br><br>
        <span class="bold">CLICK</span> the first co-ordinate for your 
        <span class="bold">${selectedShip.toUpperCase()}</span><br><br>
        <span class="bold">OR</span> click a different ship from the fleet panel. 
        `,
        selectOption: (selectedShip) => `
        <span class="bold">Admiral</span>,<br><br>
        <span class="bold">CLICK</span> a co-ordinate for the end
        of your ${selectedShip} from the flashing 
        options.<br><br>
        <span class="bold">OR</span> click a different first coordinate.<br>
        <span class="bold">OR</span> click a different ship entirely.
        `,
        allPlaced: `
        <span class="bold">All hands on deck!</span><br><br>
        You have positioned the fleet.<br>
        If you wish to make changes,
        simply click the ship you wish to reposition.<br><br><br>
        <span class="bold">Press the RED BUTTON to DEPLOY!</span>
        `
    }
}
