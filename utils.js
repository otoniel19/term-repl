const { EventEmitter } = require("events");

class utils extends EventEmitter {
  constructor() {
    super();
  }
  ask(history, name, cb, keypress) {
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
  get rl() {
    return prompt.interface;
  }
}

module.exports = utils;
