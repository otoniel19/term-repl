const { EventEmitter } = require("events");
const superPrompt = require("@otoniel19/super-prompt");
const prompt = new superPrompt();

class utils extends EventEmitter {
  constructor() {
    super();
  }
  ask(name, cb, keypress) {
    prompt.on("keypress", (key) => {
      keypress(key);
    });
    prompt.ask(
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
  get rl() {
    return prompt.interface;
  }
}

module.exports = utils;
