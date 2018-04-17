const Entities = require('html-entities').AllHtmlEntities;

const EncodedLoader = {
  loadBlock(rawHTML) {
    const entities = new Entities();
    return entities.encode(rawHTML);
  }
}

module.exports = EncodedLoader;
