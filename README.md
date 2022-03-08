# term-repl

> the Read–eval–print loop for node.js

- install

> npm install @otoniel19/term-repl

- contents
  - [add commands](#add-commands)
  - [usage](#usage)
  - [adding a command](#adding-a-command)
  - [listening command calls](#listening-command-calls)
  - [listening user inputs](#listening-user-inputs)
  - [running shell commands](#running-shell-commands)
  - [listening keypress](#listening-keypress)

# usage

```js
const termRepl = require("@otoniel19/term-repl");
const session = new termRepl({
  title: "> ",
  message: "welcome to repl",
  name: "repl"
});
session.start(); // start the repl
```

# add commands

- :warning: we recommend add commands before start
- first we show to you the class methods and params
- file [index.d.ts](./index.d.ts)

```ts
export = termRepl;

interface termReplOpts {
  name: string;
  message: string;
  title: string;
  historyFile: string;
}

declare class termRepl extends utils {
  constructor(opts: termReplOpts);
  nameShow: string;
  originalName: string;
  history: string;
  msg: string;
  Commands: (
    | {
        name: string;
        ".exit": boolean;
        description: string;
        requireArgs: boolean;
        action: (o: any) => void;
        ".clear"?: undefined;
      }
    | {
        name: string;
        ".clear": boolean;
        description: string;
        requireArgs: boolean;
        action: (o: any) => void;
        ".exit"?: undefined;
      }
  )[];
  start(): Promise<void>;
  isOpen: boolean | undefined;
  close(): void;
  /**
   * @param {String} name the name of command
   * @param {String} description the description of command to output in .help
   * @param {Boolean} requireArgs define if args are required for this command
   * @param {Function} action called when the command was called
   */
  addCommand(
    name: string,
    description: string,
    requireArgs: boolean,
    action: Function
  ): Error | undefined;
  eval(): void;
  commandArgs: any;
  system(command: any, silent: any): (command: any, silent: any) => any;
}
import utils = require("./utils");
```

# adding a command

```js
const termRepl = require("@otoniel19/term-repl");
const session = new termRepl({
  title: "> ",
  message: "welcome to repl",
  name: "repl"
});

session.addCommand(".load", "load a file", true, (o) => console.log(o));

session.start(); // start the repl
```

# listening command calls

```js
const termRepl = require("@otoniel19/term-repl");

const session = new termRepl({
  title: "> ",
  message: "welcome to repl",
  name: "repl"
});

session.addCommand(".load", "load a file", true, () => {});

session.start(); // start the repl

session.on("command", (commandObj) => {
  //code
});
```

# listening user inputs

```js
const termRepl = require("@otoniel19/term-repl");
const session = new termRepl({
  title: "> ",
  message: "welcome to repl",
  name: "repl"
});

session.start(); // start the repl

session.on("line", (input) => {
  //code
});
```

# running shell commands

```js
const termRepl = require("@otoniel19/term-repl");
const session = new termRepl({
  title: "> ",
  message: "welcome to repl",
  name: "repl"
});

session.start();

/*
//syntax
session.system("commandName commandsSpawnArgs",true)
*/

session.system("ls -a");
```

# listening keypress

```js
const termRepl = require("@otoniel19/term-repl");
const session = new termRepl({
  title: "> ",
  message: "welcome to repl",
  name: "repl"
});

session.on("keypress", (key) => {});

session.start();
```
