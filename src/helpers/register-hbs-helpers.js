var blocks = {};

module.exports = (hbs) => {
  hbs.registerHelper('eeq', function(a, b, options) {
    if(a === b) {
      return options.fn(this);
    }
  });
  hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }
    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
  });

  hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n');
    // clear the block
    blocks[name] = [];
    return val;
  });
}
