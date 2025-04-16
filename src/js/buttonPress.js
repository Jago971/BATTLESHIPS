export function buttonPress(button) {
  const attackDisplay = document.querySelector(".attack");
  const buttonClick = new Audio("/assets/sounds/button-click.mp3");
  const buttonFire = new Audio("/assets/sounds/button-fire.mp3");

  button.classList.toggle("pressed");
  buttonClick.play();
  attackDisplay.classList.toggle("hidden"); // not for production in any way

  setTimeout(() => {
    buttonFire.play();
  }, 250);

  setTimeout(() => {
    button.classList.toggle("pressed");
  }, 750);
}
