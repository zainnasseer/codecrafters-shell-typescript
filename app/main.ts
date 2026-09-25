import { createInterface } from "readline";
import * as fs from "fs";
import * as path from "path";

const BUILTINS = new Set(["exit", "echo", "type"]);

function findInPath(cmd: string): string | null {
  const pathEnv = process.env.PATH ?? "";
  const dirs = pathEnv.split(path.delimiter); // ":" on Unix, ";" on Windows
  for (const dir of dirs) {
    const fullPath = path.join(dir, cmd);
    try {
      fs.accessSync(fullPath, fs.constants.X_OK);
      return fullPath; // found an executable
    } catch {
      // not found or not executable in this dir, continue
    }
  }
  return null;
}

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "$ ",
});

function handleCommand(line: string) {
  const parts = line.trim().split(/\s+/); //splits the input by spaces // Result: ["echo", "hello"]  (groups multiple consecutive spaces into a single separator)

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
        const found = findInPath(target);
        if (found) {
          console.log(`${target} is ${found}`);
        } else {
          console.log(`${target}: not found`);
        }
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
