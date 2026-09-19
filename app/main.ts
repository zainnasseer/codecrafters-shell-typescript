import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "$ ",
});

// TODO: Uncomment the code below to pass the first stage
rl.prompt(); // shows the prompt for the first time.

rl.on("line", (command) => {
  // prints the command followed by ": command not found" to the console
  console.log(`${command}: command not found`);

  rl.prompt(); //The readline interface automatically waits
  //  for the next input after each rl.prompt() call,
  //  keeping the shell running indefinitely.
  // so its core function is to display a prompt (e.g "$ " or any string)
  // and wait for input.
});
