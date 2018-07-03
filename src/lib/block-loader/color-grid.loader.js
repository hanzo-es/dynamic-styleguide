const { getVariantNames, getColorsValues } = require('../../helpers/ast-helper');
const thematic = require('sass-thematic');

const ColorGridLoader = {
  loadBlock(data) {
    const {basePath, variationsFileName, variationsVarName, colorsFileName} = data;
    const functionAst = thematic.parseASTSync({file: `${basePath}/${variationsFileName}`});
    const allowedVariants = getVariantNames(functionAst, variationsVarName);
    const colorsAst = thematic.parseASTSync({file: `${basePath}/${colorsFileName}`});
    const colors = getColorsValues(colorsAst, allowedVariants);

    return {colors, allowedVariants};
  }
};

module.exports = ColorGridLoader;
