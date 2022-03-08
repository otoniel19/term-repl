const utils = require("./utils");
const _ = require("lodash");
const { log } = require("console");
const fs = require("fs");

process.argv.shift();
process.argv.shift();
process.argv = process.argv.join(" ");

class termRepl extends utils {
  constructor(opts) {
    super();
    const { title, historyFile, name, message } = opts;
    this.nameShow = title;
    this.originalName = name;
    this.history = historyFile;
    this.msg = message;
    this.Commands = [
      {
        name: ".exit",
        ".exit": true,
        description: `exit the ${name}`,
        requireArgs: false,
        action: (o) => this.close()
      },
      {
        name: ".clear",
        ".clear": true,
        description: `clear the ${name} console`,
        requireArgs: false,
        action: (o) => console.clear()
      }
    ];
    this.log(message.trim());
  }
  async start() {
    this.isOpen = true;
    if (this.isOpen) {
      if (process.argv.length != 0) {
        global.args = process.argv;
        this.emit("line", process.argv);
        this.eval();
        //save history
        fs.appendFileSync(this.history, process.argv + "\n");
        process.argv = "";
      }
      this.ask(
        this.history,
        this.nameShow,
        (ask) => {
          global.args = ask;
          this.emit("line", ask);
          this.eval();
          this.start();
        },
        (key) => this.emit("keypress", key)
      );
    }
  }
  close() {
    this.isOpen = false;
    this.emit("close");
    this.log(`${this.originalName} closed`);
    process.exit(1);
  }
  /**
   * @param {String} name the name of command
   * @param {String} description the description of command to output in .help
   * @param {Boolean} requireArgs define if args are required for this command
   * @param {Function} action called when the command was called
   */
  addCommand(name, description, requireArgs, action) {
    if (typeof action != "function")
      return new Error(
        `action cannot be diferent of a function the type got ${typeof action}`
      );
    if (!name.startsWith("."))
      return new Error("command " + name + " should starts with .");

    this.Commands.push({
      [name]: true,
      name: name,
      action: action,
      requireArgs: requireArgs,
      description: description
    });
  }
  eval() {
    var name = global.args.split(" ")[0];
    if (name == ".help") {
      this.Commands.map((val) => this.log(`${val.name}  ${val.description}`));
    } else {
      if (global.args.startsWith(".")) {
        var findCommand = _.find(this.Commands, { [name]: true });
        _.isPlainObject(findCommand)
          ? (this.commandArgs = global.args
              .split(findCommand.name)
              .join(" ")
              .trim())
          : (this.commandArgs = "");

        //if command object is not undefined
        if (_.isPlainObject(findCommand)) {
          if (findCommand.requireArgs) {
            // if command require arguments and arguments are null
            if (this.commandArgs == "")
              this.log(`error: command ${findCommand.name} require arguments.`);
            else {
              // else will exec
              let cmd = Object.create(findCommand);
              let obj = {
                name: cmd.name,
                args: {
                  string: this.commandArgs,
                  array: this.commandArgs.split(" ")
                },
                description: cmd.description
              };
              findCommand.action(obj);
              this.emit("command", obj);
            }
          } else {
            //if arguments are not required
            let cmd = Object.create(findCommand);
            let obj = {
              name: cmd.name,
              args: {
                string: this.commandArgs,
                array: this.commandArgs.split(" ")
              },
              description: cmd.description
            };
            findCommand.action(obj);
            this.emit("command", obj);
          }
        } else this.log(`error: ${name} is not a command`);
      }
    }
    //this.start();
  }
  /*
   * run shell commands
   * @param {String} command the command to run
   * @param {Boolean} silent define if shell show output
   */
  system(command, silent) {
    const cmd = command.split(" ");
    var name = cmd[0];
    cmd.shift();
    if (!silent)
      require("child_process").spawnSync(name, cmd, {
        stdio: "inherit",
        shell: true
      });
    else require("child_process").spawnSync(name, cmd);

    return this.system;
  }
}

module.exports = termRepl;
