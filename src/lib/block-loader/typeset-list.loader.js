const path = require('path');
const sass = require('node-sass');
const { getClassDeclarationContent } = require('../../helpers/ast-helper');
const thematic = require('sass-thematic');

const TypesetLoader = {
  loadBlock(data) {
    const {basePath, typesetVarName, uiProjectFolder} = data;

    const sassFakeClassContent = 'fakeClassToGetContent';
    const sassData = `
      @import '${path.join(__dirname, '../../helpers/sass-typography-styles.scss')}';
      .${sassFakeClassContent} { content: fontStylesJsonGenerator($${typesetVarName}) };
    `;
    const result = sass.renderSync({
      data: sassData,
      includePaths: [basePath, path.dirname(uiProjectFolder)]
    });

    const parsedVarsTree = thematic.parseASTSync({data: result.css.toString()});
    const typeset = getClassDeclarationContent(parsedVarsTree, sassFakeClassContent);
    return {typeset};
  }
};

module.exports = TypesetLoader;
