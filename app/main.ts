import { createInterface } from "readline";

// in js it would be:
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   prompt: '$ '
// });

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "$ ",
});

// TODO: Uncomment the code below to pass the first stage
rl.prompt(); // shows the prompt for the first time.

// Once an interface is created, the 'line' event can be used to read input line-by-line.
// The 'line' event fires each time the user presses Enter
rl.on("line", (command) => {
  if (command.trim() === "exit") {
    rl.close();
    return;
  } else {
    // prints the command followed by ": command not found" to the console
    console.log(`${command}: command not found`);
    rl.prompt();
  } //The readline interface automatically waits
  //  for the next input after each rl.prompt() call,
  //  keeping the shell running indefinitely.
  // so its core function is to display a prompt (e.g "$ " or any string)
  // and wait for input.
});
