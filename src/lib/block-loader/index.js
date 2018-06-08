
const blockLoader = {
  loader: {},

  setLoader(loader) {
    this.loader = loader;
    return this;
  },

  loadBlock(data) {
    return this.loader.loadBlock(data);
  }
};
module.exports = blockLoader;
