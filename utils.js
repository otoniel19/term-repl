const { EventEmitter } = require("events");
const fs = require("fs");

class utils extends EventEmitter {
  constructor() {
    super();
  }
  ask(history, name, cb, keypress) {
    if (!fs.existsSync(history)) fs.appendFileSync(history, "");

    const superPrompt = require("@otoniel19/super-prompt");
    var prompt = new superPrompt(history, {
      persist: true,
      close: false
    });
    prompt.on("keypress", (key) => {
      keypress(key);
    });
    prompt.ask(name, (fn) => {
      cb(fn);
    });
  }
  log(...data) {
    console.log.apply(this, data);
  }
}

module.exports = utils;
