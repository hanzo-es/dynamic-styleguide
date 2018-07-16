const { parseElement } = require('../lib/addon-manager');

const elementModel = {
  params: {
    firstLevel: '',
    element: '',
    namespace: ''
  },

  getElements(callback) {
    const err = null;

    // Get the HTML code to be rendered depending on the project type
    // The proper "addon" will be loaded and used to parse the client project
    // source files
    // By default, are "Static HTML" files
    const content = parseElement(this.params);

    const payload = {
      content
    };

    callback( err, payload );
  },

  updateParams(params) {
    this.params = {...params};
  }

};

module.exports = elementModel;
