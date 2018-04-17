const Entities = require('html-entities').AllHtmlEntities;

const Rendered = {
  loadBlock(data) {
    const entities = new Entities();
    return entities.decode(data);
  }
}

module.exports = Rendered;
