export = termRepl;

interface termReplOptions {
  /**
   * the name of question
   */
  title: string;
  /**
   * the name of program
   */
  name: string;
  /**
   * the message to show when repl start
   */
  message: string;
}

declare class termRepl extends utils {
  constructor(opts: termReplOptions);
  nameShow: string;
  originalName: string;
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
  system(
    command: string,
    silent: boolean
  ): (command: string, silent: boolean) => any;
}
import utils = require("./utils");
