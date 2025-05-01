export const instructions = {
    welcome: `
        Welcome aboard, Admiral.
        Set sail on a classic game of 
        strategy and sea-bound warfare.
        This is a browser-based implementation of Battleships.
        Press the red button to begin.

        by Darren Baldwin & Matt Mannings
        Repository: <a href="https://github.com/Jago971/BATTLESHIPS" target="_blank">BATTLESHIPS</a>
        `,
    shipPlacement: {
        Intro: `
        Admiral, deploy your fleet! Choose your ship,
        set its direction, and position it wisely — our
        survival depends on it!
        Press the red button to take command!
        `,
        SelectShip:`
        Admiral, choose a ship to place!
        Click on your choice from the fleet panel.
        `,
        PlaceInitial: (selectedShip) => `
        Admiral, click the first co-ordinate for your 
        ${selectedShip}, or click a different ship
        from the fleet panel. 
        `,
        SelectOption: (selectedShip) => `
        Admiral, decide the co-ordinate for the end
        of your ${selectedShip} from the flashing 
        options. Click your chosen option to place your
        ${selectedShip}. Or, click a different
        first coordinate. Or, click a different ship entirely.
        `,
        AllPlaced: `
        All hands on deck! Hit the red button to confirm
        the positions of your fleet and start the battle.
        If you wish to make changes,
        simply click the ship you wish to reposition.
        `
    }
}
