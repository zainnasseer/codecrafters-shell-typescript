const BUILTINS = new Set(["exit", "echo", "type", "pwd"]);

function handleCommand(line: string) {
  const parts = line.trim().split(/\s+/); //splits the input by spaces
  const cmd = parts[0]; //the first word is the command
  const args = parts.slice(1); //the rest are arguments

  if (!cmd) return;

  switch (cmd) {
    case "exit": {
      const code = args.length > 0 ? parseInt(args[0], 10) : 0;
      process.exit(isNaN(code) ? 0 : code);
    }
    case "echo": {
      console.log(args.join(" "));
      break;
    }
    case "type": {
      const target = args[0];
      if (BUILTINS.has(target)) {
        console.log(`${target} is a shell builtin`);
      } else {
        // Next stage: search PATH directories here
        console.log(`${target}: not found`);
      }
      break;
    }
    default: {
      console.log(`${cmd}: command not found`);
      break;
    }
  }
}

handleCommand("exit");

// import { createInterface } from "readline";

// // in js it would be:
// // const rl = readline.createInterface({
// //   input: process.stdin,
// //   output: process.stdout,
// //   prompt: '$ '
// // });

// const rl = createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   prompt: "$ ",
// });

// const BUILTINS: Record<string, (arg: string) => void> = {
//   type: (arg: string) => {
//     BUILTINS[arg] || arg == "exit"
//       ? console.log(`${arg} is a shell Built in command`)
//       : console.log(`${arg} is not found.`);
//   },
//   echo: (arg: string) => {
//     console.log(arg.slice(5));
//   },
// };

// // TODO: Uncomment the code below to pass the first stage
// rl.prompt(); // shows the prompt for the first time.

// // Once an interface is created, the 'line' event can be used to read input line-by-line.
// // The 'line' event fires each time the user presses Enter
// rl.on("line", (command) => {
//   if (command.trim() === "exit") {
//     rl.close();
//     return;
//   } else if (command.startsWith("echo ")) {
//     console.log(command.slice(5));
//     rl.prompt();
//   } else if (command.startsWith("type ")) {
//     const commandBody: string[] = command.split(" "); // or const commandName: string = command.split(" ")[1]
//     const commandName: string = commandBody[1]; // [1] is the second index, type is [0]
//     if (commandName === "exit" || BUILTINS[commandName]) {
//       console.log(`${commandName} is a shell builtin`);
//     } else {
//       console.log(`${commandName} not found`);
//     }
//     rl.prompt();
//   } else {
//     // prints the command followed by ": command not found" to the console
//     console.log(`${command}: command not found`);
//     rl.prompt();
//   } //The readline interface automatically waits
//   //  for the next input after each rl.prompt() call,
//   //  keeping the shell running indefinitely.
//   // so its core function is to display a prompt (e.g "$ " or any string)
//   // and wait for input.
// });
