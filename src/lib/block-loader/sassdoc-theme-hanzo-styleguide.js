module.exports = function (dest, ctx) {
  var def = {
    display: {
      access: ['public', 'private'],
      alias: false,
      watermark: true,
    },
    groups: {
      'undefined': 'General',
    },
    'shortcutIcon': 'http://sass-lang.com/favicon.ico',
  };

  // Apply default values for groups and display.
  ctx.groups = Object.assign({}, def.groups, ctx.groups);
  ctx.display = Object.assign({}, def.display, ctx.display);

  // Extend top-level context keys.
  ctx = Object.assign({}, def, ctx);

  // Avoid key collision with Handlebars default `data`.
  // @see https://github.com/SassDoc/generator-sassdoc-theme/issues/22
  ctx._data = ctx.data;
  delete ctx.data;
};
module.exports.annotations = []

/**
 * Parse the text under the specified annotation and return the object
 * with the following structure:
 * ```
 * {
 *    title: 'some title'
 *    entries: {
 *      variant: 'Description',
 *      otherVariant: 'Other description'
 *    }
 * }
 * ```
 * The title in the comment should alway be inside parentheses
 * Every new line will be considered a new entry, the value and description will
 * be separated by the first `:` occurrence.
 * 
 * @param {String} Text under the annotation tag
 * @returns {Object}
 */
var variantStateParser = function (text) {
  var toReturn = {};
  
  var titleRegEx = /\((.+)\)/g;
  var commentLines = text.trim().split("\n");
  var titleMatch = titleRegEx.exec(text.trim().split("\n")[0]);

  if (titleMatch && titleMatch[1]){
    toReturn.title = titleMatch[1];
    commentLines.shift();
  }

  toReturn.entries = commentLines.reduce(function (acc, line) {
    var values = line.split(':');
    var key = values[0];
    var description = values[1] ? values[1].trim() : "";
    return Object.assign(acc, {[key]: description})
  }, {});

  return toReturn;
};

module.exports.annotations.push(function () {
  return {
    name: 'variants',
    parse: variantStateParser,
    multiple: false,
    alias: []
  };
});

module.exports.annotations.push(function () {
  return {
    name: 'exclusiveVariants',
    parse: variantStateParser,
    multiple: true,
    alias: []
  };
});

module.exports.annotations.push(function () {
  return {
    name: 'states',
    parse: variantStateParser,
    multiple: false,
    alias: []
  };
});