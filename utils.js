const { EventEmitter } = require("events");
const superPrompt = require("@otoniel19/super-prompt");

class utils extends EventEmitter {
  constructor() {
    super();
  }
  ask(name, cb) {
    const pr = new superPrompt();
    pr.on("keypress", (ch, key) => this.emit("keypress", key));
    pr.ask(
      name,
      (fn) => {
        cb(fn);
      },
      { persist: true, close: false }
    );
  }
  log(...data) {
    console.log.apply(this, data);
  }
}

module.exports = utils;
