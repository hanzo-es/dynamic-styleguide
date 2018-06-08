
const PagesCommentLoader = {
  loadBlock(data) {
    const comment = new RegExp(/(\-{3})([\s\S]*?)(\-{3})/, 'gm').exec(data)[2];
    const json = JSON.parse(`\{${comment}\}`);
    return json;
  }
};

module.exports = PagesCommentLoader;
