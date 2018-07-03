const blocks = {};

const isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n);

module.exports = (hbs) => {
  hbs.registerHelper('extend', (name, context) => {
    const block = blocks[name];
    if (!block) {
      block = blocks[name] = [];
    }
    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
  });

  hbs.registerHelper('block', (name) => {
    const val = (blocks[name] || []).join('\n');
    // clear the block
    blocks[name] = [];
    return val;
  });

  hbs.registerHelper({
    // Logicals
    eeq: (v1, v2) => v1 === v2,
    nee: (v1, v2) => v1 !== v2,
    lt: (v1, v2) => v1 < v2,
    gt: (v1, v2) => v1 > v2,
    lte: (v1, v2) => v1 <= v2,
    gte: (v1, v2) => v1 >= v2,
    and: (v1, v2) => v1 && v2,
    or: (v1, v2) => v1 || v2,
    ter: (condition, v1, v2) => condition ? v1 : v2,

    // String manipulation
    capitalize: (str) => {
      if (!(typeof str === 'string' || str instanceof String)) return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    // Arrays
    itemAt: (array, idx) => {
      if (Array.isArray(array)) {
        const index = isNumber(idx) ? +idx : 0;
        if (index < 0) {
          return array[array.length + idx];
        }
        if (idx < array.length) {
          return array[idx];
        }
      }
    },
    join: (array, char) => {
      if (Array.isArray(array)) {
        return array.join(char);
      }
    },

    // Objects
    forIn: (obj) => {
      const result = [];
      if (!!obj) {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            result.push( [key, obj[key] ]);
          }
        }
      }
      return result;
    },
    get: (obj, key) => {
      if (!!obj) {
        return obj[key];
      }
      return obj;
    },
    joinObjArr: (array, prop, val, char) => {
      return array.map((obj) => `${obj[prop]}${char}${obj[val]}`);
    }

  });
};
