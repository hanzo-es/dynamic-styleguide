/**
 * Singleton that store the passed arguments values and retrieve them as they
 * are needed
 */
class ParsedArgs {
  constructor() {
    if(! ParsedArgs.instance) {
      this._args = {};
      ParsedArgs.instance = this;
    }

    return ParsedArgs.instance;
  }

  add(arg, value) {
    this._args[arg] = value;
  }

  get(arg) {
    return this._args[arg];
  }
}

const instance = new ParsedArgs();
Object.freeze(instance);

module.exports = instance;
