module.exports = (dest, ctx) => {
  const def = {
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
  ctx.groups = {...def.groups, ...ctx.groups};
  ctx.display = {...def.display, ...ctx.display};

  // Extend top-level context keys.
  // eslint-disable-next-line no-param-reassign
  ctx = {...def, ...ctx};

  // Avoid key collision with Handlebars default `data`.
  // @see https://github.com/SassDoc/generator-sassdoc-theme/issues/22
  ctx._data = ctx.data;
  delete ctx.data;
};
module.exports.annotations = [];

/**
 * Parse the text under the specified annotation and return the object
 * with the following structure:
 * ```
 * {
 *    title: 'some title or description'
 *    type: 'exclusive'
 *    entries: {
 *      variant: 'Description',
 *      otherVariant: 'Other description'
 *    }
 * }
 * ```
 * The type is optional and comes after the annotation. After
 * this comes title, using a `-` as separator. Then comes the entries: every new
 * line will be considered a new entry, the value and description will be
 * separated by the first `:` occurrence.
 * Title and type are optionals. There can not be a title without a type.
 * The default type is `disjunction`.
 * ex:
 * ```
 * /// @variants exclusive - Background color
 * /// @variants disjunction - General variants
 * /// @variants exclusive
 * /// @variants
 * ```
 *
 * @param   {String}  Text  Text under the annotation tag
 * @returns {Object}
 */
const variantStateParser = (text) => {
  const instance = {
    type: 'disjunction', // default type
    code: text,
  };

  // Check if there is a type and description
  const optionalType = text.substr(0, text.indexOf('\n'));

  if (optionalType.trim().length !== 0) {
    const typeDesc = optionalType.split('-');

    // we assume that if there is just a string without `-` it is the type
    instance.type = typeDesc[0].trim();
    if (typeDesc[1]) {
      instance.title = typeDesc[1].trim();
    }
    instance.code = text.substr(optionalType.length + 1); // Remove the type
  }

  // Remove all leading/trailing line breaks.
  instance.code = instance.code.replace(/^\n|\n$/g, '');

  instance.entries = instance.code.split('\n').reduce(function(acc, line) {
    const values = line.split(':');
    const key = values[0];
    const description = values[1] ? values[1].trim() : '';
    return {...acc, [key]: description};
  }, {});

  delete instance.code;

  return instance;
};

module.exports.annotations.push(function(q) {
  return {
    name: 'variants',
    parse: variantStateParser,
    multiple: true,
    alias: []
  };
});
