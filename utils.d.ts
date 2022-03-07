export = utils;
declare class utils extends EventEmitter {
  constructor();
  ask(name: string): void;
  log(...data: any[]): void;
}
import { EventEmitter } from "events";
