import { createInterface } from "readline";

const BUILTINS = new Set(["exit", "echo", "type"]);

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "$ ",
});

function handleCommand(line: string) {
  const parts = line.trim().split(/\s+/);
  const cmd = parts[0];
  const args = parts.slice(1);

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

rl.prompt();

rl.on("line", (line) => {
  handleCommand(line);
  rl.prompt();
});

