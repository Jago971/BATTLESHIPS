export function buttonPress(button) {
  button.classList.toggle("pressed");
  setTimeout(() => {
    button.classList.toggle("pressed");
  }, 750);
}
